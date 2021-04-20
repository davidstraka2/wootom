"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterEnvSageRenderer = void 0;
const info_block_1 = require("../../../util/html-components/info-block");
class OuterEnvSageRenderer {
    constructor() {
        this.kind = 'OuterEnv';
        this.abstractVariant = 'sage';
    }
    render(renderingManager, astNode) {
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.append(renderingManager.render(...astNode.children));
        pre.append(code);
        return info_block_1.infoBlockComponent({
            title: 'Sage environment',
            children: [pre],
        });
    }
}
exports.OuterEnvSageRenderer = OuterEnvSageRenderer;
