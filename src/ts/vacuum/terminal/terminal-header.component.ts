import { customElement } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import terminalHeaderCss from './terminal-header.css';

@customElement('terminal-header')
export class TerminalHeaderComponent extends LitElement {
  static styles = terminalHeaderCss;

  render() {
    return html` <div class="close-simulation">
        <div class="close-simulation-button"></div>
      </div>
      <div class="header">
        Terminal: <slot class="terminal-header-name"></slot>
      </div>`;
  }
}
