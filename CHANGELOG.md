# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.0] (2021-05-13)

### Added

-   FIT Template snippets [[#37]]
-   Rendering of the `footnote` inner environment and partial rendering of the
    `cite`, `eqref`, and `reference` inner environments [[#39]]

### Changed

-   Improved WooWoo syntax highlighting grammar (better comments, `@` inner
    environment shorthand support) [[#35]]

### Fixed

-   Properly clear custom MathJax typesetting pre-queue [[#38]]

### Chores

-   Updated project description [[#36]]

## [0.5.0] (2021-05-04)

### Added

-   Navigation pane with table of contents, table of labels, and fuzzy seach [[#33]]
-   Cached rendering of TikZ images to SVG (in `!tikz` outer environments) [[#32]]
-   Caching of MathJax results [[#31]]

### Changed

-   The default keyboard shortcut for `togglePreview` is now `Alt + J` [[#33]]
-   Improved styling of `.caption` and `.Figure` [[#32]]

### Fixed

-   Infinite loop in rendering causing Atom crash [[#28]]
-   MathJax failing to typeset when there is only one element to be typeset [[#30]]

### Chores

-   CI testing matrix now additionally contains the minimum supported Atom version [[#29]]
-   Tweaked TS compiler settings (esModuleInterop) [[#33]]

## [0.4.0] (2021-04-20)

### Added

-   Support for math rendering in live preview [[#25], [#26]]
-   Live HTML preview of WooWoo documents [[#26]]
-   Basic HTML rendering of most WooWoo elements [[#25]]
-   Complete parsing of valid WooWoo documents [[#24]]
-   Support for the "Editor: Toggle Line Comments" command [[#23]]

### Changed

-   Minor WooWoo grammar improvements regarding indentation for better syntax
    highlighting [[#22]]

### Removed

-   The `demoView` command [[#26]]

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

[0.6.0]: https://github.com/davidstraka2/wootom/compare/v0.5.0-src...v0.6.0-src
[0.5.0]: https://github.com/davidstraka2/wootom/compare/v0.4.0-src...v0.5.0-src
[0.4.0]: https://github.com/davidstraka2/wootom/compare/v0.3.0-src...v0.4.0-src
[0.3.0]: https://github.com/davidstraka2/wootom/compare/v0.2.0-src...v0.3.0-src
[0.2.0]: https://github.com/davidstraka2/wootom/compare/v0.1.0-src...v0.2.0-src
[0.1.0]: https://github.com/davidstraka2/wootom/releases/tag/v0.1.0-src
[#39]: https://github.com/davidstraka2/wootom/issues/39
[#38]: https://github.com/davidstraka2/wootom/issues/38
[#37]: https://github.com/davidstraka2/wootom/issues/37
[#36]: https://github.com/davidstraka2/wootom/issues/36
[#35]: https://github.com/davidstraka2/wootom/issues/35
[#33]: https://github.com/davidstraka2/wootom/issues/33
[#32]: https://github.com/davidstraka2/wootom/issues/32
[#31]: https://github.com/davidstraka2/wootom/issues/31
[#30]: https://github.com/davidstraka2/wootom/issues/30
[#29]: https://github.com/davidstraka2/wootom/issues/29
[#28]: https://github.com/davidstraka2/wootom/issues/28
[#26]: https://github.com/davidstraka2/wootom/issues/26
[#25]: https://github.com/davidstraka2/wootom/issues/25
[#24]: https://github.com/davidstraka2/wootom/issues/24
[#23]: https://github.com/davidstraka2/wootom/issues/23
[#22]: https://github.com/davidstraka2/wootom/issues/22
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
