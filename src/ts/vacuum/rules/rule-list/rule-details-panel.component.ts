import { customElement, property } from 'lit/decorators.js';
import { LitElement, html, TemplateResult } from 'lit';
import ruleDetailsPanelCss from './rule-details-panel.css';

@customElement('rule-details-panel')
export class RuleDetailsPanelComponent extends LitElement {
  static styles = ruleDetailsPanelCss;

  @property()
  title: string;

  @property()
  link: string;

  @property()
  description: string;

  @property({ type: Boolean })
  recommended: boolean;

  render() {
    return html`
      <h2>
        <a href="${this.link}">${this.title}</a> ${this.recommended
          ? this.renderRecommendedBadge()
          : null}
      </h2>
      <p>${this.description}</p>
    `;
  }

  renderRecommendedBadge(): TemplateResult {
    return html`<span class="recommended-badge">recommended</span>`;
  }
}
