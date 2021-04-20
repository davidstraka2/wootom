"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultOuterEnvRenderer = void 0;
const error_block_1 = require("../../../util/html-components/error-block");
class DefaultOuterEnvRenderer {
    constructor() {
        this.kind = 'OuterEnv';
    }
    render(renderingManager, astNode) {
        const outerEnv = astNode;
        const message = `Unknown outer environment variant "${outerEnv.variant}"`;
        const fragment = document.createDocumentFragment();
        const children = renderingManager.render(...outerEnv.children);
        if (outerEnv.isFragile) {
            const pre = document.createElement('pre');
            pre.append(children);
            fragment.append(pre);
        }
        else {
            fragment.append(children);
        }
        return error_block_1.errorBlockComponent({
            title: message,
            children: [fragment],
        });
    }
}
exports.DefaultOuterEnvRenderer = DefaultOuterEnvRenderer;
