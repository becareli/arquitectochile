import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const publicDir = path.resolve(root, "dist/public");
const templatePath = path.join(publicDir, "index.html");
const serverEntryPath = path.join(root, "dist/server/entry-server.js");
const siteUrl = "https://arquitectochile.com";
const buildDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago",
}).format(new Date());

const prerenderRoutes = [
  "/",
  "/servicios-a-domicilio",
  "/asesoria-arquitectonica-terreno",
  "/regularizacion-inmuebles",
  "/regularizacion-viviendas-la-florida",
  "/disenemos-tus-nuevos-espacios",
  "/fusion-terrenos-urbanos",
  "/subdivision-terrenos-urbanos",
  "/inspeccion-tecnica-viviendas",
  "/tasacion-viviendas-urbanas",
  "/reacondicionamiento-termico-viviendas",
  "/sistema-eifs",
  "/permiso-edificacion-recepcion-final",
  "/revisor-independiente-de-arquitectura",
  "/obras-menores-empresas",
  "/calculadora-costos",
  "/colaboradores",
  "/casos-de-exito",
  "/revista",
  "/blog",
  "/contacto",
  "/aviso-legal",
  "/politica-privacidad",
  "/politica-cookies",
];

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function upsertMeta(html, key, name, content) {
  const value = escapeHtml(content);
  const match = new RegExp(
    `<meta(?=[^>]*\\b${key}=["']${escapeRegExp(name)}["'])[^>]*>`,
    "i",
  );
  const tag = `<meta ${key}="${escapeHtml(name)}" content="${value}" />`;
  return match.test(html)
    ? html.replace(match, tag)
    : html.replace("</head>", `  ${tag}\n  </head>`);
}

function upsertCanonical(html, url) {
  const match = /<link(?=[^>]*\brel=["']canonical["'])[^>]*>/i;
  const tag = `<link rel="canonical" href="${escapeHtml(url)}" />`;
  return match.test(html)
    ? html.replace(match, tag)
    : html.replace("</head>", `  ${tag}\n  </head>`);
}

function applyPageHead(template, pageHead, route) {
  const title = pageHead?.title || "ArquitectoChile | Arquitectura en Santiago";
  const description =
    pageHead?.description ||
    "Arquitecto con 25 años de experiencia. Diseño, permisos, regularizaciones y revisión independiente en Santiago.";
  const canonical = `${siteUrl}${route === "/" ? "" : route}`;
  const robots = pageHead?.noindex ? "noindex, nofollow" : "index, follow";

  let html = template.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(title)}</title>`,
  );
  html = upsertMeta(html, "name", "description", description);
  html = upsertMeta(html, "name", "robots", robots);
  html = upsertMeta(html, "property", "og:title", title);
  html = upsertMeta(html, "property", "og:description", description);
  html = upsertMeta(html, "property", "og:url", canonical);
  html = upsertMeta(
    html,
    "property",
    "og:image",
    pageHead?.ogImage || `${siteUrl}/og-image.jpg`,
  );
  html = upsertMeta(html, "name", "twitter:title", title);
  html = upsertMeta(html, "name", "twitter:description", description);
  if (route === "/__prerender_not_found__") {
    html = html.replace(
      /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/gi,
      "",
    );
  } else {
    html = upsertCanonical(html, canonical);
  }

  html = html.replace(
    /<script\b(?=[^>]*\bid=["']page-jsonld["'])[^>]*>[\s\S]*?<\/script>/gi,
    "",
  );
  if (pageHead?.jsonLd) {
    const jsonLd = JSON.stringify(pageHead.jsonLd).replace(/</g, "\\u003c");
    html = html.replace(
      "</head>",
      `  <script type="application/ld+json" id="page-jsonld">${jsonLd}</script>\n  </head>`,
    );
  }

  return html;
}

function insertRenderedApp(template, renderedHtml, route) {
  const rootMarkup = `<div id="root">${renderedHtml}</div>`;
  const renderedTemplate = template.replace(
    /<div id="root">[\s\S]*?<\/div>/i,
    rootMarkup,
  );
  if (renderedTemplate === template) {
    throw new Error(`Could not find the #root placeholder while prerendering ${route}`);
  }
  return renderedTemplate;
}

async function main() {
  const template = await readFile(templatePath, "utf8");
  const { render } = await import(pathToFileURL(serverEntryPath).href);
  const sitemapEntries = [];
  const spaShell = applyPageHead(
    template,
    {
      title: "ArquitectoChile | Arquitectura, permisos y regularización en Santiago",
      description:
        "Arquitecto con 25 años de experiencia. Diseño, permisos, regularizaciones y revisión independiente en Santiago.",
      path: "/",
    },
    "/",
  );
  await writeFile(path.join(publicDir, "spa-shell.html"), spaShell);

  for (const route of prerenderRoutes) {
    const result = render(route);
    const renderedHtml = typeof result === "string" ? result : result.html;
    const pageHead = typeof result === "string" ? {} : result.head;
    const html = applyPageHead(
      insertRenderedApp(template, renderedHtml, route),
      pageHead,
      route,
    );
    const relativePath = route === "/" ? "index.html" : `${route.slice(1)}/index.html`;
    const outputPath = path.join(publicDir, relativePath);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html);

    sitemapEntries.push(
      `  <url>\n    <loc>${siteUrl}${route === "/" ? "" : route}</loc>\n    <lastmod>${buildDate}</lastmod>\n  </url>`,
    );
    console.log(`Prerendered ${route} -> ${path.relative(root, outputPath)}`);
  }

  const notFound = render("/__prerender_not_found__");
  const notFoundHtml = insertRenderedApp(
    template,
    typeof notFound === "string" ? notFound : notFound.html,
    "/__prerender_not_found__",
  );
  await writeFile(
    path.join(publicDir, "404.html"),
    applyPageHead(
      notFoundHtml,
      typeof notFound === "string" ? {} : notFound.head,
      "/__prerender_not_found__",
    ),
  );

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapEntries,
    "</urlset>",
    "",
  ].join("\n");
  await writeFile(path.join(publicDir, "sitemap.xml"), sitemap);
  console.log(`Generated ${path.relative(root, path.join(publicDir, "sitemap.xml"))} (${buildDate})`);
}

main().catch((error) => {
  console.error("Prerender failed:", error);
  process.exitCode = 1;
});
