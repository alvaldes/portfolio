import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

// Absolute paths: a relative one breaks under the /en/ prefix.
const MODEL_URL = "/images/planet/scene.gltf";
// Snapshot of the rendered model, shown until the real one has loaded.
const POSTER_URL = "/images/planet/poster.webp";

function Earth() {
	const earth = useGLTF(MODEL_URL);

	useFrame(({ clock }) => {
		earth.scene.rotation.y += 0.001 * clock.getDelta();
	});

	return <primitive object={earth.scene} scale={2.5} position-y={0} />;
}

// Mounts only once everything in its Suspense boundary has resolved.
function OnLoaded({ onLoaded }: { onLoaded: () => void }) {
	useEffect(onLoaded, [onLoaded]);
	return null;
}

export default function EarthCanvas() {
	const [loaded, setLoaded] = useState(false);

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
			<Canvas
				shadows
				frameloop="demand"
				dpr={[1, 2]}
				gl={{ preserveDrawingBuffer: true }}
				camera={{ fov: 35, near: 0.1, far: 200, position: [-4, 3, 6] }}
				className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
			>
				<Suspense fallback={null}>
					<OrbitControls
						autoRotate
						enableZoom={false}
						enablePan={false}
						maxPolarAngle={Math.PI / 2}
						minPolarAngle={Math.PI / 2}
					/>
					<Earth />
					<Preload all />
					<OnLoaded onLoaded={() => setLoaded(true)} />
				</Suspense>
			</Canvas>
		</div>
	);
}
