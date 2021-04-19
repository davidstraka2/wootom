import {rendererRegistry} from '../core';
import {DefaultDocumentObjectRenderer} from './renderers/document-object/default';
import {DefaultDocumentPartRenderer} from './renderers/document-part/default';
import {DefaultInnerEnvRenderer} from './renderers/inner-env/default';
import {DocumentRootRenderer} from './renderers/other/document-root';
import {TextBlockRenderer} from './renderers/other/text-block';
import {TextNodeRenderer} from './renderers/other/text-node';
import {DefaultOuterEnvRenderer} from './renderers/outer-env/default';

export function registerTemplateRenderers(): void {
    rendererRegistry.setRenderer(new DocumentRootRenderer());
    rendererRegistry.setRenderer(new TextBlockRenderer());
    rendererRegistry.setRenderer(new TextNodeRenderer());

    rendererRegistry.setRenderer(new DefaultDocumentPartRenderer());

    rendererRegistry.setRenderer(new DefaultDocumentObjectRenderer());

    rendererRegistry.setRenderer(new DefaultOuterEnvRenderer());

    rendererRegistry.setRenderer(new DefaultInnerEnvRenderer());
}
