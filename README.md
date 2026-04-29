# Copito de Nieve — Safari

A quiet tribute to the only albino gorilla who ever lived. For Safari on iOS and macOS.

Copito de Nieve — *"Snowflake"* — was born in the Equatorial Guinean jungle in 1964 and lived at the Barcelona Zoo from 1966 until his death in 2003. He was the only confirmed albino gorilla in recorded history. For nearly four decades he was Barcelona's most beloved resident, gently watching millions of visitors pass by his enclosure. When he died of skin cancer, the city mourned him like a family member.

This extension is a small, quiet homage to him.

## How it works

On roughly 2% of page loads, Copito appears in the bottom-right corner of the page. He stays for about two seconds, looks at you, and then disappears. That's it. No menus, no notifications, no tracking, no interruption to what you're doing. Just a brief, unexpected visit from an old friend.

Five different photographs of Copito are included, picked at random. Over time, you'll come to recognize each of his moods.

## For the impatient

If 2% feels too rare, you can summon him manually:

- Press **Option + Shift + G** on any webpage and he will appear immediately (macOS only).
- Or open the extension popup and tap **Test gorilla**.
- Or, in Safari's Web Inspector, switch the Console context to **Copito de Nieve** and call `__copito()`.

## What this extension does not do

- It does not collect any data about you.
- It does not track your browsing history.
- It does not send anything to any server.
- It does not show ads.
- It does not modify any website's content beyond briefly overlaying a small image.

The source is deliberately tiny — around 60 lines of JavaScript — so anyone curious can read it in a minute.

The full privacy policy lives at [pieterdekroon.com/docs/privacy-copito-de-nieve](https://www.pieterdekroon.com/docs/privacy-copito-de-nieve).

## Install

### From the App Store
The Safari version ships as an iOS and macOS app on the App Store. Install the app, then enable the extension in **Safari → Settings → Extensions** and grant access to websites.

### Locally (development)
1. Open the Xcode project at `xcode/Copito de Nieve/Copito de Nieve.xcodeproj`
2. Select the macOS or iOS target and run (⌘R)
3. In Safari: **Settings → Extensions → Copito de Nieve** and enable it
4. On macOS, you may first need to enable **Develop → Allow Unsigned Extensions**
5. Browse around — 2% chance per page load

After code changes: re-run the app from Xcode and toggle the extension off/on in Safari.

## Project layout

- `extension/` — the web extension source (manifest, JS, CSS, assets)
  - `manifest.json` — extension declaration
  - `content.js` — the logic (chance, random pick, animation timing)
  - `content.css` — positioning and animations
  - `popup.html` / `popup.js` / `popup.css` — toggle and test button
  - `assets/` — the five gorilla PNGs
  - `icon.png` — 128×128 toolbar icon
- `xcode/` — Xcode project that wraps the extension into a Safari Web Extension app for iOS and macOS
- `PRIVACY.md` — privacy policy source

> Note: the Xcode project keeps its own copy of the extension files under `xcode/Copito de Nieve/Shared (Extension)/Resources/`. When you change anything in `/extension`, mirror the change there before building.

## Knobs to turn

In `extension/content.js`:
- `CHANCE` — chance per page load (`0.02` = 2%)
- `DELAY_MS` — delay before appearance (600ms)
- `STARE_MS` — how long he stays (1800ms)
- `ENTRY_MS` — entry animation duration (400ms)

In `extension/content.css`:
- The `cubic-bezier` on the entry transition controls the "pop" — `(0.34, 1.56, 0.64, 1)` gives a slight overshoot. For something tighter, use `ease-out`.

## More or fewer gorillas

In `extension/content.js` there's a `GORILLAS` array with filenames. Add a new entry and drop the matching PNG into `extension/assets/`, and it joins the random pool. No manifest changes needed — the `assets/*.png` wildcard is already there.

Transparent PNGs look best. Max ~1000px tall is plenty (the CSS scales to 50vh, max 500px).

## Why

Because the internet is loud, and Copito was quiet. Because he deserved to be remembered somewhere beyond a plaque at the Barcelona Zoo. And because every now and then, in the middle of a work day, it's nice to be reminded that the world once held something as improbable and gentle as a snow-white gorilla.

*Copito de Nieve, 1964–2003. Rest easy, old friend.*
