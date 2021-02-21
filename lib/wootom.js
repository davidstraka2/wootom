'use babel';

import {CompositeDisposable} from 'atom';

export default {
    notificationMessage: 'Wootom was called and says hello!',
    subscriptions: null,

    activate(state) {
        // Events subscribed to in atom's system can be easily cleaned up with a
        // CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that calls hello
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'wootom:hello': () => this.hello(),
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    serialize() {},

    hello() {
        console.log(this.notificationMessage);
        atom.notifications.addSuccess(this.notificationMessage);
    },
};
