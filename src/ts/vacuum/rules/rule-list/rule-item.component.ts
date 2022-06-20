import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ruleItemStyles from './rule-item.css';
import './stats/severity-panel.component';
import './rule-details-panel.component';
import './stats/style-panel.component';
import './stats/formats-panel.component';

@customElement('rule-item')
export class RuleItemComponent extends LitElement {
  static styles = ruleItemStyles;

  @property()
  severity: string;

  @property()
  name: string;

  @property()
  ruleId: string;

  @property()
  description: string;

  @property({ type: Boolean })
  recommended: boolean = false;

  @property()
  ruleType: string;

  @property()
  url: string;

  @property()
  formats: string;

  render() {
    return html`<div class="rule">
      <rule-details-panel
        link="${this.url}"
        ?recommended="${this.recommended}"
        title="${this.name}"
        description="${this.description}"
      >
      </rule-details-panel>
      <rule-stats-panel>
        <severity-panel severity="${this.severity}"></severity-panel>
        <formats-panel formats="${this.formats}"></formats-panel>
        <style-panel styleType="${this.ruleType}"></style-panel>
      </rule-stats-panel>
    </div> `;
  }
}
