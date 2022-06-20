import { customElement } from 'lit/decorators.js';
import { LitElement, html } from 'lit';

@customElement('rule-panel')
export class RulePanelComponent extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}
