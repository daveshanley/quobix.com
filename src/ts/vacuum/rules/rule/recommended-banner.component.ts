import { customElement } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import recommendedBannerCss from './recommended-banner.css';

@customElement('rule-recommended-banner')
export class RecommendedBannerComponent extends LitElement {
  static styles = recommendedBannerCss;

  private _show: string;

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    setTimeout(() => {
      this.renderRoot.querySelector('.banner').classList.add('show');
    }, 200);
  }

  render() {
    return html`<div class="banner"><slot></slot></div>`;
  }
}
