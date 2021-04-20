import {htmlViewModel} from '../../../../lib/core';

describe('HTMLViewModel', () => {
    it('opens a new pane and renders given HTML to it', async () => {
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
        htmlViewModel.activate();

        // -- Act
        await htmlViewModel.open();
        htmlViewModel.render(content);

        // -- Assert
        const expectedView = document.createElement('div');
        expectedView.classList.add('wootom-html-viewer');
        expectedView.style.setProperty('overflow-y', 'auto');
        expectedView.appendChild(createContent());
        const activePaneItem = atom.workspace.getActivePaneItem();
        const view = atom.views.getView(activePaneItem);
        expect(view).toBeDefined();
        expect(expectedView.isEqualNode(view)).toBeTrue();
    });

    it('overwrites previously rendered view when given new content', async () => {
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
        await htmlViewModel.open();
        htmlViewModel.render(createContent('My Heading', 'Lorem ipsum'));

        // -- Act
        htmlViewModel.render(createContent('My Heading #2', 'Lorem ipsum #2'));

        // -- Assert
        const expectedView = document.createElement('div');
        expectedView.classList.add('wootom-html-viewer');
        expectedView.style.setProperty('overflow-y', 'auto');
        expectedView.appendChild(
            createContent('My Heading #2', 'Lorem ipsum #2'),
        );
        const activePaneItem = atom.workspace.getActivePaneItem();
        const view = atom.views.getView(activePaneItem);
        expect(view).toBeDefined();
        expect(expectedView.isEqualNode(view)).toBeTrue();
    });
});
