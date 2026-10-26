---
shortDescription: "Keyboard-driven screen navigation for macOS: click anything on screen without touching the mouse."
---

**JUMP** is a macOS menu bar app that replaces the mouse with the keyboard. Press a shortcut and every clickable element of the focused window gets a short label; type the label and JUMP clicks it. Besides **hints**, it has a Vim-style **scroll** mode (`h j k l`, `gg G`) and a visible **text search** that ignores case and accents. Holding a modifier while typing picks the action: right-click, double-click or just move the pointer. It reads other apps' interfaces through Accessibility and, for windows without accessible text such as terminals or PDFs, offers an optional Vision OCR fallback whose captures never leave memory. It ships five hint themes, Liquid Glass, configurable shortcuts and excluded apps. The core lives in a Swift package tested without launching the app.
