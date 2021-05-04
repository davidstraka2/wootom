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
export declare function tikzToSVG(source: string, options?: string): Promise<string>;
