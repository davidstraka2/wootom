import {registerTemplateRenderers} from './all-renderers';
import {registerTemplateVariants} from './variants';

export function registerTemplate(): void {
    registerTemplateVariants();
    registerTemplateRenderers();
}
