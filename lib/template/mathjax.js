"use strict";
'use babel';
Object.defineProperty(exports, "__esModule", { value: true });
exports.typesetMath = exports.loadMathJax = void 0;
const path = require("path");
function loadMathJax() {
    const script = document.createElement('script');
    script.addEventListener('load', () => configureMathJax());
    try {
        const mathjaxPath = path.resolve(require.resolve('mathjax'));
        const mathjaxUri = mathjaxPath + '?delayStartupUntil=configured';
        script.src = mathjaxUri;
        document.head.appendChild(script);
    }
    catch (error) {
        atom.notifications.addError(error.message);
    }
}
exports.loadMathJax = loadMathJax;
function typesetMath(nodes, callback) {
    if (typeof MathJax !== 'undefined' && MathJax !== null) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, nodes]);
        if (typeof callback !== 'undefined')
            MathJax.Hub.Queue(callback);
    }
}
exports.typesetMath = typesetMath;
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
