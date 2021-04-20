"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterEnvSolutionRenderer = void 0;
const info_block_1 = require("../../../util/html-components/info-block");
class OuterEnvSolutionRenderer {
    constructor() {
        this.kind = 'OuterEnv';
        this.abstractVariant = 'solution';
    }
    render(renderingManager, astNode) {
        return info_block_1.infoBlockComponent({
            title: 'Solution',
            children: [renderingManager.render(...astNode.children)],
        });
    }
}
exports.OuterEnvSolutionRenderer = OuterEnvSolutionRenderer;
