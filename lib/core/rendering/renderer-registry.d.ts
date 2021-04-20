import { WooElementKind } from '../../util/types/woo';
import { Renderer } from './renderer';
export declare class RendererRegistry {
    private readonly registry;
    constructor(defaultRenderer: Renderer);
    getRenderer(): Renderer;
    getRenderer(kind: WooElementKind): Renderer | undefined;
    getRenderer(kind: WooElementKind, abstractVariant: string): Renderer | undefined;
    setRenderer(renderer: Renderer): void;
}
