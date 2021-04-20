import {variantRegistry} from '../core';

export function registerTemplateVariants(): void {
    variantRegistry.setVariant('DocumentPart', 'Chapter', 'h1');
    variantRegistry.setVariant('DocumentPart', 'Section', 'h2');
    variantRegistry.setVariant('DocumentPart', 'Subsection', 'h3');

    variantRegistry.setVariant('DocumentObject', 'Definition', 'definition');
    variantRegistry.setVariant('DocumentObject', 'Corollary', 'corollary');
    variantRegistry.setVariant('DocumentObject', 'Lemma', 'lemma');
    variantRegistry.setVariant('DocumentObject', 'Theorem', 'theorem');
    variantRegistry.setVariant('DocumentObject', 'Proof', 'proof');
    variantRegistry.setVariant('DocumentObject', 'Remark', 'remark');
    variantRegistry.setVariant('DocumentObject', 'Example', 'example');
    variantRegistry.setVariant('DocumentObject', 'Figure', 'figure');
    variantRegistry.setVariant('DocumentObject', 'Question', 'question');
    variantRegistry.setVariant('DocumentObject', 'Table', 'table');

    variantRegistry.setVariant('OuterEnv', 'align', 'align-math'); // TODO
    variantRegistry.setVariant('OuterEnv', 'caption', 'caption');
    variantRegistry.setVariant('OuterEnv', 'codeblock', 'codeblock');
    variantRegistry.setVariant('OuterEnv', 'enumerate', 'enumerate'); // TODO
    variantRegistry.setVariant('OuterEnv', 'equation', 'block-math'); // TODO
    variantRegistry.setVariant('OuterEnv', 'sage', 'sage');
    variantRegistry.setVariant('OuterEnv', 'solution', 'solution');
    variantRegistry.setVariant('OuterEnv', 'tabular', 'tabular');
    variantRegistry.setVariant('OuterEnv', 'tikz', 'tikz');
    variantRegistry.setVariant('OuterEnv', 'image', 'image'); // TODO
    variantRegistry.setVariant('OuterEnv', 'itemize', 'itemize'); // TODO
    variantRegistry.setVariant('OuterEnv', 'quote', 'quote');

    variantRegistry.setVariant('InnerEnv', 'cite', 'cite'); // TODO
    variantRegistry.setVariant('InnerEnv', 'code', 'code');
    variantRegistry.setVariant('InnerEnv', 'emphasize', 'i');
    variantRegistry.setVariant('InnerEnv', 'eqref', 'eqref'); // TODO
    variantRegistry.setVariant('InnerEnv', 'footnote', 'footnote'); // TODO
    variantRegistry.setVariant('InnerEnv', 'item', 'item'); // TODO
    variantRegistry.setVariant('InnerEnv', 'math', 'inline-math'); // TODO
    variantRegistry.setVariant('InnerEnv', 'notion', 'b');
    variantRegistry.setVariant('InnerEnv', 'quoted', 'quoted');
    variantRegistry.setVariant('InnerEnv', 'reference', 'reference'); // TODO
    variantRegistry.setVariant('InnerEnv', 'todo', 'todo'); // TODO

    variantRegistry.setVariant('InnerEnv', '_index', '_index');
    variantRegistry.setVariant('InnerEnv', '_reference', '_reference'); // TODO
}
