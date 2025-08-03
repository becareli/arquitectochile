// Script para verificar optimizaciones SEO en la consola del navegador
// Copia y pega este código en la consola (F12 > Console) mientras estás en la página

console.log("=== VERIFICACIÓN SEO ARQUITECTOCHILE ===\n");

// 1. Verificar Title Tag
const title = document.title;
console.log("✓ TITLE TAG:");
console.log(`"${title}"`);
console.log(`Longitud: ${title.length} caracteres (óptimo: 50-60)\n`);

// 2. Verificar Meta Description
const metaDesc = document.querySelector('meta[name="description"]');
if (metaDesc) {
    console.log("✓ META DESCRIPTION:");
    console.log(`"${metaDesc.content}"`);
    console.log(`Longitud: ${metaDesc.content.length} caracteres (óptimo: 150-160)\n`);
} else {
    console.log("❌ META DESCRIPTION: No encontrada\n");
}

// 3. Verificar Keywords
const metaKeywords = document.querySelector('meta[name="keywords"]');
if (metaKeywords) {
    console.log("✓ META KEYWORDS:");
    console.log(`"${metaKeywords.content}"\n`);
} else {
    console.log("❌ META KEYWORDS: No encontradas\n");
}

// 4. Verificar Open Graph
const ogTitle = document.querySelector('meta[property="og:title"]');
const ogDesc = document.querySelector('meta[property="og:description"]');
console.log("✓ OPEN GRAPH TAGS:");
console.log(`Title: ${ogTitle ? ogTitle.content : 'No encontrado'}`);
console.log(`Description: ${ogDesc ? ogDesc.content : 'No encontrado'}\n`);

// 5. Verificar Schema JSON-LD
const schema = document.querySelector('script[type="application/ld+json"]');
if (schema) {
    console.log("✓ SCHEMA MARKUP (JSON-LD):");
    try {
        const schemaData = JSON.parse(schema.textContent);
        console.log("Tipo:", schemaData['@type']);
        console.log("Nombre:", schemaData.name);
        console.log("Precio:", schemaData.offers?.price, schemaData.offers?.priceCurrency);
        console.log("Proveedor:", schemaData.provider?.name);
    } catch (e) {
        console.log("Error parseando JSON-LD:", e);
    }
    console.log("");
} else {
    console.log("❌ SCHEMA MARKUP: No encontrado\n");
}

// 6. Verificar Headers (H1, H2, H3)
console.log("✓ ESTRUCTURA DE HEADERS:");
const h1s = document.querySelectorAll('h1');
const h2s = document.querySelectorAll('h2');
const h3s = document.querySelectorAll('h3');
console.log(`H1: ${h1s.length} (debe ser 1)`);
console.log(`H2: ${h2s.length}`);
console.log(`H3: ${h3s.length}\n`);

if (h1s.length > 0) {
    console.log("Contenido H1:", h1s[0].textContent.substring(0, 100) + "...");
}

// 7. Verificar Alt Tags de Imágenes
console.log("\n✓ IMÁGENES Y ALT TAGS:");
const images = document.querySelectorAll('img');
let imagesWithoutAlt = 0;
images.forEach((img, index) => {
    if (!img.alt || img.alt.trim() === '') {
        imagesWithoutAlt++;
    }
});
console.log(`Total imágenes: ${images.length}`);
console.log(`Sin alt tag: ${imagesWithoutAlt}`);
console.log(`Con alt tag: ${images.length - imagesWithoutAlt}\n`);

// 8. Puntuación general
console.log("=== PUNTUACIÓN SEO ===");
let score = 0;
const maxScore = 7;

if (title && title.length >= 30 && title.length <= 60) score++;
if (metaDesc && metaDesc.content.length >= 120 && metaDesc.content.length <= 160) score++;
if (metaKeywords) score++;
if (ogTitle && ogDesc) score++;
if (schema) score++;
if (h1s.length === 1) score++;
if (imagesWithoutAlt === 0) score++;

const percentage = Math.round((score / maxScore) * 100);
console.log(`Puntuación: ${score}/${maxScore} (${percentage}%)`);

if (percentage >= 90) {
    console.log("🟢 EXCELENTE - SEO muy bien optimizado");
} else if (percentage >= 70) {
    console.log("🟡 BUENO - SEO bien optimizado, pequeñas mejoras posibles");
} else {
    console.log("🔴 MEJORABLE - Necesita optimizaciones SEO adicionales");
}

console.log("\n=== FIN VERIFICACIÓN ===");