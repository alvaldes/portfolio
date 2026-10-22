import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import CanvasLoader from "./CanvasLoader";

// Absolute path: a relative one breaks under the /en/ prefix.
const MODEL_URL = "/images/planet/scene.gltf";

function Earth() {
	const earth = useGLTF(MODEL_URL);

	useFrame(({ clock }) => {
		earth.scene.rotation.y += 0.001 * clock.getDelta();
	});

	return <primitive object={earth.scene} scale={2.5} position-y={0} />;
}

export default function EarthCanvas() {
	return (
		<Canvas
			shadows
			frameloop="demand"
			dpr={[1, 2]}
			gl={{ preserveDrawingBuffer: true }}
			camera={{ fov: 35, near: 0.1, far: 200, position: [-4, 3, 6] }}
		>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls
					autoRotate
					enableZoom={false}
					enablePan={false}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>
				<Earth />
				<Preload all />
			</Suspense>
		</Canvas>
	);
}
