"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tikzToSVG = void 0;
const execa_1 = __importDefault(require("execa"));
const fs = __importStar(require("fs-extra"));
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
/**
 * A simple cache for TikZ SVGs. The key is the TikZ source code, the value is
 * the SVG (as a text) generated from the TikZ source.
 */
const tikzCache = {};
/**
 * Generate SVG from TikZ code.
 *
 * The SVG result is cached.
 *
 * @param source The input TikZ code
 * @param options Options to pass to the tikzpicture environment (empty string
 * for no options)
 * @returns The SVG (as a string) generated from the given source
 * @throws The LaTeX log when LaTeX fails
 */
function tikzToSVG(source, options = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const cacheKey = `[${options}][${source}]`;
        if (typeof tikzCache[cacheKey] !== 'undefined') {
            console.log('Wootom: Hit TikZ SVG cache.');
            return tikzCache[cacheKey];
        }
        const dirname = `.wootom/tikz/${uuid_1.v4()}`;
        const resDirname = path.resolve(process.cwd(), dirname);
        console.log(`Wootom: Generating TikZ SVG in "${resDirname}"`);
        yield fs.emptyDir(dirname);
        const filename = `main`;
        yield fs.writeFile(`${dirname}/${filename}.tex`, getLatex(source, options));
        const execOptions = { cwd: dirname, timeout: 30000 };
        try {
            yield execa_1.default('latex', [`${filename}.tex`], execOptions);
            yield execa_1.default('dvisvgm', ['--no-fonts', `${filename}.dvi`], execOptions);
        }
        catch (err) {
            const log = yield fs.readFile(`${dirname}/${filename}.log`, 'utf-8');
            console.log(`Wootom: Cleaning up "${resDirname}" after failing to generate TikZ SVG`);
            yield fs.remove(dirname);
            throw log;
        }
        const svg = yield fs.readFile(`${dirname}/${filename}.svg`, 'utf-8');
        console.log(`Wootom: Cleaning up "${resDirname}" after generating TikZ SVG`);
        yield fs.remove(dirname);
        const finalSVG = svg.trim();
        tikzCache[cacheKey] = finalSVG;
        return finalSVG;
    });
}
exports.tikzToSVG = tikzToSVG;
/**
 * Get a LaTeX document code for a given TikZ image code
 *
 * @param tikz The input TikZ code
 * @param options Options to pass to the tikzpicture environment (empty string
 * for no options)
 * @returns The LaTeX code of the entire document (including the preamble)
 */
function getLatex(tikz, options) {
    const defaultPreamble = `
        \\usepackage[utf8]{inputenc}
        \\usepackage[T1]{fontenc}
        \\usepackage{libertine}
        \\usepackage{amsmath}
        \\usepackage{amssymb}
        \\usepackage{pgfplots}
        \\usepackage{bbding}
        \\usetikzlibrary{
            shapes.geometric,
            calc,
            arrows,
            decorations.markings,
            decorations.pathmorphing
        }`;
    const customPreamble = atom.config.get('wootom.tikzPreamble').trim();
    const preamble = customPreamble.length > 0 ? customPreamble : defaultPreamble;
    return `
        \\documentclass[tikz]{standalone}
        ${preamble}
        \\nonstopmode
        \\begin{document}
        \\begin{tikzpicture}[${options}]
        ${tikz}
        \\end{tikzpicture}
        \\end{document}`;
}
