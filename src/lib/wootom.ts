import {CompositeDisposable} from 'atom';
import {htmlViewModel, parser, renderingManager} from './core';
import {PreviewSubscriber} from './core/preview/preview-subscriber';
import {registerTemplate} from './template';
import {loadMathJax} from './template/mathjax';

export const notificationMessage = 'Wootom was called and says hello!';

let subscriptions: CompositeDisposable;

const previewSubscriber = new PreviewSubscriber(
    htmlViewModel,
    parser,
    renderingManager,
    atom.workspace,
);

export function activate(): void {
    // Events subscribed to in atom's system can be easily cleaned up with a
    // CompositeDisposable
    subscriptions = new CompositeDisposable();

    loadMathJax();
    registerTemplate();
    htmlViewModel.activate();
    previewSubscriber.activate();

    // Register command that calls hello
    subscriptions.add(
        atom.commands.add('atom-workspace', {
            'wootom:hello': () => hello(),
            'wootom:togglePreview': () => previewSubscriber.toggle(),
        }),
    );
}

export function deactivate(): void {
    previewSubscriber.deactivate();
    subscriptions.dispose();
}

export function serialize(): void {
    // empty
}

export function hello(): void {
    console.log(notificationMessage);
    atom.notifications.addSuccess(notificationMessage);
}

export const config = {
    mathjaxMacros: {
        title: 'MathJax Macros',
        description:
            'Add custom TeX macros to be passed on to MathJax. The' +
            ' value should be a stringified version of the JSON object that' +
            ' is normally given to the MathJax (v2.x) config as the `Macros`' +
            ' option',
        type: 'string',
        default: '{}',
    },
};
