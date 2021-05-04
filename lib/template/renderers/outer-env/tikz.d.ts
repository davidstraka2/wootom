import { ASTNode } from '../../../core/ast/ast-node';
import { Renderer } from '../../../core/rendering/renderer';
import { RenderingManager } from '../../../core/rendering/rendering-manager';
import { WooElementKind } from '../../../util/types/woo';
/** Renderer of the tikz outer environment */
export declare class OuterEnvTikzRenderer implements Renderer {
    readonly kind: WooElementKind;
    readonly abstractVariant = "tikz";
    render(renderingManager: RenderingManager, astNode: ASTNode): Node;
    /**
     * Get a component displaying details of a TikZ picture's source
     *
     * @param tikzSource Node(s) describing the TikZ source
     * @returns A new component
     */
    private getSourceDetail;
    /**
     * Get a component displaying details of a TikZ SVG generating error
     *
     * @param errorLog The error log
     * @returns A new component
     */
    private getErrorDetail;
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
    private getSVG;
    /**
     * Style a given SVG
     *
     * @param svg The SVG to be styled
     */
    private addSVGStyle;
}
