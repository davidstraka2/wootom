"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlViewModel = void 0;
const html_view_1 = require("./html-view");
const html_view_model_1 = require("./html-view-model");
/** Handles the application logic of the HTML View pane item */
exports.htmlViewModel = new html_view_model_1.HTMLViewModel('Wootom HTML View', new html_view_1.HTMLView(), atom.views, atom.workspace);
