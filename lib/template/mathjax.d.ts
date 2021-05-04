/** Load MathJax into the document */
export declare function loadMathJax(): void;
/**
 * Typeset block math.
 *
 * The typesetting result is cached.
 *
 * @param mathSource The input math (MathJax compatible) to be typeset
 * @returns Block element which will contain the typeset math (the actual
 * typesetting process is asynchronous)
 */
export declare function typesetBlockMath(mathSource: string): HTMLDivElement;
/**
 * Typeset inline math.
 *
 * The typesetting result is cached.
 *
 * @param mathSource The input math (MathJax compatible) to be typeset
 * @returns Inline element which will contain the typeset math (the actual
 * typesetting process is asynchronous)
 */
export declare function typesetInlineMath(mathSource: string): HTMLSpanElement;
