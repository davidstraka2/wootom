"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendererRegistry = void 0;
const woo_1 = require("../../util/lists/woo");
class RendererRegistry {
    constructor(defaultRenderer) {
        this.registry = { default: defaultRenderer, items: {} };
        woo_1.wooElementKinds.forEach(kind => (this.registry.items[kind] = { items: {} }));
    }
    getRenderer(kind, abstractVariant) {
        if (typeof kind === 'undefined')
            return this.registry.default;
        const kindRegistry = this.registry.items[kind];
        if (typeof abstractVariant === 'undefined')
            return kindRegistry === null || kindRegistry === void 0 ? void 0 : kindRegistry.default;
        return kindRegistry === null || kindRegistry === void 0 ? void 0 : kindRegistry.items[abstractVariant];
    }
    setRenderer(renderer) {
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
exports.RendererRegistry = RendererRegistry;
