import { WooElementKind } from '../../util/types/woo';
export declare class VariantRegistry {
    private readonly registry;
    constructor();
    getAbstractVariant(kind: WooElementKind, variant: string): string | undefined;
    setVariant(kind: WooElementKind, variant: string, abstractVariant: string): void;
}
