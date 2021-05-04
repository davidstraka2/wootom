import {ASTNode} from '../../../core/ast/ast-node';
import {Renderer} from '../../../core/rendering/renderer';
import {RenderingManager} from '../../../core/rendering/rendering-manager';
import {WooElementKind} from '../../../util/types/woo';
import {tikzToSVG} from '../../tikz';

/** Renderer of the tikz outer environment */
export class OuterEnvTikzRenderer implements Renderer {
    readonly kind: WooElementKind = 'OuterEnv';
    readonly abstractVariant = 'tikz';

    render(renderingManager: RenderingManager, astNode: ASTNode): Node {
        const container = document.createElement('span');
        const children = renderingManager.render(...astNode.children);
        const tikzSource = (children.textContent ?? '').trim();
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
    private getSourceDetail(tikzSource: Node): Node {
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
    private getErrorDetail(errorLog: string): Node {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.append('Error generating TikZ SVG.');
        const pre = document.createElement('pre');
        pre.append(errorLog);
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
    private async getSVG(tikz: string, options = ''): Promise<Node> {
        let svg: string;
        try {
            svg = await tikzToSVG(tikz, options);
        } catch (err) {
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
    }

    /**
     * Style a given SVG
     *
     * @param svg The SVG to be styled
     */
    private addSVGStyle(svg: SVGElement): void {
        const style = atom.config.get('wootom.tikzSvgStyle');
        svg.classList.add('wootom-tikz');
        if (style === 'inverted') {
            svg.classList.add('wootom-tikz-inverted');
        } else if (style === 'whiteboard') {
            svg.classList.add('wootom-tikz-whiteboard');
        }
    }
}
