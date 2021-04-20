"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorBlockComponent = void 0;
function errorBlockComponent({ title, children, }) {
    const block = document.createElement('div');
    block.classList.add('wootom-error-block');
    const p = document.createElement('p');
    p.classList.add('wootom-title');
    p.append(title);
    block.append(p);
    const childrenContainer = document.createElement('div');
    children.forEach(child => childrenContainer.append(child));
    block.append(childrenContainer);
    return block;
}
exports.errorBlockComponent = errorBlockComponent;
