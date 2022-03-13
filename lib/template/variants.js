"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTemplateVariants = void 0;
const core_1 = require("../core");
function registerTemplateVariants() {
    core_1.variantRegistry.setVariant('DocumentPart', 'Chapter', 'h1');
    core_1.variantRegistry.setVariant('DocumentPart', 'Section', 'h2');
    core_1.variantRegistry.setVariant('DocumentPart', 'Subsection', 'h3');
    core_1.variantRegistry.setVariant('DocumentObject', 'Algorithm', 'algorithm');
    core_1.variantRegistry.setVariant('DocumentObject', 'Definition', 'definition');
    core_1.variantRegistry.setVariant('DocumentObject', 'Corollary', 'corollary');
    core_1.variantRegistry.setVariant('DocumentObject', 'Lemma', 'lemma');
    core_1.variantRegistry.setVariant('DocumentObject', 'Observation', 'observation');
    core_1.variantRegistry.setVariant('DocumentObject', 'Proposition', 'proposition');
    core_1.variantRegistry.setVariant('DocumentObject', 'Theorem', 'theorem');
    core_1.variantRegistry.setVariant('DocumentObject', 'Proof', 'proof');
    core_1.variantRegistry.setVariant('DocumentObject', 'Remark', 'remark');
    core_1.variantRegistry.setVariant('DocumentObject', 'Example', 'example');
    core_1.variantRegistry.setVariant('DocumentObject', 'Figure', 'figure');
    core_1.variantRegistry.setVariant('DocumentObject', 'Question', 'question');
    core_1.variantRegistry.setVariant('DocumentObject', 'Solution', 'solution');
    core_1.variantRegistry.setVariant('DocumentObject', 'Table', 'table');
    core_1.variantRegistry.setVariant('DocumentObject', 'Warning', 'warning');
    core_1.variantRegistry.setVariant('OuterEnv', 'align', 'align-math');
    core_1.variantRegistry.setVariant('OuterEnv', 'caption', 'caption');
    core_1.variantRegistry.setVariant('OuterEnv', 'codeblock', 'codeblock');
    core_1.variantRegistry.setVariant('OuterEnv', 'enumerate', 'enumerate');
    core_1.variantRegistry.setVariant('OuterEnv', 'equation', 'block-math');
    core_1.variantRegistry.setVariant('OuterEnv', 'gather', 'gather-math');
    core_1.variantRegistry.setVariant('OuterEnv', 'sage', 'sage');
    core_1.variantRegistry.setVariant('OuterEnv', 'tabular', 'tabular');
    core_1.variantRegistry.setVariant('OuterEnv', 'tikz', 'tikz');
    core_1.variantRegistry.setVariant('OuterEnv', 'image', 'image'); // TODO
    core_1.variantRegistry.setVariant('OuterEnv', 'itemize', 'itemize');
    core_1.variantRegistry.setVariant('OuterEnv', 'item', 'item');
    core_1.variantRegistry.setVariant('OuterEnv', 'quote', 'quote');
    core_1.variantRegistry.setVariant('InnerEnv', 'cite', 'cite');
    core_1.variantRegistry.setVariant('InnerEnv', 'code', 'code');
    core_1.variantRegistry.setVariant('InnerEnv', 'emphasize', 'i');
    core_1.variantRegistry.setVariant('InnerEnv', 'eqref', 'eqref');
    core_1.variantRegistry.setVariant('InnerEnv', 'footnote', 'footnote');
    core_1.variantRegistry.setVariant('InnerEnv', 'item', 'item'); // TODO
    core_1.variantRegistry.setVariant('InnerEnv', 'math', 'inline-math');
    core_1.variantRegistry.setVariant('InnerEnv', 'notion', 'b');
    core_1.variantRegistry.setVariant('InnerEnv', 'quoted', 'quoted');
    core_1.variantRegistry.setVariant('InnerEnv', 'reference', 'reference');
    core_1.variantRegistry.setVariant('InnerEnv', 'small', 'small');
    core_1.variantRegistry.setVariant('InnerEnv', 'todo', 'todo'); // TODO
    core_1.variantRegistry.setVariant('InnerEnv', 'underline', 'u');
    core_1.variantRegistry.setVariant('InnerEnv', '_index', '_index');
    core_1.variantRegistry.setVariant('InnerEnv', '_reference', '_reference');
}
exports.registerTemplateVariants = registerTemplateVariants;