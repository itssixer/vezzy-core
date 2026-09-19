# Browser execution loop

This is the conceptual contract for Vezzy's HTML/CSS/JS track. The hosted product may wrap this loop with accounts and persistence. The loop itself is local to the browser.

## Files

A workspace is three text files:

- `index.html` document shell
- `style.css` page styles
- `script.js` page script

Additional files can exist. The open demo uses this three-file starter.

## Bundle

On Run:

1. Read the current HTML document.
2. If `style.css` has content, inject it as a `<style>` node before `</head>`.
3. If `script.js` has content, inject it as a `<script>` node before `</body>`.
4. Inject a tiny console hook that forwards `log`, `warn`, `error`, and `window.onerror` to the parent with `postMessage`.

No remote compiler, container, or language worker is required for this track.

## Preview

The bundled HTML is assigned to an iframe `srcdoc`. The iframe sandbox is:

```
allow-scripts allow-modals
```

`allow-same-origin` is omitted on purpose. Preview scripts run, but they do not inherit the parent origin, so they cannot touch Studio storage or UI.

## Console

The parent listens for `{ vezzy: 1, t, a }` messages and prints them in the Console pane. Errors are marked so a failed run is visible next to the preview.

## Keyboard

Ctrl+Enter or Cmd+Enter triggers Run. That mapping belongs in the UI layer, not in the preview document.

## What stays out of this document

How hosted Studio authenticates a user, where files are stored on a server, and how future language runtimes execute outside the browser are not part of this public loop.
