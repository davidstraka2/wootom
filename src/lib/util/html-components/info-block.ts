export function infoBlockComponent({
    title,
    children,
    titleBackgroundColor,
}: {
    title: string;
    children: Node[];
    titleBackgroundColor?: string;
}): Node {
    const block = document.createElement('div');
    block.classList.add('wootom-info-block');
    const p = document.createElement('p');
    p.classList.add('wootom-title');
    if (typeof titleBackgroundColor !== 'undefined') {
        block.style.borderColor = titleBackgroundColor;
        p.style.backgroundColor = titleBackgroundColor;
    }
    p.append(title);
    block.append(p);
    const childrenContainer = document.createElement('div');
    children.forEach(child => childrenContainer.append(child));
    block.append(childrenContainer);
    return block;
}
