'use babel';

import * as path from 'path';

declare const MathJax: any;

export function loadMathJax(): void {
    const script = document.createElement('script');
    script.addEventListener('load', () => configureMathJax());
    try {
        const mathjaxPath = path.resolve(require.resolve('mathjax'));
        const mathjaxUri = mathjaxPath + '?delayStartupUntil=configured';
        script.src = mathjaxUri;
        document.head.appendChild(script);
    } catch (error) {
        atom.notifications.addError(error.message);
    }
}

export function typesetMath(nodes: Node[], callback?: () => unknown): void {
    if (typeof MathJax !== 'undefined' && MathJax !== null) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, nodes]);
        if (typeof callback !== 'undefined') MathJax.Hub.Queue(callback);
    }
}

function configureMathJax(): void {
    MathJax.Hub.Config({
        jax: ['input/TeX', 'output/SVG'],
        extensions: [],
        TeX: {
            extensions: [
                'AMSmath.js',
                'AMSsymbols.js',
                'noErrors.js',
                'noUndefined.js',
            ],
        },
        messageStyle: 'none',
        showMathMenu: false,
        SVG: {linebreaks: {automatic: true}},
    });

    MathJax.Hub.Configured();
}
