"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableOfLabels = void 0;
const jump_to_position_1 = require("../../util/editor/jump-to-position");
const remove_all_children_1 = require("../../util/html/remove-all-children");
const variable_ast_node_1 = require("../ast/variable-ast-node");
const fuse_js_1 = __importDefault(require("fuse.js"));
class TableOfLabels {
    constructor(editor, root) {
        this.editor = editor;
        this.root = root;
        this.labeledNodes = this.getLabeledNodes(this.root);
        this.sortLabeledNodes(this.labeledNodes);
        this.list = document.createElement('ul');
        this.searchInput = document.createElement('input');
        this.searchResults = document.createElement('ul');
    }
    render() {
        const container = document.createDocumentFragment();
        const heading = document.createElement('h2');
        heading.append('Table of Labels');
        this.searchInput.classList.add('native-key-bindings', 'wootom-search');
        this.searchInput.setAttribute('placeholder', 'Type here to search in labels...');
        this.searchInput.addEventListener('input', this.search.bind(this));
        this.labeledNodes.forEach(node => this.list.append(this.renderLabel(node)));
        this.searchResults.hidden = true;
        container.append(heading, this.searchInput, this.list, this.searchResults);
        return container;
    }
    getLabeledNodes(astNode) {
        const labeled = [];
        const label = astNode.getMetadata('label');
        if (typeof label === 'string' && label.trim().length > 0) {
            labeled.push(astNode);
        }
        astNode.children.forEach(child => labeled.push(...this.getLabeledNodes(child)));
        return labeled;
    }
    getLabel(labeledNode) {
        return labeledNode.getMetadata('label');
    }
    sortLabeledNodes(labeledNodes) {
        labeledNodes.sort((a, b) => this.getLabel(a).localeCompare(this.getLabel(b)));
    }
    renderLabel(labeledNode) {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        const b = document.createElement('strong');
        b.append(this.getLabel(labeledNode));
        const i = document.createElement('em');
        let text = ` (`;
        text += labeledNode.kind;
        if (labeledNode instanceof variable_ast_node_1.VariableASTNode)
            text += ` - ${labeledNode.variant}`;
        text += ` on line ${labeledNode.startLine})`;
        i.append(text);
        anchor.append(b, i);
        anchor.addEventListener('click', () => {
            jump_to_position_1.jumpToPosition(this.editor, labeledNode.startLine, labeledNode.startColumn);
        });
        listItem.append(anchor);
        return listItem;
    }
    renderSearchResults(results) {
        return results.map(res => this.renderLabel(res));
    }
    search() {
        const query = this.searchInput.value.trim();
        if (query.length === 0) {
            this.list.hidden = false;
            this.searchResults.hidden = true;
            return;
        }
        this.list.hidden = true;
        this.searchResults.hidden = false;
        remove_all_children_1.removeAllChildren(this.searchResults);
        const fuse = new fuse_js_1.default(this.labeledNodes.map(node => ({ label: this.getLabel(node), node })), {
            ignoreLocation: true,
            keys: ['label'],
        });
        const results = fuse.search(query);
        this.searchResults.append(...this.renderSearchResults(results.map(res => res.item.node)));
    }
}
exports.TableOfLabels = TableOfLabels;
