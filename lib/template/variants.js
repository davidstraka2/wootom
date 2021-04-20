"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTemplateVariants = void 0;
const core_1 = require("../core");
function registerTemplateVariants() {
    core_1.variantRegistry.setVariant('DocumentPart', 'Chapter', 'h1');
    core_1.variantRegistry.setVariant('DocumentPart', 'Section', 'h2');
    core_1.variantRegistry.setVariant('DocumentPart', 'Subsection', 'h3');
    core_1.variantRegistry.setVariant('DocumentObject', 'Definition', 'definition');
    core_1.variantRegistry.setVariant('DocumentObject', 'Corollary', 'corollary');
    core_1.variantRegistry.setVariant('DocumentObject', 'Lemma', 'lemma');
    core_1.variantRegistry.setVariant('DocumentObject', 'Theorem', 'theorem');
    core_1.variantRegistry.setVariant('DocumentObject', 'Proof', 'proof');
    core_1.variantRegistry.setVariant('DocumentObject', 'Remark', 'remark');
    core_1.variantRegistry.setVariant('DocumentObject', 'Example', 'example');
    core_1.variantRegistry.setVariant('DocumentObject', 'Figure', 'figure');
    core_1.variantRegistry.setVariant('DocumentObject', 'Question', 'question');
    core_1.variantRegistry.setVariant('DocumentObject', 'Table', 'table');
    core_1.variantRegistry.setVariant('OuterEnv', 'align', 'align-math'); // TODO
    core_1.variantRegistry.setVariant('OuterEnv', 'caption', 'caption');
    core_1.variantRegistry.setVariant('OuterEnv', 'codeblock', 'codeblock');
    core_1.variantRegistry.setVariant('OuterEnv', 'enumerate', 'enumerate'); // TODO
    core_1.variantRegistry.setVariant('OuterEnv', 'equation', 'block-math'); // TODO
    core_1.variantRegistry.setVariant('OuterEnv', 'sage', 'sage');
    core_1.variantRegistry.setVariant('OuterEnv', 'solution', 'solution');
    core_1.variantRegistry.setVariant('OuterEnv', 'tabular', 'tabular');
    core_1.variantRegistry.setVariant('OuterEnv', 'tikz', 'tikz');
    core_1.variantRegistry.setVariant('OuterEnv', 'image', 'image'); // TODO
    core_1.variantRegistry.setVariant('OuterEnv', 'itemize', 'itemize'); // TODO
    core_1.variantRegistry.setVariant('OuterEnv', 'quote', 'quote');
    core_1.variantRegistry.setVariant('InnerEnv', 'cite', 'cite'); // TODO
    core_1.variantRegistry.setVariant('InnerEnv', 'code', 'code');
    core_1.variantRegistry.setVariant('InnerEnv', 'emphasize', 'i');
    core_1.variantRegistry.setVariant('InnerEnv', 'eqref', 'eqref'); // TODO
    core_1.variantRegistry.setVariant('InnerEnv', 'footnote', 'footnote'); // TODO
    core_1.variantRegistry.setVariant('InnerEnv', 'item', 'item'); // TODO
    core_1.variantRegistry.setVariant('InnerEnv', 'math', 'inline-math'); // TODO
    core_1.variantRegistry.setVariant('InnerEnv', 'notion', 'b');
    core_1.variantRegistry.setVariant('InnerEnv', 'quoted', 'quoted');
    core_1.variantRegistry.setVariant('InnerEnv', 'reference', 'reference'); // TODO
    core_1.variantRegistry.setVariant('InnerEnv', 'todo', 'todo'); // TODO
    core_1.variantRegistry.setVariant('InnerEnv', '_index', '_index');
    core_1.variantRegistry.setVariant('InnerEnv', '_reference', '_reference'); // TODO
}
exports.registerTemplateVariants = registerTemplateVariants;
