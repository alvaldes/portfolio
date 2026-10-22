import { Html, useProgress } from "@react-three/drei";

export default function CanvasLoader() {
	const { progress } = useProgress();
	return (
		<Html as="div" center className="flex flex-col items-center justify-center">
			<p className="text-sm font-extrabold text-zinc-100">{progress.toFixed(2)}%</p>
		</Html>
	);
}
