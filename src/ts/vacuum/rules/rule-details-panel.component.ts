import { customElement } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import ruleDetailsPanelCss from './rule-details-panel.css';

@customElement('rule-details-panel')
export class RuleDetailsPanelComponent extends LitElement {
  static styles = ruleDetailsPanelCss;

  render() {
    return html` <slot></slot> `;
  }
}
