'use babel';

import {CompositeDisposable} from 'atom';

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
