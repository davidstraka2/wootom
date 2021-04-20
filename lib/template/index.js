"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTemplate = void 0;
const all_renderers_1 = require("./all-renderers");
const variants_1 = require("./variants");
function registerTemplate() {
    variants_1.registerTemplateVariants();
    all_renderers_1.registerTemplateRenderers();
}
exports.registerTemplate = registerTemplate;
