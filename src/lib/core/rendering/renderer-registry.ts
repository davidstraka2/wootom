import {wooElementKinds} from '../../util/lists/woo';
import {WooElementKind} from '../../util/types/woo';
import {Renderer} from './renderer';

type RegistryItem<T> = {default?: Renderer; items: Record<string, T>};

export class RendererRegistry {
    private readonly registry: RegistryItem<RegistryItem<Renderer>>;

    constructor(defaultRenderer: Renderer) {
        this.registry = {default: defaultRenderer, items: {}};
        wooElementKinds.forEach(
            kind => (this.registry.items[kind] = {items: {}}),
        );
    }

    getRenderer(): Renderer;
    getRenderer(kind: WooElementKind): Renderer | undefined;
    getRenderer(
        kind: WooElementKind,
        abstractVariant: string,
    ): Renderer | undefined;
    getRenderer(
        kind?: WooElementKind,
        abstractVariant?: string,
    ): Renderer | undefined {
        if (typeof kind === 'undefined') return this.registry.default;
        const kindRegistry = this.registry.items[kind];
        if (typeof abstractVariant === 'undefined')
            return kindRegistry?.default;
        return kindRegistry?.items[abstractVariant];
    }

    setRenderer(renderer: Renderer): void {
        if (typeof renderer.kind === 'undefined') {
            this.registry.default = renderer;
            return;
        }
        const kindRegistry = this.registry.items[renderer.kind];
        if (typeof renderer.abstractVariant === 'undefined') {
            kindRegistry.default = renderer;
            return;
        }
        kindRegistry.items[renderer.abstractVariant] = renderer;
    }
}
