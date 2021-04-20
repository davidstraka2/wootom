"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantRegistry = void 0;
const woo_1 = require("../../util/lists/woo");
class VariantRegistry {
    constructor() {
        this.registry = {};
        this.registry = {};
        woo_1.wooElementKinds.forEach(kind => (this.registry[kind] = {}));
    }
    getAbstractVariant(kind, variant) {
        var _a;
        return (_a = this.registry[kind]) === null || _a === void 0 ? void 0 : _a[variant];
    }
    setVariant(kind, variant, abstractVariant) {
        this.registry[kind][variant] = abstractVariant;
    }
}
exports.VariantRegistry = VariantRegistry;
