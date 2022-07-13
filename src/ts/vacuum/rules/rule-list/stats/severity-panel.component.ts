import { customElement, property } from 'lit/decorators.js';
import { LitElement, html, TemplateResult } from 'lit';
import severityPanelCss from './severity-panel.css';

@customElement('severity-panel')
export class SeverityPanelComponent extends LitElement {
  static styles = severityPanelCss;

  @property()
  severity: string;

  render() {
    return html`<span class="severity-value ${this.severity}"
      >${this.renderLabel(this.severity)}</span
    >`;
  }

  renderLabel(sev: string): TemplateResult {
    switch (sev) {
      case 'warn':
        return html`WARNING`;
      case 'error':
        return html`ERROR`;
      case 'info':
        return html`INFO`;
      default:
        return html`HINT`;
    }
  }
}
