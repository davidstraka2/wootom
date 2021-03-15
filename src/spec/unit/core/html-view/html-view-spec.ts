import {HTMLView} from '../../../../lib/core/html-view/html-view';

describe('HTMLView', () => {
    it('renders empty container element when no content given', () => {
        // -- Arrange
        const view = new HTMLView();

        // -- Act
        const result = view.render();

        // -- Assert
        const container = document.createElement('div');
        container.classList.add('wootom-html-viewer');
        container.style.setProperty('overflow-y', 'auto');
        expect(container.isEqualNode(result)).toBeTrue();
    });

    it('renders container element with text node when given a text node', () => {
        // -- Arrange
        const view = new HTMLView();
        const textNode = document.createTextNode('Test');

        // -- Act
        view.updateContent(textNode);
        const result = view.render();

        // -- Assert
        const container = document.createElement('div');
        container.classList.add('wootom-html-viewer');
        container.style.setProperty('overflow-y', 'auto');
        container.appendChild(document.createTextNode('Test'));
        expect(container.isEqualNode(result)).toBeTrue();
    });

    it('renders container element with complex components', () => {
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
        const view = new HTMLView();
        const content = createContent();

        // -- Act
        view.updateContent(content);
        const result = view.render();

        // -- Assert
        const container = document.createElement('div');
        container.classList.add('wootom-html-viewer');
        container.style.setProperty('overflow-y', 'auto');
        container.appendChild(createContent());
        expect(container.isEqualNode(result)).toBeTrue();
    });

    it('is able to change and update its content', () => {
        // -- Arrange
        const view = new HTMLView();
        view.updateContent(document.createTextNode('Test'));
        const textNode = document.createTextNode('Test #2');

        // -- Act
        view.updateContent(textNode);
        const result = view.render();

        // -- Assert
        const container = document.createElement('div');
        container.classList.add('wootom-html-viewer');
        container.style.setProperty('overflow-y', 'auto');
        container.appendChild(document.createTextNode('Test #2'));
        expect(container.isEqualNode(result)).toBeTrue();
    });
});
