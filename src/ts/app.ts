import 'terminal.css'
import '../css/site.css'

import { listenForScrolling } from './scroll'


function run() {
    listenForScrolling();
}

window.onload = run
