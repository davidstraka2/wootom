"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.hello = exports.serialize = exports.deactivate = exports.activate = exports.notificationMessage = void 0;
const atom_1 = require("atom");
const core_1 = require("./core");
const preview_subscriber_1 = require("./core/preview/preview-subscriber");
const template_1 = require("./template");
const mathjax_1 = require("./template/mathjax");
exports.notificationMessage = 'Wootom was called and says hello!';
let subscriptions;
const previewSubscriber = new preview_subscriber_1.PreviewSubscriber(core_1.htmlViewModel, core_1.parser, core_1.renderingManager, atom.workspace);
function activate() {
    // Events subscribed to in atom's system can be easily cleaned up with a
    // CompositeDisposable
    subscriptions = new atom_1.CompositeDisposable();
    mathjax_1.loadMathJax();
    template_1.registerTemplate();
    core_1.htmlViewModel.activate();
    previewSubscriber.activate();
    // Register command that calls hello
    subscriptions.add(atom.commands.add('atom-workspace', {
        'wootom:hello': () => hello(),
        'wootom:togglePreview': () => previewSubscriber.toggle(),
    }));
}
exports.activate = activate;
function deactivate() {
    previewSubscriber.deactivate();
    subscriptions.dispose();
}
exports.deactivate = deactivate;
function serialize() {
    // empty
}
exports.serialize = serialize;
function hello() {
    console.log(exports.notificationMessage);
    atom.notifications.addSuccess(exports.notificationMessage);
}
exports.hello = hello;
exports.config = {
    mathjaxMacros: {
        title: 'MathJax Macros',
        description: 'Add custom TeX macros to be passed on to MathJax. The' +
            ' value should be a stringified version of the JSON object that' +
            ' is normally given to the MathJax (v2.x) config as the `Macros`' +
            ' option',
        type: 'string',
        default: '{}',
    },
};
