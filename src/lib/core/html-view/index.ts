import {HTMLView} from './html-view';
import {HTMLViewModel} from './html-view-model';

/** Handles the application logic of the HTML View pane item */
export const htmlViewModel = new HTMLViewModel(
    'Wootom HTML View',
    new HTMLView(),
    atom.views,
    atom.workspace,
);
