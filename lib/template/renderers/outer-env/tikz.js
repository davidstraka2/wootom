"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterEnvTikzRenderer = void 0;
const tikz_1 = require("../../tikz");
/** Renderer of the tikz outer environment */
class OuterEnvTikzRenderer {
    constructor() {
        this.kind = 'OuterEnv';
        this.abstractVariant = 'tikz';
    }
    render(renderingManager, astNode) {
        var _a;
        const container = document.createElement('span');
        const children = renderingManager.render(...astNode.children);
        const tikzSource = ((_a = children.textContent) !== null && _a !== void 0 ? _a : '').trim();
        container.append(this.getSourceDetail(children));
        const options = astNode.getMetadata('options');
        const tikzOptions = typeof options === 'string' ? options.trim() : '';
        if (tikzSource.length > 0) {
            void this.getSVG(tikzSource, tikzOptions).then(svg => {
                if (container.firstChild !== null)
                    container.removeChild(container.firstChild);
                container.append(svg);
            });
        }
        return container;
    }
    /**
     * Get a component displaying details of a TikZ picture's source
     *
     * @param tikzSource Node(s) describing the TikZ source
     * @returns A new component
     */
    getSourceDetail(tikzSource) {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.append('Generating TikZ SVG...');
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.append(tikzSource);
        pre.append(code);
        details.append(summary, pre);
        return details;
    }
    /**
     * Get a component displaying details of a TikZ SVG generating error
     *
     * @param errorLog The error log
     * @returns A new component
     */
    getErrorDetail(error) {
        var _a;
        const details = document.createElement('details');
        details.classList.add('wootom-error-details');
        const summary = document.createElement('summary');
        summary.append('Error generating TikZ SVG.');
        summary.title = 'Click to toggle error details';
        const pre = document.createElement('pre');
        if (typeof error === 'string') {
            pre.append(error);
        }
        else {
            pre.append((_a = error.stack) !== null && _a !== void 0 ? _a : error.toString());
        }
        details.append(summary, pre);
        return details;
    }
    /**
     * Get an SVG generated from a given TikZ source code
     *
     * @param tikz The input TikZ source code
     * @param options Options to pass to the tikzpicture environment (empty
     * string for no options)
     * @returns An SVG generated from the input TikZ source, or an error detail
     * describing an error which occured while generating the SVG, or a text node
     * describing any other error
     */
    getSVG(tikz, options = '') {
        return __awaiter(this, void 0, void 0, function* () {
            let svg;
            try {
                svg = yield tikz_1.tikzToSVG(tikz, options);
            }
            catch (err) {
                return this.getErrorDetail(err);
            }
            const svgParser = new DOMParser();
            const doc = svgParser.parseFromString(svg, 'image/svg+xml');
            const svgNode = doc.querySelector('svg');
            if (svgNode === null)
                return document.createTextNode('Error generating TikZ SVG.');
            this.addSVGStyle(svgNode);
            svgNode.classList.add('wootom-tikz');
            return svgNode;
        });
    }
    /**
     * Style a given SVG
     *
     * @param svg The SVG to be styled
     */
    addSVGStyle(svg) {
        const style = atom.config.get('wootom.tikzSvgStyle');
        svg.classList.add('wootom-tikz');
        if (style === 'inverted') {
            svg.classList.add('wootom-tikz-inverted');
        }
        else if (style === 'whiteboard') {
            svg.classList.add('wootom-tikz-whiteboard');
        }
    }
}
exports.OuterEnvTikzRenderer = OuterEnvTikzRenderer;
