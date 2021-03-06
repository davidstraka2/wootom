import * as wootom from '../lib/wootom';
import {Package} from 'atom';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Wootom', () => {
    let workspaceElement: HTMLElement, activationPromise: Promise<Package>;

    beforeEach(() => {
        workspaceElement = atom.views.getView(atom.workspace);
        activationPromise = atom.packages.activatePackage('wootom');
    });

    describe('when the wootom:hello event is triggered', () => {
        it('shows a notification', async () => {
            // List all past notifications
            const listNotificationMessages = () =>
                atom.notifications
                    .getNotifications()
                    .map(notification => notification.getMessage());

            // Before the activation event the notification with "hello" message
            // from Wootom has not been shown
            expect(listNotificationMessages()).not.toContain(
                wootom.notificationMessage,
            );

            // This is an activation event, triggering it will cause the package
            // to be activated.
            void atom.commands.dispatch(workspaceElement, 'wootom:hello');

            await activationPromise;

            expect(listNotificationMessages()).toContain(
                wootom.notificationMessage,
            );
        });
    });
});
