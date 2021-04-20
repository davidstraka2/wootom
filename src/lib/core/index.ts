import {Parser} from './parser/parser';
import {DefaultRenderer} from './rendering/default-renderer';
import {RendererRegistry} from './rendering/renderer-registry';
import {RenderingManager} from './rendering/rendering-manager';
import {VariantRegistry} from './rendering/variant-registry';

export {htmlViewModel} from './html-view';

const defaultRenderer = new DefaultRenderer();
export const rendererRegistry = new RendererRegistry(defaultRenderer);
export const variantRegistry = new VariantRegistry();
export const renderingManager = new RenderingManager(
    rendererRegistry,
    variantRegistry,
);
export const parser = new Parser();
