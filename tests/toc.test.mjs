// Run with `npm test` (Node's built-in test runner; Node 24 imports the TypeScript module directly).
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { activeHeadingId, MIN_TOC_SECTIONS, tocSections } from "../src/lib/toc.ts";

const heading = (depth, slug) => ({ depth, slug, text: slug });
// `count` sections, each followed by a ### subsection that must never count toward the minimum.
const post = (count) =>
	Array.from({ length: count }, (_, i) => [heading(2, `s${i}`), heading(3, `s${i}-sub`)]).flat();

describe("tocSections", () => {
	it("returns the ## headings of a post with exactly the minimum number of sections", () => {
		assert.deepEqual(
			tocSections(post(MIN_TOC_SECTIONS)).map((h) => h.slug),
			Array.from({ length: MIN_TOC_SECTIONS }, (_, i) => `s${i}`),
		);
	});

	it("returns nothing for a post one section below the minimum, so it gets no index", () => {
		assert.deepEqual(tocSections(post(MIN_TOC_SECTIONS - 1)), []);
	});

	it("counts only ## headings toward the minimum", () => {
		const headings = [heading(2, "a"), ...Array.from({ length: MIN_TOC_SECTIONS }, (_, i) => heading(3, `a-${i}`))];
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
