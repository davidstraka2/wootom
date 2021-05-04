import * as execa from 'execa';
import * as fs from 'fs-extra';
import {v4 as uuid} from 'uuid';
import * as path from 'path';

/**
 * Generate SVG from TikZ code
 *
 * @param source The input TikZ code
 * @param options Options to pass to the tikzpicture environment (empty string
 * for no options)
 * @returns The SVG generated from the given source
 * @throws The LaTeX log when LaTeX fails
 */
export async function tikzToSVG(source: string, options = ''): Promise<string> {
    const dirname = `.wootom/tikz/${uuid()}`;
    const resDirname = path.resolve(process.cwd(), dirname);
    console.log(`Wootom: Generating TikZ SVG in "${resDirname}"`);
    await fs.emptyDir(dirname);
    const filename = `main`;
    await fs.writeFile(`${dirname}/${filename}.tex`, getLatex(source, options));
    const execOptions = {cwd: dirname, timeout: 30000};
    try {
        await execa('latex', [`${filename}.tex`], execOptions);
        await execa('dvisvgm', ['--no-fonts', `${filename}.dvi`], execOptions);
    } catch (err) {
        const log = await fs.readFile(`${dirname}/${filename}.log`, 'utf-8');
        console.log(
            `Wootom: Cleaning up "${resDirname}" after failing to generate TikZ SVG`,
        );
        await fs.remove(dirname);
        throw log;
    }
    const svg = await fs.readFile(`${dirname}/${filename}.svg`, 'utf-8');
    console.log(
        `Wootom: Cleaning up "${resDirname}" after generating TikZ SVG`,
    );
    await fs.remove(dirname);
    return svg.trim();
}

/**
 * Get a LaTeX document code for a given TikZ image code
 *
 * @param tikz The input TikZ code
 * @param options Options to pass to the tikzpicture environment (empty string
 * for no options)
 * @returns The LaTeX code of the entire document (including the preamble)
 */
function getLatex(tikz: string, options: string): string {
    const preamble = `
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
