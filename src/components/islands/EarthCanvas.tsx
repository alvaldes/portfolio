import { type ComponentType, useCallback, useEffect, useState } from "react";
import type EarthSceneType from "./EarthScene";

// Snapshot of the rendered model, shown until the real one has loaded.
const POSTER_URL = "/images/planet/poster.webp";

export default function EarthCanvas() {
	const [loaded, setLoaded] = useState(false);
	const [EarthScene, setEarthScene] = useState<ComponentType<Parameters<typeof EarthSceneType>[0]> | null>(null);
	const onLoaded = useCallback(() => setLoaded(true), []);

	// Imported in an effect so only the browser loads three.js; the server renders just the poster.
	useEffect(() => {
		import("./EarthScene").then((module) => setEarthScene(() => module.default));
	}, []);

	return (
		<div className="relative h-full w-full">
			{/* Server-rendered, so it shows before three.js has even downloaded. */}
			<img
				src={POSTER_URL}
				alt=""
				aria-hidden="true"
				fetchPriority="high"
				className={`pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`}
			/>
			{EarthScene && <EarthScene loaded={loaded} onLoaded={onLoaded} />}
		</div>
	);
}
