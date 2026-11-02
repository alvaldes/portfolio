// Run with `npm test` (Node's built-in test runner; Node 24 imports the TypeScript module directly).
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { largestSrcsetWidth, ZOOM_MARGIN, zoomBox } from "../src/lib/zoom.ts";

const viewport = { width: 1200, height: 800 };
const center = (box) => [box.left + box.width / 2, box.top + box.height / 2];

describe("zoomBox", () => {
	it("fits a small image to the viewport minus the margin when its natural size allows it", () => {
		const rect = { left: 100, top: 100, width: 400, height: 200 };
		const box = zoomBox(rect, { width: 4000, height: 2000 }, viewport);
		assert.equal(box.width, viewport.width - 2 * ZOOM_MARGIN);
		assert.equal(box.height, box.width / 2);
	});

	it("never grows past the image's natural size", () => {
		const rect = { left: 0, top: 0, width: 300, height: 150 };
		const box = zoomBox(rect, { width: 450, height: 225 }, viewport);
		assert.deepEqual([box.width, box.height], [450, 225]);
	});

	it("never shrinks an image shown larger than its natural size", () => {
		const rect = { left: 0, top: 0, width: 600, height: 300 };
		const box = zoomBox(rect, { width: 300, height: 150 }, viewport);
		assert.deepEqual([box.width, box.height], [600, 300]);
	});

	it("shows a cropped image whole, with its natural aspect ratio", () => {
		// A 2:1 image cropped to a wide banner.
		const rect = { left: 0, top: 0, width: 800, height: 100 };
		const box = zoomBox(rect, { width: 2000, height: 1000 }, viewport);
		assert.equal(box.width / box.height, 2);
		assert.equal(box.width, viewport.width - 2 * ZOOM_MARGIN);
		assert.ok(box.height > rect.height);
	});

	it("centers the box in the viewport", () => {
		const rect = { left: 100, top: 500, width: 200, height: 100 };
		const box = zoomBox(rect, { width: 2000, height: 1000 }, viewport);
		assert.deepEqual(center(box), [viewport.width / 2, viewport.height / 2]);
	});
});

describe("largestSrcsetWidth", () => {
	it("returns the widest w descriptor of a srcset", () => {
		assert.equal(largestSrcsetWidth("/a.webp 480w, /b.webp 1536w, /c.webp 768w"), 1536);
	});

	it("returns 0 when the srcset has no w descriptors", () => {
		assert.equal(largestSrcsetWidth(""), 0);
		assert.equal(largestSrcsetWidth("/a.webp 1x, /b.webp 2x"), 0);
	});
});
