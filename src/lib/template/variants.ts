import {variantRegistry} from '../core';

export function registerTemplateVariants(): void {
    variantRegistry.setVariant('DocumentPart', 'Chapter', 'h1');
    variantRegistry.setVariant('DocumentPart', 'Section', 'h2');
    variantRegistry.setVariant('DocumentPart', 'Subsection', 'h3');

    variantRegistry.setVariant('DocumentObject', 'Algorithm', 'algorithm');
    variantRegistry.setVariant('DocumentObject', 'Definition', 'definition');
    variantRegistry.setVariant('DocumentObject', 'Corollary', 'corollary');
    variantRegistry.setVariant('DocumentObject', 'Lemma', 'lemma');
    variantRegistry.setVariant('DocumentObject', 'Observation', 'observation');
    variantRegistry.setVariant('DocumentObject', 'Proposition', 'proposition');
    variantRegistry.setVariant('DocumentObject', 'Theorem', 'theorem');
    variantRegistry.setVariant('DocumentObject', 'Proof', 'proof');
    variantRegistry.setVariant('DocumentObject', 'Remark', 'remark');
    variantRegistry.setVariant('DocumentObject', 'Example', 'example');
    variantRegistry.setVariant('DocumentObject', 'Figure', 'figure');
    variantRegistry.setVariant('DocumentObject', 'Question', 'question');
    variantRegistry.setVariant('DocumentObject', 'Solution', 'solution');
    variantRegistry.setVariant('DocumentObject', 'Table', 'table');
    variantRegistry.setVariant('DocumentObject', 'Warning', 'warning');

    variantRegistry.setVariant('OuterEnv', 'align', 'align-math');
    variantRegistry.setVariant('OuterEnv', 'caption', 'caption');
    variantRegistry.setVariant('OuterEnv', 'codeblock', 'codeblock');
    variantRegistry.setVariant('OuterEnv', 'enumerate', 'enumerate');
    variantRegistry.setVariant('OuterEnv', 'equation', 'block-math');
    variantRegistry.setVariant('OuterEnv', 'gather', 'gather-math');
    variantRegistry.setVariant('OuterEnv', 'sage', 'sage');
    variantRegistry.setVariant('OuterEnv', 'tabular', 'tabular');
    variantRegistry.setVariant('OuterEnv', 'tikz', 'tikz');
    variantRegistry.setVariant('OuterEnv', 'image', 'image'); // TODO
    variantRegistry.setVariant('OuterEnv', 'itemize', 'itemize');
    variantRegistry.setVariant('OuterEnv', 'item', 'item');
    variantRegistry.setVariant('OuterEnv', 'quote', 'quote');

    variantRegistry.setVariant('InnerEnv', 'cite', 'cite');
    variantRegistry.setVariant('InnerEnv', 'code', 'code');
    variantRegistry.setVariant('InnerEnv', 'emphasize', 'i');
    variantRegistry.setVariant('InnerEnv', 'eqref', 'eqref');
    variantRegistry.setVariant('InnerEnv', 'footnote', 'footnote');
    variantRegistry.setVariant('InnerEnv', 'item', 'item'); // TODO
    variantRegistry.setVariant('InnerEnv', 'math', 'inline-math');
    variantRegistry.setVariant('InnerEnv', 'notion', 'b');
    variantRegistry.setVariant('InnerEnv', 'quoted', 'quoted');
    variantRegistry.setVariant('InnerEnv', 'reference', 'reference');
    variantRegistry.setVariant('InnerEnv', 'small', 'small');
    variantRegistry.setVariant('InnerEnv', 'todo', 'todo'); // TODO
    variantRegistry.setVariant('InnerEnv', 'underline', 'u');

    variantRegistry.setVariant('InnerEnv', '_index', '_index');
    variantRegistry.setVariant('InnerEnv', '_reference', '_reference');
}
