import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect } from "react";

// Absolute path: a relative one breaks under the /en/ prefix.
// Optimized with gltf-transform (meshopt + WebP); drei's useGLTF decodes meshopt out of the box.
const MODEL_URL = "/images/planet/scene.glb";

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

export default function EarthScene({ loaded, onLoaded }: { loaded: boolean; onLoaded: () => void }) {
	return (
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
				<OnLoaded onLoaded={onLoaded} />
			</Suspense>
		</Canvas>
	);
}
