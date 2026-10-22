import { useEffect, useState } from "react";

// Follows the `dark` class that ThemeSwitcher toggles on <html>.
export function useIsDarkTheme(): boolean {
	const [isDark, setIsDark] = useState(() =>
		typeof document === "undefined" ? false : document.documentElement.classList.contains("dark"),
	);

	useEffect(() => {
		const root = document.documentElement;
		const observer = new MutationObserver(() => setIsDark(root.classList.contains("dark")));
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	return isDark;
}
