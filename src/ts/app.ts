import 'terminal.css';
import '../css/site.css';
import './vacuum/mobile-navigation/navigation.component';
import './vacuum/desktop-navigation/navigation-item.component';
import './vacuum/desktop-navigation/navigation.component';
import './vacuum/rules/rule-list/rule-item.component';
import './vacuum/rules/rule/recommended-banner.component';
import './vacuum/rules/rule/rule-panel.component';
import './vacuum/rules/rule-list/stats/function-panel.component';

import { listenForScrolling } from './scroll';

function run() {
  listenForScrolling();
}

window.onload = run;
