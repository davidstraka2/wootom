"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableOfContents = void 0;
const __1 = require("..");
const jump_to_position_1 = require("../../util/editor/jump-to-position");
const fuse_js_1 = __importDefault(require("fuse.js"));
const remove_all_children_1 = require("../../util/html/remove-all-children");
class TableOfContents {
    constructor(editor, renderingManager, documentParts) {
        this.editor = editor;
        this.renderingManager = renderingManager;
        this.documentParts = documentParts;
        this.list = document.createElement('ol');
        this.searchInput = document.createElement('input');
        this.searchResults = document.createElement('ul');
    }
    render() {
        const container = document.createDocumentFragment();
        const heading = document.createElement('h2');
        heading.append('Table of Contents');
        this.searchInput.classList.add('native-key-bindings', 'wootom-search');
        this.searchInput.setAttribute('placeholder', 'Type here to search in table of contents...');
        this.searchInput.addEventListener('input', this.search.bind(this));
        const headingTree = this.constructHeadingTree(this.documentParts);
        headingTree.forEach(node => this.list.append(this.renderTreeNode(node)));
        this.searchResults.hidden = true;
        container.append(heading, this.searchInput, this.list, this.searchResults);
        return container;
    }
    renderTreeNode(treeNode) {
        const listItem = document.createElement('li');
        if (typeof treeNode.node !== 'undefined')
            listItem.appendChild(this.renderHeading(treeNode.node));
        if (treeNode.children.length > 0) {
            const list = document.createElement('ol');
            for (const child of treeNode.children)
                list.appendChild(this.renderTreeNode(child));
            listItem.appendChild(list);
        }
        return listItem;
    }
    renderHeading(documentPart) {
        const anchor = document.createElement('a');
        documentPart.children.forEach(child => anchor.append(this.renderingManager.render(child)));
        anchor.addEventListener('click', () => {
            jump_to_position_1.jumpToPosition(this.editor, documentPart.startLine, documentPart.startColumn);
        });
        return anchor;
    }
    getLevel(documentPart) {
        const variant = __1.variantRegistry.getAbstractVariant(documentPart.kind, documentPart.variant);
        switch (variant) {
            case 'h2':
                return 2;
            case 'h3':
                return 3;
            default:
                return 1;
        }
    }
    constructHeadingTree(documentParts, level = 1) {
        if (level < 1 || level > 3 || documentParts.length === 0)
            return [];
        const headingNode = documentParts[0];
        if (this.getLevel(headingNode) > level)
            return [
                {
                    node: undefined,
                    children: this.constructHeadingTree(documentParts, level + 1),
                },
            ];
        const restNodes = documentParts.slice(1);
        const nextSameLevelHeadingIndex = restNodes.findIndex(headingNode => this.getLevel(headingNode) === level);
        if (nextSameLevelHeadingIndex === -1)
            return [
                {
                    node: headingNode,
                    children: this.constructHeadingTree(restNodes, level + 1),
                },
            ];
        return [
            {
                node: headingNode,
                children: this.constructHeadingTree(restNodes.slice(0, nextSameLevelHeadingIndex), level + 1),
            },
            ...this.constructHeadingTree(restNodes.slice(nextSameLevelHeadingIndex), level),
        ];
    }
    renderSearchResults(results) {
        return results.map(res => {
            const listItem = document.createElement('li');
            listItem.append(this.renderHeading(res));
            return listItem;
        });
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
        const fuse = new fuse_js_1.default(this.documentParts.map(part => {
            var _a;
            return ({
                text: (_a = this.renderingManager.render(part).textContent) !== null && _a !== void 0 ? _a : '',
                part,
            });
        }), {
            ignoreLocation: true,
            keys: ['text'],
        });
        const results = fuse.search(query);
        this.searchResults.append(...this.renderSearchResults(results.map(res => res.item.part)));
    }
}
exports.TableOfContents = TableOfContents;
