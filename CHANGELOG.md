# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] (2021-03-16)

### Added

-   WooWoo grammar support of inner environments (including inline math) in
    document part titles for better syntax highlighting [[#18]]
-   Private API for opening and rendering an HTML preview [[#16], [#21]]
-   The `demoView` command, which demonstrates the aforementioned API [[#16]]

### Changed

-   Improved WooWoo grammar support of YAML metablocks for better syntax
    highlighting [[#18]]

### Chores

-   Replaced Atom's default test runner with a custom one, which uses a newer
    version of Jasmine [[#21]]
-   Set up a script and a CI job to create a production package [[#19]]
-   Minor tweaks to TypeScript and ESLint setup [[#17]]

## [0.2.0] (2021-03-02)

### Added

-   Simple WooWoo grammar / syntax highlighting [[#14]]

## [0.1.0] (2021-02-28)

### Added

-   The `hello` command, which shows a simple "Hello World" notification [[#3],
[#4]]
-   MIT license [[#2]]

### Chores

-   Set up TypeScript [[#5]]
-   Set up formatting with Prettier [[#8]]
-   Set up linting with ESLint (and typescript-eslint/eslint-plugin) [[#10]]
-   Set up CI using GitHub Actions [[#6], [#7], [#9], [#11]]

[0.3.0]: https://github.com/davidstraka2/wootom/compare/v0.2.0-src...v0.3.0-src
[0.2.0]: https://github.com/davidstraka2/wootom/compare/v0.1.0-src...v0.2.0-src
[0.1.0]: https://github.com/davidstraka2/wootom/releases/tag/v0.1.0-src
[#21]: https://github.com/davidstraka2/wootom/issues/21
[#19]: https://github.com/davidstraka2/wootom/issues/19
[#18]: https://github.com/davidstraka2/wootom/issues/18
[#17]: https://github.com/davidstraka2/wootom/issues/17
[#16]: https://github.com/davidstraka2/wootom/issues/16
[#14]: https://github.com/davidstraka2/wootom/issues/14
[#11]: https://github.com/davidstraka2/wootom/issues/11
[#10]: https://github.com/davidstraka2/wootom/issues/10
[#9]: https://github.com/davidstraka2/wootom/issues/9
[#8]: https://github.com/davidstraka2/wootom/issues/8
[#7]: https://github.com/davidstraka2/wootom/issues/7
[#6]: https://github.com/davidstraka2/wootom/issues/6
[#5]: https://github.com/davidstraka2/wootom/issues/5
[#4]: https://github.com/davidstraka2/wootom/issues/4
[#3]: https://github.com/davidstraka2/wootom/issues/3
[#2]: https://github.com/davidstraka2/wootom/issues/2
