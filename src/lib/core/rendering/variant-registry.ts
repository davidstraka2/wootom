import {wooElementKinds} from '../../util/lists/woo';
import {WooElementKind} from '../../util/types/woo';

export class VariantRegistry {
    private readonly registry: Record<string, Record<string, string>> = {};

    constructor() {
        this.registry = {};
        wooElementKinds.forEach(kind => (this.registry[kind] = {}));
    }

    getAbstractVariant(
        kind: WooElementKind,
        variant: string,
    ): string | undefined {
        return this.registry[kind]?.[variant];
    }

    setVariant(
        kind: WooElementKind,
        variant: string,
        abstractVariant: string,
    ): void {
        this.registry[kind][variant] = abstractVariant;
    }
}
