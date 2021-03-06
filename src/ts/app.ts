import 'terminal.css';
import '../css/site.css';
import './vacuum/shared-components/progress-bar.component';
import './vacuum/mobile-navigation/navigation.component';
import './vacuum/desktop-navigation/navigation-item.component';
import './vacuum/desktop-navigation/navigation.component';
import './vacuum/rules/rule-list/rule-item.component';
import './vacuum/rules/rule/recommended-banner.component';
import './vacuum/rules/rule/rule-panel.component';
import './vacuum/rules/rule-list/stats/function-panel.component';
import './vacuum/terminal/terminal-window.component';
import './vacuum/terminal/terminal-header.component';
import './vacuum/terminal/terminal-command.component';
import './vacuum/online/vacuum-online.component';
import './vacuum/online/vacuum-url-input.component';
import './vacuum/online/vacuum-file-upload.component';
import './vacuum/online/vacuum-linting-report.component';

import { listenForScrolling } from './scroll';

function run() {
  listenForScrolling();
}

window.onload = run;
