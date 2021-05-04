export function removeAllChildren(node: Node): void {
    while (node.lastChild !== null) node.removeChild(node.lastChild);
}
