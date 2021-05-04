"use strict";
'use babel';
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.typesetInlineMath = exports.typesetBlockMath = exports.loadMathJax = void 0;
const path = __importStar(require("path"));
/** Load MathJax into the document */
function loadMathJax() {
    const script = document.createElement('script');
    script.addEventListener('load', () => configureMathJax());
    try {
        const mathjaxPath = path.resolve(require.resolve('mathjax'));
        const mathjaxUri = mathjaxPath + '?delayStartupUntil=configured';
        script.src = mathjaxUri;
        document.head.appendChild(script);
        document.addEventListener('wootom-preview-rendered', typesetAllMath);
    }
    catch (error) {
        atom.notifications.addError(error.message);
    }
}
exports.loadMathJax = loadMathJax;
/**
 * A simple cache for block math. The key is the source math, the value is the
 * HTML node containing the typeset math.
 */
const blockMathCache = {};
/**
 * Typeset block math.
 *
 * The typesetting result is cached.
 *
 * @param mathSource The input math (MathJax compatible) to be typeset
 * @returns Block element which will contain the typeset math (the actual
 * typesetting process is asynchronous)
 */
function typesetBlockMath(mathSource) {
    const div = document.createElement('div');
    if (typeof blockMathCache[mathSource] !== 'undefined') {
        div.classList.add('MathJax_SVG_Display');
        const span = document.createElement('span');
        span.classList.add('MathJax_SVG');
        span.append(blockMathCache[mathSource].cloneNode(true));
        div.append(span);
        return div;
    }
    const math = document.createElement('script');
    math.type = 'math/tex; mode=display';
    math.innerHTML = mathSource;
    div.appendChild(math);
    typesetMath([math], () => {
        const prevElement = math.previousElementSibling;
        const svg = prevElement === null || prevElement === void 0 ? void 0 : prevElement.querySelector('svg');
        if (svg instanceof SVGSVGElement)
            blockMathCache[mathSource] = svg.cloneNode(true);
    });
    return div;
}
exports.typesetBlockMath = typesetBlockMath;
/**
 * A simple cache for inline math. The key is the source math, the value is the
 * HTML node containing the typeset math.
 */
const inlineMathCache = {};
/**
 * Typeset inline math.
 *
 * The typesetting result is cached.
 *
 * @param mathSource The input math (MathJax compatible) to be typeset
 * @returns Inline element which will contain the typeset math (the actual
 * typesetting process is asynchronous)
 */
function typesetInlineMath(mathSource) {
    const span = document.createElement('span');
    if (typeof inlineMathCache[mathSource] !== 'undefined') {
        span.classList.add('MathJax_SVG');
        span.append(inlineMathCache[mathSource].cloneNode(true));
        return span;
    }
    const math = document.createElement('script');
    math.type = 'math/tex';
    math.innerHTML = mathSource;
    span.appendChild(math);
    typesetMath([math], () => {
        const prevElement = math.previousElementSibling;
        const svg = prevElement === null || prevElement === void 0 ? void 0 : prevElement.querySelector('svg');
        if (svg instanceof SVGSVGElement)
            inlineMathCache[mathSource] = svg.cloneNode(true);
    });
    return span;
}
exports.typesetInlineMath = typesetInlineMath;
/** A queue containing items to be later added to the MathJax Queue */
const mathJaxPreQueue = [];
/**
 * Add math to the typesetting queue
 *
 * @param nodes The HTML nodes containing the math (MathJax compatible) to be
 * typeset
 * @param callback An optional callback function to be called after the
 * typesetting is done
 */
function typesetMath(nodes, callback) {
    if (typeof MathJax !== 'undefined' && MathJax !== null) {
        mathJaxPreQueue.push(['Typeset', MathJax.Hub, nodes]);
        if (typeof callback !== 'undefined')
            mathJaxPreQueue.push(callback);
    }
}
/** Trigger typesetting of all math in the typesetting queue */
function typesetAllMath() {
    mathJaxPreQueue.forEach(item => MathJax.Hub.Queue(item));
}
/** Configure MathJax */
function configureMathJax() {
    let config = {};
    try {
        config = JSON.parse(atom.config.get('wootom.mathjaxMacros'));
    }
    catch (err) {
        atom.notifications.addError(`Wootom: Error parsing mathjaxMacros config.`);
        console.error('Wootom: Error parsing mathjaxMacros config.', err);
    }
    const macros = {};
    Object.keys(config)
        .filter(key => typeof config[key] === 'string')
        .forEach(key => (macros[key] = config[key]));
    MathJax.Hub.Config({
        jax: ['input/TeX', 'output/SVG'],
        extensions: [],
        TeX: {
            Macros: macros,
            extensions: [
                'AMSmath.js',
                'AMSsymbols.js',
                'noErrors.js',
                'noUndefined.js',
            ],
        },
        messageStyle: 'none',
        showMathMenu: false,
        SVG: { linebreaks: { automatic: true } },
    });
    MathJax.Hub.Configured();
}
