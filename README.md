# ClaudeCutMotion

A **30-second, frame-accurate replication** of a hand-drawn "process video" for a fictional AI video
editor (`小克剪辑`), rebuilt from scratch as a [Remotion](https://remotion.dev) composition.

Everything you see is generated at render time from React + CSS + inline SVG: **no image, video or
audio assets, no network calls**. Two renders of the same frame are byte-identical.

```
1920 × 1080 · 30 fps · 900 frames · 30.000 s · H.264 · silent
```

## What the clip is

A flat-vector, hand-lettered mock of a Chinese desktop NLE. A terracotta block mascot ("小克") acts out
an edit on a drawn UI: it points at panels with an extensible pointer-arm, cuts a clip, stamps stickers
(`Ctrl+Z`, `已修正`, `踩坑`), drives the `调整` sliders to 70 / 110 / 60 / 1.0, marks the beat row (`卡点`),
and finally the export button runs `导出 → 渲染中 99% → 渲染中 99.999% → 完成 ✓` while the app fades back
and the finished video plays in a hero phone next to a handwritten note ending in
`30 秒剪完, Opus 5.5 — 小克 收工 ✨`.

Two independent layers of motion are deliberately kept apart:

1. **camera** — one global scale/translate per frame: `screen = (canvas − F) · s + (640, 360)`
2. **phone element self-animation** — the centre phone is *not* rigid: 215 × 337 canvas px at 1.00 s,
   easing to 198 × 302 by 2.00 s (both measured from the reference), holding through 26.1 s, then
   growing to 310 × 465 with its centre travelling (645, 217) → (605, 362).

The design space is **1280 × 720** (identical to the reference frames, so measurements transfer 1:1) and
the composition root scales it by exactly **1.5** to reach 1920 × 1080.

## Quick start

```bash
npm install

npm run studio     # Remotion Studio preview (opens a browser)
npm run still      # one PNG of frame 0 -> out/stills/t00.00.png
npm run render     # full master -> out/master.mp4   (1920x1080, 30fps, 900 frames)
npm run typecheck  # tsc --noEmit
```

`npm run render` is just the official Remotion CLI:

```bash
npx remotion render src/index.ts ClaudeCutMotion out/master.mp4
```

It needs only **Node 18+ and a Chrome/Chromium build** — Remotion downloads its own headless shell on
first use. If a machine already has Chrome and the download is not possible, point at it explicitly:

```bash
npx remotion render src/index.ts ClaudeCutMotion out/master.mp4 \
  --browser-executable="C:\Program Files\Google\Chrome\Application\chrome.exe" --gl=swangle
```

### Stills

```bash
# t = seconds -> frame = round(t * 30)
npx remotion still src/index.ts ClaudeCutMotion out/stills/t23.00.png --frame=690
```

To regenerate the whole evidence set (every 0.5 s plus the checklist times) see `out/REPORT.md`.

## Structure

```
src/
  index.ts        registerRoot
  Root.tsx        <Composition id="ClaudeCutMotion" 1920x1080 30fps 900 frames>
  Motion.tsx      layer stack: paper → camera → window → phone → mascot → code card → stickers
  beats.ts        every timing: camera keys, phone growth, button states, scenes, sliders, playhead
  layout.ts       every rect from SPEC §1 (window, panels, phone, timeline) in canvas px
  theme.ts        palette + type stacks (KaiTi / Ink Free / FZShuTi)
  anim.ts         deterministic helpers (track, spring-in, seeded rnd, eased progress)
  scenes/         NightScene, RamenScene, CorgiScene, DiscoScene  (inline SVG illustrations)
  ui/
    Camera.tsx        the global scale/translate
    box.tsx           Abs / Txt primitives + hand-drawn wobble
    TitleBar.tsx      3 lights · film icon · filename · timecode pill · 已自动保存 · 1080p · action button
    LeftPanel.tsx     素材 (4 cards + 2 import slots) / 转场 (6 tiles) / 文字 (3 presets)
    AdjustPanel.tsx   调整 + 4 sliders (闪光/饱和度/缩放冲击/速度)
    PhonePreview.tsx  9:16 preview, notch, transport, 4 scenes, self-animation, social overlays
    Timeline.tsx      ruler, rail T/▶/♪, 5 clip cards, transition badges, text pill, audio + waveform,
                      卡点 button, beat triangles, playhead
    Mascot.tsx        the rig (body, oval eyes, legs, arm stub, sunglasses) + pointer-arm
    MascotStage.tsx   pose/position/target choreography, camera-independent
    Stickers.tsx      22 annotation events, incl. the ruled sticky note and confetti
scripts/
  bundle-check.cjs  rspack bundle pre-flight (catches bad imports without launching a browser)
  render.cjs        optional fallback driver for environments that deny child processes their own
                    stdio pipes; `npm run render` does NOT use it (see out/REPORT.md)
```

## Beat sheet (39 beats, continuous 0.0 → 30.0 s)

| # | t | what happens |
|---|---|---|
| B01 | 0.00–0.35 | code card types `const 剪辑软件 = 小克.写代码()` |
| B02 | 0.35–0.70 | window border draws on behind the card; card tilts 2° |
| B03 | 0.70–1.00 | title bar / 素材 panel / phone pop in; card slides up-left and fades |
| B04 | 1.00–1.60 | full window, phone screen black, 调整 panel and empty timeline reveal |
| B05 | 1.60–2.40 | mascot walks in to x≈205, pointer-arm up-left, `开工！` bubble |
| B06 | 2.40–3.20 | 5 clip cards drop into the video track (70 ms stagger) |
| B07 | 3.20–4.20 | phone cuts to 夜景; audio bar + waveform slide in at 3.9 |
| B08 | 4.20–5.10 | camera push onto the timeline (M2); mascot hops on the ruler |
| B09 | 5.10–5.60 | glitch flash: RGB split + blurred grey card `对镜中` |
| B10 | 5.60–6.10 | timeline stays big, playhead crosses a clip edge |
| B11 | 6.10–6.90 | mascot drags a clip to the bin at (620,505); `啪!` |
| B12 | 6.90–7.50 | phone → 拉面 |
| B13 | 7.50–8.30 | `清爽!` sticker; camera pulls back (M3) |
| B14 | 8.30–9.30 | settle on the left panel; 转场 tab; `踩坑` stamp |
| B15 | 9.30–10.20 | 旋转 tile flips grey → lavender; `空心入网!` draws on |
| B16 | 10.20–11.20 | pointer-arm stretches to the 溶解 tile |
| B17 | 11.20–12.20 | phone → purple disco |
| B18 | 12.20–13.20 | camera to the 文字 presets (M4); 文字 tab |
| B19 | 13.20–14.00 | phone → 柴犬 + `前方高能预警`; text clip drops at 13.6 |
| B20 | 14.00–15.00 | mascot stands, one blink; `Ctrl+Z` keycap, `已修正` stamp |
| B21 | 15.00–16.00 | `撤销!` pops; stickers hold |
| B22 | 16.00–16.20 | 3-frame white flash + tear (montage cut) |
| B23 | 16.20–17.20 | camera to 调整 (M5); 闪光 0 → 70 % |
| B24 | 17.20–18.10 | 饱和度 100 → 110; `饱和度拉满`, `极限!!` blinks |
| B25 | 18.10–19.30 | 缩放冲击 0 → 43 → 60 %; `…太亮了` |
| B26 | 19.30–19.60 | `低!` beside the mascot |
| B27 | 19.60–20.20 | camera pulls back to the full timeline (M6) |
| B28 | 20.20–21.00 | `卡点` button slides in; beat triangles pop (pitch 38.2 px) |
| B29 | 21.00–21.60 | mascot walks right along the waveform; `卡点` sticker |
| B30 | 21.60–22.40 | phone re-plays 柴犬 + `前方高能预警` |
| B31 | 22.40–23.20 | sunglasses land on the head; eyes `^^`; blush in |
| B32 | 23.20–24.20 | camera to render (M7); button → `渲染中 99%` at 24.1 |
| B33 | 24.20–25.30 | `BONK!` slams in |
| B34 | 25.30–26.15 | button → `渲染中 99.999%` |
| B35 | 26.15–26.50 | button → `完成 ✓`; `啦!`, `叮!` |
| B36 | 26.50–27.10 | camera back to neutral (M8); app fades to 22 % |
| B37 | 27.10–28.00 | sticky note slides in; phone grows to hero size |
| B38 | 28.00–29.20 | note types `30 秒剪完,` / `Opus 5.5` + red underline; `拿捏了!` |
| B39 | 29.20–30.00 | `— 小克 收工 ✨`, mascot waves, social overlays fade in |

## Determinism

* every animated value is a pure function of `useCurrentFrame()`
* no CSS transitions, no `@keyframes`, no `setTimeout`, no `Date.now()`
* randomness is a seeded hash (`rnd(seed)`) — waveform, confetti and sparkles never change between runs
* no fonts, images or media are fetched at render time (system fonts only)

## Known deviations from the reference

| # | deviation | why |
|---|---|---|
| 1 | **The master is silent.** The reference shipped an AAC track (30.06 s). | The composition is asset-free by design; adding audio would mean committing a media file. |
| 2 | **Fonts are substitutions.** The reference uses a custom hand-lettered CJK face; we use `KaiTi` + `Ink Free` + `FZShuTi` (the closest stock faces on this machine). | Glyph shapes differ slightly; all text content is verbatim. |
| 3 | The camera stays at the **identity** (s = 1, F = (640,360)) for 0.00–1.60 s instead of the `s ≈ 1.00 → 1.25` push the spec floats for the cold open. | The fidelity checklist's A1 pins the code card at canvas centre (639, 348) at t = 0.10, which the identity camera + canvas placement satisfies exactly. |
| 4 | `BONK!` is anchored over the **right panel** (canvas ≈ (1000, 310)) rather than the spec's sticker bbox (500–1000, 320–545). | With the 1.26–1.39 camera push at 25.3 s, only that anchor puts it over the 调整 panel's lower half, which is what the reference frame shows (checklist G3). |
| 5 | The 0.30–0.65 s mascot cameo in front of the code card is dropped; the mascot enters at 1.55 s. | Reference frames t = 0.00/0.50 show no mascot at all. |
| 6 | Audio waveform, thumbnails and the four illustrations are original flat-vector drawings, not copies of the reference's art. | Asset-free / no-reference-content rule. Compositions and colours match; exact line work does not. |

## Verification

`out/REPORT.md` records the exact commands, ffprobe output, still list and the self-check table
(matched aspects + weakest aspects). `npx tsc --noEmit` is clean and `node scripts/bundle-check.cjs`
bundles the tree with rspack.

## License

MIT.
