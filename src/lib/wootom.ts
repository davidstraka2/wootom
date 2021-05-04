import {CompositeDisposable} from 'atom';
import {htmlViewModel, parser, renderingManager} from './core';
import {navigationModel} from './core/navigation/navigation-model';
import {NavigationSubscriber} from './core/navigation/navigation-subscriber';
import {PreviewSubscriber} from './core/preview/preview-subscriber';
import {registerTemplate} from './template';
import {loadMathJax} from './template/mathjax';

export const notificationMessage = 'Wootom was called and says hello!';

let subscriptions: CompositeDisposable;

const navigationSubscriber = new NavigationSubscriber(
    navigationModel,
    parser,
    renderingManager,
    atom.workspace,
);
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
    navigationModel.activate();
    htmlViewModel.activate();
    navigationSubscriber.activate();
    previewSubscriber.activate();

    subscriptions.add(
        atom.commands.add('atom-workspace', {
            'wootom:hello': () => hello(),
            'wootom:toggleNavigation': () => navigationSubscriber.toggle(),
            'wootom:togglePreview': () => previewSubscriber.toggle(),
        }),
    );
}

export function deactivate(): void {
    navigationSubscriber.deactivate();
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
            ' option. Might require an editor reload to take effect.',
        type: 'string',
        default: '{}',
    },
    tikzPreamble: {
        title: 'TikZ Preamble',
        description:
            'Set custom LaTeX preamble for generating SVGs from TikZ' +
            ' environments. Requires a rerender to take effect. Note that' +
            ' `\\documentclass[tikz]{standalone}` is always automatically' +
            ' included in the preamble.',
        type: 'string',
        default: '',
    },
    tikzSvgStyle: {
        title: 'TikZ SVG Style',
        description:
            'The style of the SVG images generated from TikZ' +
            ' environments. Requires a rerender to take effect.',
        type: 'string',
        default: 'whiteboard',
        enum: [
            {
                value: 'inverted',
                description: 'Inverted colors',
            },
            {
                value: 'whiteboard',
                description: 'White background',
            },
            {
                value: 'raw',
                description: 'No background or color modification',
            },
        ],
    },
};
