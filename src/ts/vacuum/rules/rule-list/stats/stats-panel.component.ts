import { customElement } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import statsPanelCss from './stats-panel.css';

@customElement('rule-stats-panel')
export class RuleStatisticsPanelComponent extends LitElement {
  static styles = statsPanelCss;

  render() {
    return html` <slot class="stats"></slot> `;
  }
}
