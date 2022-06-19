import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ruleItemStyles from './rule-item.css';
import './severity-panel.component';
import './rule-details-panel.component';
import './style-panel.component';

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

  @property()
  recommended: boolean;

  @property()
  ruleType: string;

  @property()
  formats: string;

  private _formats: string[];

  render() {
    this._formats = this.formats.split(',');
    return html`<div class="rule">
      <rule-details-panel>
        <h3>${this.name}</h3>
        <span>${this.recommended}</span> / <span>${this._formats}</span>
        <p>${this.description}</p>
      </rule-details-panel>
      <style-panel>${this.ruleType}</style-panel>
      <severity-panel>${this.severity}</severity-panel>
    </div> `;
  }
}
