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
            'wootom:demoView': () => demoView(),
        }),
    );
}

export function deactivate(): void {
    subscriptions.dispose();
}

export function serialize(): void {
    // empty
}

export async function demoView(): Promise<void> {
    htmlViewModel.activate();
    const div = document.createElement('div');
    const t = Date.now();
    for (let i = 1; i <= 50; i++) {
        await new Promise(resolve => setTimeout(() => resolve(null), 100));
        const h2 = document.createElement('h2');
        const text = document.createTextNode(
            `Heading #${i} (t + ${Date.now() - t} ms)`,
        );
        h2.appendChild(text);
        div.appendChild(h2);
        await htmlViewModel.render(div);
    }
}

export function hello(): void {
    console.log(notificationMessage);
    atom.notifications.addSuccess(notificationMessage);
}
