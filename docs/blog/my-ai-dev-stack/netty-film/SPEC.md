# SPEC: Netty, end to end (storyline B: one sentence, all the way through)

GOAL:    the viewer sees one real sentence from idea.md turn into a shipped app, and gets that one developer
         directed a team of agents from Oct 27 to Oct 30.
OUTPUT:  HyperFrames, 1920 x 1080, 30 fps. Delivered to the blog at 1280 px, H.264, with controls (not a loop).
TIME:    41 s x 30 fps = 1230 frames. Bed at 96 BPM = 18.75 frames per beat; cuts land on beats.

LOOK:    medium: real product UI (Ghostty, herdr, the Netty landing, the blog), shown full bleed, never as a
         small window on a void.
         ground between UI shots: #16181c graphite with the Netty landing's own green radial
         (#34c759 at 14% opacity, 900 px radius, top right). It is the brand's material, so it is allowed.
         ink: #f2f3f5. secondary ink: #9a9ca6.
         accent: Netty green #34c759, only on the travelling sentence's highlight, the status dot and
         "They build". Yellow #ffcc00 only on herdr's "needs you" state, as recorded.
         display: Inter 900, 112 px, -2% tracking. body: Inter 700, 44 px. code: JetBrains Mono 400, 34 px.
         depth: UI panels get a 0 24 60 rgba(0,0,0,.45) shadow, 14 px radius. No grain, no vignette.
OBJECTS: idea.md as a code editor pane: line numbers, real Markdown, the file name "idea.md" in the tab.
         the travelling sentence: a green highlight bar under real text, the same text in every shot.
         herdr: the real recording (sidebar with workspaces and status dots, Claude Code panes).
         the commit list: real `git log` lines from Oct 27, time + subject, JetBrains Mono.
         the landing: the real ego-browser recording, agent cursor and chip included.
         the launch post: the real "introducing-netty" page from this blog.
         the menu bar dot: a real crop of the macOS menu bar with Netty's status item.
         the Netty mark: the app icon from Netty.app.
MOTION:  enter: power3.out, 18 frames. move: power2.inOut, 15 frames. camera push: power2.inOut, 24 frames.
         exit: power2.in, 12 frames. stagger: 3 frames. The highlight bar wipes left to right in 12 frames.
SHOTS:
  01  0-120     idea.md fills the frame; the cursor drags across "tells you at a glance whether you are
                really on the internet" and the green bar wipes under it. reads: "idea.md · Oct 27, 12:25"
                (0.3-1.5 s); the sentence highlighted (1.5-4.0 s). sound: bed enters; a soft select tick.
                hand-off: the highlighted sentence lifts off the page as a chip.
  02  120-300   the chip flies into herdr's sidebar and splits into three status dots; herdr footage plays
                (three agents working, one goes yellow, "needs you"). reads: "One idea. Three agents."
                (4.5-7.0 s); the yellow dot (7.5-10.0 s). sound: three soft pops on the split.
                hand-off: push into the main agent's pane until its text becomes the commit list.
  03  300-510   the commit list streams upward, real subjects and times, 12:25 at the top, 22:58 last.
                a clock counter reads 12:25 → 22:58 beside it. reads: "Oct 27" (10.3-12.0 s);
                "38 commits" (13.0-17.0 s). sound: key clicks under the stream, one per beat.
                hand-off: the last commit, "feat(landing): …", opens into the landing.
  04  510-780   the ego-browser recording: the agent cursor reaches "Download for Mac", the screenshot
                flash, a scroll through the sections. The landing lede "A dot in your Mac's menu bar"
                gets the same green bar as shot 01. reads: the lede with its bar (17.5-21.0 s);
                "The agent checks its own work" (21.5-25.5 s). sound: shutter on the flash.
                hand-off: the browser pulls back and the blog post slides in over it.
  05  780-990   the launch post "introducing-netty" fills the frame, then shrinks toward the top right,
                into the real menu bar crop; Netty's dot turns green. reads: the post title (26.3-28.5 s);
                the green dot (30.0-33.0 s). sound: a chime when the dot turns green.
                hand-off: the dot scales up and becomes the period of the claim.
  06  990-1110  the claim, two lines, centred left: "I direct." then "They build." in green.
                reads: each line 1.5 s. sound: bed resolves.
  07  1110-1230 end card: the Netty icon is carried in from the dot, the wordmark wipes in beside it,
                then "Oct 27 → Oct 30" and "alvaldes.github.io/netty". The icon is 22% of the frame width.
                holds the last 2 s. sound: last note rings out.
BANNED:  a dark void with small floating UI; glow, particles, lens flares; glass cards; three cards in a row;
         a title over a dimmed screenshot; typing into a prompt box as the opener; the logo docked in a
         corner; every element fading and sliding up; text that moves while it is read; invented UI,
         invented numbers or invented launch channels.
QA:      frame 60 (sentence highlighted), 210 (three agents, one yellow), 420 (commit stream readable),
         600 (lede with the green bar), 960 (green dot in the menu bar), 1050 (claim), 1200 (end card).
         Every frame: text ≥ 28 px at 1080, no UI smaller than 40% of the frame height.
