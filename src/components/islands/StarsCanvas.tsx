import { PointMaterial, Points, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { inSphere } from "maath/random";
import { Suspense, useRef, useState } from "react";
import type { Points as ThreePoints } from "three";
import { useIsDarkTheme } from "./useIsDarkTheme";

function Stars() {
	const ref = useRef<ThreePoints>(null);
	const [sphere] = useState(() => inSphere(new Float32Array(4998), { radius: 1.2 }) as Float32Array);
	const isDark = useIsDarkTheme();

	useFrame((_state, delta) => {
		if (!ref.current) return;
		ref.current.rotation.x -= delta / 10;
		ref.current.rotation.y -= delta / 15;
	});

	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points ref={ref} positions={sphere} stride={3} frustumCulled>
				<PointMaterial
					transparent
					color={isDark ? "white" : "black"}
					size={0.002}
					sizeAttenuation
					depthWrite={false}
				/>
			</Points>
		</group>
	);
}

export default function StarsCanvas() {
	return (
		<Canvas camera={{ position: [0, 0, 1] }}>
			<Suspense fallback={null}>
				<Stars />
			</Suspense>
			<Preload all />
		</Canvas>
	);
}
