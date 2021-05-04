# Wootom

**WooWoo Editor for [Atom]**

---

**WARNING: THIS PROJECT IS A WORK IN PROGRESS**

## About

Wootom is a package (an extension) for the popular text editor [Atom]. Wootom
adds support for more comfortable editing of WooWoo documents.

Some of the added features are syntax highlighting, a toolbar to aid with
frequently used actions, [WYSIWYM](https://en.wikipedia.org/wiki/WYSIWYM)
preview, and more.

[atom]: https://atom.io

## External Dependencies

Wootom relies on a local installation of a TeX distribution to render [TikZ]
images. The TeX distribution must provide the `latex` and `dvisvgm` commands,
as well as the following (La)TeX packages: `amsmath`, `amssymb`, `bbding`,
`fontenc`, `inputenc`, `libertine`, `pgfplots`, `standalone`. If you don't
intend to use [TikZ] images in your WooWoo documents, you may ignore this.

[tikz]: https://texample.net/tikz/examples/

## License

Copyright ©‎ David Straka.

Licensed under the [MIT license](LICENSE.txt).
