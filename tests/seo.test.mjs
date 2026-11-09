import assert from "node:assert/strict";

// Run against a production preview: node tests/seo.test.mjs http://localhost:3002
const base = process.argv[2] || "http://localhost:3002";
async function get(path) {
	const response = await fetch(new URL(path, base));
	assert.equal(response.status, 200, path);
	assert.doesNotMatch(response.headers.get("x-robots-tag") || "", /noindex/i);
	return response.text();
}

const html = await get("/");
assert.match(html, /<html[^>]+lang="pt-BR"/);
assert.match(
	html,
	/<title>Raphael Elias \| Desenvolvedor Full-Stack React e Next.js<\/title>/,
);
assert.match(
	html,
	/<link[^>]+rel="canonical"[^>]+href="https:\/\/raphaelelias.dev"/,
);
assert.match(html, /<meta[^>]+name="robots"[^>]+content="index, follow"/);
assert.match(html, /<meta[^>]+property="og:image:width"[^>]+content="883"/);
assert.match(html, /<meta[^>]+property="og:image:height"[^>]+content="552"/);
assert.match(html, /<meta[^>]+name="twitter:image:alt"[^>]+content="Portfólio/);
assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
const json = html.match(
	/<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
);
assert.ok(json, "Structured data must be present without JavaScript execution");
const graph = JSON.parse(json[1])["@graph"];
const person = graph.find((entry) => entry["@type"] === "Person");
const profile = graph.find((entry) => entry["@type"] === "ProfilePage");
assert.equal(person.name, "Raphael Elias");
assert.equal(profile.mainEntity["@id"], person["@id"]);
assert.match(
	await get("/robots.txt"),
	/Sitemap: https:\/\/raphaelelias.dev\/sitemap.xml/,
);
const sitemap = await get("/sitemap.xml");
assert.match(sitemap, /<loc>https:\/\/raphaelelias.dev<\/loc>/);
assert.equal((sitemap.match(/<loc>/g) || []).length, 1);
const missing = await fetch(new URL("/seo-page-that-does-not-exist", base));
assert.equal(missing.status, 404, "Unknown URLs must not become soft 404s");
console.log(
	"SEO: server HTML, canonical, headings, structured data, robots and sitemap passed.",
);
