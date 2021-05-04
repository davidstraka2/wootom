'use babel';

import * as path from 'path';

// This will be a global present on the window object after MathJax is loaded
declare const MathJax: any;

/** Load MathJax into the document */
export function loadMathJax(): void {
    const script = document.createElement('script');
    script.addEventListener('load', () => configureMathJax());
    try {
        const mathjaxPath = path.resolve(require.resolve('mathjax'));
        const mathjaxUri = mathjaxPath + '?delayStartupUntil=configured';
        script.src = mathjaxUri;
        document.head.appendChild(script);
        document.addEventListener('wootom-preview-rendered', typesetAllMath);
    } catch (error) {
        atom.notifications.addError(error.message);
    }
}

/**
 * A simple cache for block math. The key is the source math, the value is the
 * HTML node containing the typeset math.
 */
const blockMathCache: Record<string, Node> = {};

/**
 * Typeset block math.
 *
 * The typesetting result is cached.
 *
 * @param mathSource The input math (MathJax compatible) to be typeset
 * @returns Block element which will contain the typeset math (the actual
 * typesetting process is asynchronous)
 */
export function typesetBlockMath(mathSource: string): HTMLDivElement {
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
        const svg = prevElement?.querySelector('svg');
        if (svg instanceof SVGSVGElement)
            blockMathCache[mathSource] = svg.cloneNode(true);
    });
    return div;
}

/**
 * A simple cache for inline math. The key is the source math, the value is the
 * HTML node containing the typeset math.
 */
const inlineMathCache: Record<string, Node> = {};

/**
 * Typeset inline math.
 *
 * The typesetting result is cached.
 *
 * @param mathSource The input math (MathJax compatible) to be typeset
 * @returns Inline element which will contain the typeset math (the actual
 * typesetting process is asynchronous)
 */
export function typesetInlineMath(mathSource: string): HTMLSpanElement {
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
        const svg = prevElement?.querySelector('svg');
        if (svg instanceof SVGSVGElement)
            inlineMathCache[mathSource] = svg.cloneNode(true);
    });
    return span;
}

/** A queue containing items to be later added to the MathJax Queue */
const mathJaxPreQueue: unknown[] = [];

/**
 * Add math to the typesetting queue
 *
 * @param nodes The HTML nodes containing the math (MathJax compatible) to be
 * typeset
 * @param callback An optional callback function to be called after the
 * typesetting is done
 */
function typesetMath(nodes: Node[], callback?: () => unknown): void {
    if (typeof MathJax !== 'undefined' && MathJax !== null) {
        mathJaxPreQueue.push(['Typeset', MathJax.Hub, nodes]);
        if (typeof callback !== 'undefined') mathJaxPreQueue.push(callback);
    }
}

/** Trigger typesetting of all math in the typesetting queue */
function typesetAllMath(): void {
    mathJaxPreQueue.forEach(item => MathJax.Hub.Queue(item));
}

/** Configure MathJax */
function configureMathJax(): void {
    let config: Record<string, any> = {};
    try {
        config = JSON.parse(atom.config.get('wootom.mathjaxMacros'));
    } catch (err) {
        atom.notifications.addError(
            `Wootom: Error parsing mathjaxMacros config.`,
        );
        console.error('Wootom: Error parsing mathjaxMacros config.', err);
    }
    const macros: Record<string, string> = {};
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
        SVG: {linebreaks: {automatic: true}},
    });

    MathJax.Hub.Configured();
}
