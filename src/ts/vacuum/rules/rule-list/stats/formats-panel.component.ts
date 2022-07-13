import { customElement, property } from 'lit/decorators.js';
import { html, LitElement, TemplateResult } from 'lit';
import formatsPanelCss from './formats-panel.css';

@customElement('formats-panel')
export class FormatsPanelComponent extends LitElement {
  static styles = formatsPanelCss;

  @property()
  formats: string;

  render() {
    const fmts = this.formats.split(',');
    const badges = fmts.map(
      (fmt: string) =>
        html`<span class="format-badge">${this.renderBadgeName(fmt)}</span>`
    );
    return html`${badges}`;
  }

  renderBadgeName(fmt: string): TemplateResult {
    switch (fmt) {
      case 'oas3':
        return html`OpenAPI <strong class="version">3+</strong>`;
      case 'oas2':
        return html`OpenAPI <strong class="version">2</strong>`;
      default:
        return html`OpenAPI`;
    }
  }
}
