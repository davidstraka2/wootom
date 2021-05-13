# Wootom

**WooWoo Editor for [Atom]**

---

## About

Wootom is a package (an extension) for the popular text editor [Atom]. Wootom
adds support for streamlining the process of editing WooWoo documents.

Added features:

-   WooWoo syntax highlighting
-   Live [WYSIWYM](https://en.wikipedia.org/wiki/WYSIWYM) preview of the currently
    open file (`wootom:togglePreview`) using the FIT Template, including support
    for displaying math expressions and TikZ images
-   Custom MathJax macros support, as well as custom LaTeX preamble support for
    generating TikZ SVGs, and different modes of displaying the SVGs (see the
    package settings)
-   Navigation pane with the table of contents and table of labels of the
    currently open file (`wootom:toggleNavigation`), including fuzzy search
    within the tables
-   WooWoo support for the `editor:toggle-line-comments` command
-   Snippets for the FIT Template

[atom]: https://atom.io

## External Dependencies

Wootom relies on a local installation of a TeX distribution to render [TikZ]
images. The TeX distribution must provide the `latex` and `dvisvgm` commands,
as well as the following (La)TeX packages: `amsmath`, `amssymb`, `bbding`,
`fontenc`, `inputenc`, `libertine`, `pgfplots`, `standalone`. If you don't
intend to use [TikZ] images in your WooWoo documents, you may ignore this.

[tikz]: https://texample.net/tikz/examples/

## Development Setup

Node.js (with npm) is required for development in addition to the previously
mentioned dependencies.

1. `apm link`
2. `npm install`
3. `npm run build`

### Useful Commands

-   `npm test` - Run package tests
-   `npm run build` - Build
-   `npm run format:check` - Check formatting
-   `npm run format:fix` - Fix formatting
-   `npm run lint:check` - Lint
-   `npm run lint:fix` - Lint and attempt to fix issues
-   `npm run pack` - Create production package

## License

Copyright ©‎ David Straka.

Licensed under the [MIT license](LICENSE.txt).
