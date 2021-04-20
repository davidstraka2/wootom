import * as sinon from 'sinon';
import {HTMLView} from '../../../../lib/core/html-view/html-view';
import {HTMLViewModel} from '../../../../lib/core/html-view/html-view-model';
import {ViewModel, WorkspaceOpenOptions} from 'atom';
import {ViewRegistryAdder} from '../../../../lib/core/atom-abstractions/view-registry-adder';
import {WorkspaceItemManager} from '../../../../lib/core/atom-abstractions/workspace-item-manager';

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
class ViewRegistryAdderMock implements ViewRegistryAdder {
    addViewProvider<T>(
        ModelConstructor: {new (...args: any[]): T},
        createView: (instance: T) => HTMLElement,
    ): void {}
}

class WorkspaceItemManagerMock implements WorkspaceItemManager {
    getPaneItems(): unknown[] {
        return [];
    }

    hide<T extends ViewModel = ViewModel>(item: T): boolean {
        return false;
    }

    open<T extends ViewModel = ViewModel>(
        item: T,
        options?: WorkspaceOpenOptions,
    ): Promise<T> {
        return new Promise(resolve => item);
    }
}
/* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */

describe('HTMLViewModel', () => {
    let htmlViewMock: sinon.SinonStubbedInstance<Required<HTMLView>>,
        viewRegistryAdderMock: sinon.SinonStubbedInstance<ViewRegistryAdder>,
        workspaceItemManagerMock: sinon.SinonStubbedInstance<WorkspaceItemManager>;

    beforeEach(() => {
        htmlViewMock = sinon.createStubInstance(HTMLView);
        viewRegistryAdderMock = sinon.createStubInstance(ViewRegistryAdderMock);
        workspaceItemManagerMock = sinon.createStubInstance(
            WorkspaceItemManagerMock,
        );
    });

    it('registers itself and its view with the ViewRegistry upon activation', () => {
        // -- Arrange
        const model = new HTMLViewModel(
            'My Title',
            htmlViewMock,
            (viewRegistryAdderMock as unknown) as ViewRegistryAdder,
            (workspaceItemManagerMock as unknown) as WorkspaceItemManager,
        );

        // -- Act
        model.activate();

        // -- Assert
        sinon.assert.calledOnce(viewRegistryAdderMock.addViewProvider);
        sinon.assert.calledWith(
            viewRegistryAdderMock.addViewProvider,
            HTMLViewModel,
            sinon.match.func,
        );
    });

    it('updates view content and opens workspace item upon render call', async () => {
        // -- Arrange
        const model = new HTMLViewModel(
            'My Title',
            htmlViewMock,
            (viewRegistryAdderMock as unknown) as ViewRegistryAdder,
            (workspaceItemManagerMock as unknown) as WorkspaceItemManager,
        );
        const content = document.createTextNode('Test');

        // -- Act
        await model.open();
        model.render(content);

        // -- Assert
        sinon.assert.calledOnceWithExactly(htmlViewMock.updateContent, content);
        sinon.assert.calledOnce(workspaceItemManagerMock.open);
        sinon.assert.calledWith(
            workspaceItemManagerMock.open,
            model,
            sinon.match.object,
        );
    });
});
