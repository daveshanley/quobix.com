import 'terminal.css';
import '../css/site.css';
import './vacuum/mobile-navigation/navigation.component';

import { listenForScrolling } from './scroll';

function run() {
  listenForScrolling();
}

window.onload = run;
