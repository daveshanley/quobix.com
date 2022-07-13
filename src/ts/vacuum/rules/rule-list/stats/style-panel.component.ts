import { customElement, property } from 'lit/decorators.js';
import { html, LitElement } from 'lit';
import stylePanelCss from './style-panel.css';

@customElement('style-panel')
export class StylePanelComponent extends LitElement {
  static styles = stylePanelCss;

  @property()
  styleType: string;

  render() {
    return html`<span class="label">Type:</span>
      <span class="rule-type">${this.styleType}</span>`;
  }
}
