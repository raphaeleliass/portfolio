import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

const source = ts.transpile(
	readFileSync(
		new URL("../src/services/getBlogPosts.ts", import.meta.url),
		"utf8",
	),
	{ module: ts.ModuleKind.ESNext },
);
const { getBlogPosts } = await import(
	`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);
const originalFetch = globalThis.fetch;
const originalError = console.error;
try {
	globalThis.fetch = async () => ({
		ok: true,
		json: async () => [
			{ id: "public", draft: false },
			{ id: "draft", draft: true },
		],
	});
	assert.deepEqual(await getBlogPosts(), [{ id: "public", draft: false }]);
	globalThis.fetch = async () => ({
		ok: true,
		json: async () => ({ error: "invalid response" }),
	});
	assert.deepEqual(await getBlogPosts(), []);
	console.error = () => {};
	globalThis.fetch = async () => ({ ok: false });
	assert.deepEqual(await getBlogPosts(), []);
	globalThis.fetch = async () => {
		throw new Error("offline");
	};
	assert.deepEqual(await getBlogPosts(), []);
} finally {
	globalThis.fetch = originalFetch;
	console.error = originalError;
}
console.log(
	"Blog: published posts, invalid response, HTTP error and offline fallback passed.",
);
