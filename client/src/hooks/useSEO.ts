import { useEffect } from "react";

export interface SEOOptions {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  path?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = "https://arquitectochile.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const ssrHead: Partial<SEOOptions> = {};

export function resetSSRHead() {
  delete ssrHead.title;
  delete ssrHead.description;
  delete ssrHead.keywords;
  delete ssrHead.ogImage;
  delete ssrHead.path;
  delete ssrHead.noindex;
  delete ssrHead.jsonLd;
}

function setMetaTag(name: string, content: string, isProperty = false) {
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let meta = document.querySelector(selector) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    if (isProperty) {
      meta.setAttribute("property", name);
    } else {
      meta.name = name;
    }
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}

export function useSEO(options: SEOOptions) {
  const { title, description, keywords, ogImage, path, noindex, jsonLd } = options;

  if (typeof window === "undefined") {
    Object.assign(ssrHead, options);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = title;

    setMetaTag("description", description);
    if (keywords) setMetaTag("keywords", keywords);
    setMetaTag("robots", noindex ? "noindex, nofollow" : "index, follow");

    const url = path ? `${SITE_URL}${path}` : SITE_URL;
    setCanonical(url);

    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:type", "website", true);
    setMetaTag("og:url", url, true);
    setMetaTag("og:site_name", "ArquitectoChile.com", true);
    setMetaTag("og:locale", "es_CL", true);
    setMetaTag("og:image", ogImage ?? DEFAULT_OG_IMAGE, true);

    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", ogImage ?? DEFAULT_OG_IMAGE);

    const existingJsonLd = document.getElementById("page-jsonld");
    if (jsonLd) {
      const script = (existingJsonLd ?? document.createElement("script")) as HTMLScriptElement;
      script.id = "page-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      if (!existingJsonLd) document.head.appendChild(script);
    } else {
      existingJsonLd?.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, keywords, ogImage, path, noindex, jsonLd]);
}
