"""Apply Recordly-style zooms to recorded frames: ease in on a point, hold, ease out."""
import subprocess
import sys
from pathlib import Path

src, dst = Path(sys.argv[1]), Path(sys.argv[2])
dst.mkdir(parents=True, exist_ok=True)
W, H, Z = 1440, 900, 1.45

# (start, full, release, end, focus_x, focus_y)
ZOOMS = [
    (28, 44, 84, 100, 287, 562),
    (346, 362, 402, 418, 334, 241),
]


def smooth(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def zoom_at(n):
    for start, full, release, end, fx, fy in ZOOMS:
        if start <= n <= end:
            if n < full:
                k = smooth((n - start) / (full - start))
            elif n <= release:
                k = 1.0
            else:
                k = 1 - smooth((n - release) / (end - release))
            return 1 + (Z - 1) * k, fx, fy
    return 1.0, 0, 0


frames = sorted(src.glob("f*.png"))
for i, frame in enumerate(frames):
    out = dst / frame.name
    z, fx, fy = zoom_at(i)
    if z == 1.0:
        out.write_bytes(frame.read_bytes())
        continue
    cw, ch = W / z, H / z
    x = min(max(fx - cw / 2, 0), W - cw)
    y = min(max(fy - ch / 2, 0), H - ch)
    subprocess.run(
        ["magick", str(frame), "-crop", f"{cw:.2f}x{ch:.2f}+{x:.2f}+{y:.2f}", "+repage",
         "-filter", "Lanczos", "-resize", f"{W}x{H}!", str(out)],
        check=True,
    )
print(len(frames))
