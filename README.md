<p align="center">
  <img src="assets/vezzy-logo.png" alt="Vezzy" width="168" />
</p>

<h1 align="center">vezzy-core</h1>

<p align="center">Open-core UI and in-browser execution loop for <a href="https://vezzy.app">Vezzy</a>.</p>

Vezzy is a learning workspace for people who want to write HTML, CSS, and JavaScript, run it, and see it render live in the browser. This repository is the public utility layer that grounds that identity: the brutalist design system, layout frames, and the client-side run loop.

Licensed under [MIT](LICENSE).

## What this repository is

- Brand marks (`assets/vezzy-logo.png`, `assets/vezzy-logo.svg`)
- Design tokens (color, type, radius, rails)
- Layout frames for the Studio workspace (sidebar, home grid, editor, preview)
- A working demo of the browser execution loop
- Documentation of how a page is bundled and rendered without a remote compiler

Open `demo/index.html` through a local static server and you can edit three files, hit Run, and watch the result in a sandboxed iframe.

## What this repository is not

Hosted Studio, account sessions, access control, edge runners, databases, backups, and commercial scaling tools live in private repositories. This tree is the public utility layer only.

## Browser execution loop

Vezzy does not ship student code to a remote language runtime for the HTML/CSS/JS track. The loop stays in the browser:

1. The learner edits `index.html`, `style.css`, and `script.js`.
2. Run concatenates those files into one HTML document.
3. The document is written into a sandboxed iframe with `srcdoc`.
4. `console.log`, warnings, and errors come back to the parent through `postMessage`.

The iframe uses `sandbox="allow-scripts allow-modals"` and does not set `allow-same-origin`. Preview code cannot read the parent page. See [docs/execution.md](docs/execution.md).

## Run the demo

Serve the repo root (required so `src/` and `demo/` resolve):

```bash
python -m http.server 4173
```

Then open [http://127.0.0.1:4173/demo/](http://127.0.0.1:4173/demo/).

Edit the files, press **RUN** or Ctrl/Cmd+Enter, and read the preview plus console.

## Repository layout

```
assets/          Vezzy logo and favicons
src/tokens.css   Design tokens
src/ui.css       Layout frames and components
demo/            Interactive workspace demo
docs/            Vision and execution notes
LICENSE          MIT
```

## Vision

Write it. Execute it. See it. Keep going until Hello World is a small service you can point at, not a leftover tutorial. The public core exists so that identity can be inspected, forked, and improved in the open.

Product site: [vezzy.app](https://vezzy.app)

## License

[MIT](LICENSE) Copyright (c) 2026 Vangate LLC
