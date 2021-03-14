import {htmlViewModel} from '../../../../lib/core';

// Without this: Cannot find name 'waitsForPromise'.ts(2304)
declare function waitsForPromise(fn: () => Promise<any>): void;

describe('HTMLViewModel', () => {
    it('opens a new pane and renders given HTML to it', () => {
        // -- Arrange
        const createContent = () => {
            const section = document.createElement('section');
            const heading = document.createElement('h1');
            const headingTextNode = document.createTextNode('My Heading');
            heading.appendChild(headingTextNode);
            section.appendChild(heading);
            const paragraph = document.createElement('p');
            const paragraphTextNode = document.createTextNode('Lorem ipsum');
            paragraph.appendChild(paragraphTextNode);
            section.appendChild(paragraph);
            return section;
        };
        const content = createContent();

        // -- Act
        htmlViewModel.activate();
        waitsForPromise(() => htmlViewModel.render(content));

        // -- Assert
        runs(() => {
            const expectedView = document.createElement('div');
            expectedView.classList.add('wootom-html-viewer');
            expectedView.style.setProperty('overflow-y', 'auto');
            expectedView.appendChild(createContent());
            const activePaneItem = atom.workspace.getActivePaneItem();
            const view = atom.views.getView(activePaneItem);
            expect(view).not.toBeUndefined();
            expect(expectedView.isEqualNode(view)).toBe(true);
        });
    });

    it('overwrites previously rendered view when given new content', () => {
        // -- Arrange
        const createContent = (headingText: string, paragraphText: string) => {
            const section = document.createElement('section');
            const heading = document.createElement('h1');
            const headingTextNode = document.createTextNode(headingText);
            heading.appendChild(headingTextNode);
            section.appendChild(heading);
            const paragraph = document.createElement('p');
            const paragraphTextNode = document.createTextNode(paragraphText);
            paragraph.appendChild(paragraphTextNode);
            section.appendChild(paragraph);
            return section;
        };
        htmlViewModel.activate();
        waitsForPromise(() =>
            htmlViewModel.render(createContent('My Heading', 'Lorem ipsum')),
        );

        // -- Act
        let renderPromise: Promise<void>;
        runs(() => {
            renderPromise = htmlViewModel.render(
                createContent('My Heading #2', 'Lorem ipsum #2'),
            );
        });
        waitsForPromise(() => renderPromise);

        // -- Assert
        runs(() => {
            const expectedView = document.createElement('div');
            expectedView.classList.add('wootom-html-viewer');
            expectedView.style.setProperty('overflow-y', 'auto');
            expectedView.appendChild(
                createContent('My Heading #2', 'Lorem ipsum #2'),
            );
            const activePaneItem = atom.workspace.getActivePaneItem();
            const view = atom.views.getView(activePaneItem);
            expect(view).not.toBeUndefined();
            expect(expectedView.isEqualNode(view)).toBe(true);
        });
    });
});
