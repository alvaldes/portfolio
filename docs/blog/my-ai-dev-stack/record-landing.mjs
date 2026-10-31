// Records the Netty landing frame by frame through CDP: deterministic scroll,
// a simulated agent cursor with a label, real hover and click.
const fs = await import("node:fs/promises");
const OUT = "/private/tmp/claude-501/-Users-alvaldes-Developer-portfolio/f269cd6a-4e63-4c9b-81ca-0dd2aba227a1/scratchpad/media/frames";
await fs.rm(OUT, { recursive: true, force: true });
await fs.mkdir(OUT, { recursive: true });

const W = 1440, H = 900;
const task = await taskSpace("netty landing recording");
const page = task.page("p1");
await page.cdp("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await page.goto("https://alvaldes.github.io/netty/");
await page.waitForTimeout(1500);

// Overlay: agent cursor + label chip, hidden scrollbar, flash layer.
const geo = await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = "auto";
  const style = document.createElement("style");
  style.textContent = `
    html::-webkit-scrollbar { display: none; }
    #agent { position: fixed; left: 0; top: 0; z-index: 2147483647; pointer-events: none; will-change: transform; }
    #agent svg { display: block; filter: drop-shadow(0 2px 4px rgba(0,0,0,.5)); }
    #agent .chip { position: absolute; left: 22px; top: 24px; white-space: nowrap; display: flex; align-items: center; gap: 8px;
      padding: 7px 12px; border-radius: 999px; background: rgba(20,21,26,.92); color: #fff; border: 1px solid rgba(255,255,255,.14);
      font: 600 14px -apple-system, system-ui, sans-serif; box-shadow: 0 8px 24px rgba(0,0,0,.4); }
    #agent .chip i { width: 8px; height: 8px; border-radius: 50%; background: #34c759; box-shadow: 0 0 10px #34c759; }
    #flash { position: fixed; inset: 0; z-index: 2147483646; pointer-events: none; background: #fff; opacity: 0; }`;
  document.head.append(style);
  const agent = document.createElement("div");
  agent.id = "agent";
  agent.innerHTML = `<svg width="26" height="30" viewBox="0 0 26 30"><path d="M3 2 L3 24 L9 18.5 L13 27 L17 25.2 L13 17 L21 17 Z" fill="#111" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg><div class="chip"><i></i><span></span></div>`;
  const flash = document.createElement("div");
  flash.id = "flash";
  document.body.append(agent, flash);

  const byText = (text) => [...document.querySelectorAll("h1,h2,h3,summary,button,a,span,p,div")]
    .find((el) => el.children.length === 0 && el.textContent.trim() === text);
  const top = (el) => el.getBoundingClientRect().top + window.scrollY;
  // The hero button wraps an icon, so match on innerText and take the first one on the page.
  const download = [...document.querySelectorAll("a,button")]
    .filter((el) => el.innerText.trim() === "Download for Mac")
    .sort((a, b) => top(a) - top(b))[0];
  const three = byText("Three colors, one glance.");
  const checks = byText("It checks the internet, not just your Wi-Fi.") || byText("Everything about your connection, nothing more.");
  const faqTitle = byText("Questions, answered.");
  const faq = byText("Is Netty free?");
  const faqTarget = faq && (faq.closest("summary,button,details") || faq);
  const r = download.getBoundingClientRect();
  return {
    download: { x: r.left + r.width / 2, y: r.top + r.height / 2 },
    three: top(three) - 120,
    checks: top(checks) - 160,
    faqY: top(faqTitle) - 120,
    faqTag: faqTarget ? faqTarget.tagName : null,
    maxY: document.documentElement.scrollHeight - innerHeight,
  };
});
console.log(geo);

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

// Keyframes: [frame, scrollY, cursorX, cursorY, label]
const start = { x: 1080, y: 640 };
const K = [
  [0, 0, start.x, start.y, "Reviewing the landing"],
  [12, 0, start.x, start.y, "Reviewing the landing"],
  [42, 0, geo.download.x + 10, geo.download.y + 6, "Checking the hero"],
  [64, 0, geo.download.x + 10, geo.download.y + 6, "Taking a screenshot"],
  [80, 0, geo.download.x + 10, geo.download.y + 6, "Taking a screenshot"],
  [140, geo.three, 820, 520, "Reviewing sections"],
  [170, geo.three, 820, 520, "Reviewing sections"],
  [235, geo.checks, 900, 560, "Reviewing sections"],
  [265, geo.checks, 900, 560, "Reviewing sections"],
  [335, geo.faqY, 700, 400, "Testing the FAQ"],
];
// FAQ question position is only known once scrolled there.
let faqPoint = null;
const TOTAL = 450;

let hovering = false, clicked = false;
for (let f = 0; f < TOTAL; f++) {
  if (f === 336 && !faqPoint) {
    await page.evaluate((y) => window.scrollTo(0, y), geo.faqY);
    faqPoint = await page.evaluate(() => {
      const el = [...document.querySelectorAll("summary,button,span,p,div")]
        .find((e) => e.children.length === 0 && e.textContent.trim() === "Is Netty free?");
      const r = el.getBoundingClientRect();
      return { x: r.left + Math.min(r.width, 220) / 2 + 40, y: r.top + r.height / 2 };
    });
    K.push([365, geo.faqY, faqPoint.x, faqPoint.y + 6, "Testing the FAQ"]);
    K.push([400, geo.faqY, faqPoint.x, faqPoint.y + 6, "Testing the FAQ"]);
    K.push([440, 0, start.x, start.y, "Reviewing the landing"]);
    K.push([TOTAL - 1, 0, start.x, start.y, "Reviewing the landing"]);
  }
  let i = K.length - 1;
  while (i > 0 && K[i - 1][0] > f) i--;
  const [k0, k1] = f >= K[K.length - 1][0] ? [K[K.length - 1], K[K.length - 1]] : (() => {
    let j = 0;
    while (K[j + 1] && K[j + 1][0] <= f) j++;
    return [K[j], K[j + 1] || K[j]];
  })();
  const t = k1[0] === k0[0] ? 1 : ease((f - k0[0]) / (k1[0] - k0[0]));
  const y = Math.round(lerp(k0[1], k1[1], t));
  const cx = lerp(k0[2], k1[2], t), cy = lerp(k0[3], k1[3], t);
  const label = t < 0.5 ? k0[4] : k1[4];
  const flash = f >= 64 && f < 80 ? Math.max(0, 0.55 - (f - 64) * 0.035) : 0;

  await page.evaluate(({ y, cx, cy, label, flash }) => {
    window.scrollTo(0, y);
    const a = document.getElementById("agent");
    a.style.transform = `translate(${cx}px, ${cy}px)`;
    a.querySelector("span").textContent = label;
    document.getElementById("flash").style.opacity = flash;
  }, { y, cx, cy, label, flash });

  // Real pointer: hover the download button, click the FAQ question.
  if (f === 42 && !hovering) {
    await page.cdp("Input.dispatchMouseEvent", { type: "mouseMoved", x: geo.download.x, y: geo.download.y });
    hovering = true;
  }
  if (f === 80) await page.cdp("Input.dispatchMouseEvent", { type: "mouseMoved", x: 5, y: 5 });
  if (f === 368 && !clicked && faqPoint) {
    for (const type of ["mouseMoved", "mousePressed", "mouseReleased"])
      await page.cdp("Input.dispatchMouseEvent", { type, x: faqPoint.x, y: faqPoint.y, button: "left", clickCount: 1 });
    clicked = true;
  }
  if (f === 425) {
    // Close the FAQ again so the loop ends where it started.
    await page.evaluate(() => document.querySelectorAll("details[open]").forEach((d) => d.removeAttribute("open")));
  }

  const shot = await page.cdp("Page.captureScreenshot", { format: "png" });
  await fs.writeFile(`${OUT}/f${String(f).padStart(4, "0")}.png`, Buffer.from(shot.data, "base64"));
}
console.log({ frames: TOTAL, faqPoint });
