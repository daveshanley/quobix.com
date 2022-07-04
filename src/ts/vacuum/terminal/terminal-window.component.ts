import { customElement } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import terminalWindowCss from './terminal-window.css';

@customElement('terminal-window')
export class TerminalWindowComponent extends LitElement {
  static styles = terminalWindowCss;

  render() {
    return html`<slot></slot>`;
  }
}
