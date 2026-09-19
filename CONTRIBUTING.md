# Contributing

This repository is the public utility layer for Vezzy: design tokens, layout frames, and the in-browser execution loop.

## Scope

In scope:

- Tokens and CSS components
- Demo workspace behavior (edit, bundle, preview, console)
- Documentation of the public loop

Out of scope:

- Account, session, or billing systems
- Server-side runners and orchestration
- Database schemas and backup tooling

## How to work

1. Serve the repo root with `python -m http.server 4173`.
2. Open `/demo/` and confirm Run still paints the preview.
3. Keep the iframe sandbox without `allow-same-origin`.
4. Do not add nested glass panels. Inner surfaces stay `#1c1c1c` with a `#333` border.
5. Do not introduce a time-based grain, dither, or orbit shader on the public UI.

## License

By contributing you agree that your work is released under the MIT License in this repository.
