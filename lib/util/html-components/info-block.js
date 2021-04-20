"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoBlockComponent = void 0;
function infoBlockComponent({ title, children, }) {
    const block = document.createElement('div');
    block.classList.add('wootom-info-block');
    const p = document.createElement('p');
    p.classList.add('wootom-title');
    p.append(title);
    block.append(p);
    const childrenContainer = document.createElement('div');
    children.forEach(child => childrenContainer.append(child));
    block.append(childrenContainer);
    return block;
}
exports.infoBlockComponent = infoBlockComponent;
