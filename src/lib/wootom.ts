import {CompositeDisposable} from 'atom';
import {htmlViewModel} from './core';

export const notificationMessage = 'Wootom was called and says hello!';

let subscriptions: CompositeDisposable;

export function activate(): void {
    // Events subscribed to in atom's system can be easily cleaned up with a
    // CompositeDisposable
    subscriptions = new CompositeDisposable();

    // Register command that calls hello
    subscriptions.add(
        atom.commands.add('atom-workspace', {
            'wootom:hello': () => hello(),
        }),
    );
}

export function deactivate(): void {
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
