import 'terminal.css'
import '../css/site.css'

import { listenForScrolling } from './scroll'


function run() {
    listenForScrolling();
    makeFootnotesA11yFriendly();
}

/* taken from https://danielpost.com/articles/making-hugos-footnotes-accessible/ */
function makeFootnotesA11yFriendly() {
    const fn = document.querySelector('.footnotes');

    if (fn) {
        const title = 'Footnotes';
        const id = 'footnotes-label';
        // Aha, footnotes! Do our thing here.
    } else {
    
    }
}

window.onload = run
