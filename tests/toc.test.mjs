// Run with `npm test` (Node's built-in test runner; Node 24 imports the TypeScript module directly).
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { activeHeadingId, MIN_TOC_SECTIONS, tocSections } from "../src/lib/toc.ts";

const heading = (depth, slug) => ({ depth, slug, text: slug });

describe("tocSections", () => {
	it("returns the ## headings of a post with enough sections", () => {
		const headings = [heading(2, "a"), heading(3, "a-1"), heading(2, "b"), heading(2, "c")];
		assert.deepEqual(
			tocSections(headings).map((h) => h.slug),
			["a", "b", "c"],
		);
	});

	it("returns nothing for a post below the minimum, so it gets no index", () => {
		const headings = [heading(2, "a"), heading(3, "a-1"), heading(3, "a-2"), heading(2, "b")];
		assert.equal(MIN_TOC_SECTIONS, 3);
		assert.deepEqual(tocSections(headings), []);
	});

	it("counts only ## headings toward the minimum", () => {
		const headings = [heading(2, "a"), heading(3, "a-1"), heading(3, "a-2"), heading(3, "a-3")];
		assert.deepEqual(tocSections(headings), []);
	});
});

describe("activeHeadingId", () => {
	const headings = [
		{ id: "intro", top: 150 },
		{ id: "middle", top: 600 },
		{ id: "end", top: 1400 },
	];

	it("is undefined while no heading has reached the threshold", () => {
		assert.equal(activeHeadingId([{ id: "intro", top: 400 }], 300), undefined);
	});

	it("is the last heading at or above the threshold", () => {
		assert.equal(activeHeadingId(headings, 300), "intro");
		assert.equal(activeHeadingId(headings, 600), "middle");
	});

	it("keeps the last section active once every heading is past", () => {
		const scrolled = headings.map((h) => ({ ...h, top: h.top - 2000 }));
		assert.equal(activeHeadingId(scrolled, 300), "end");
	});
});
