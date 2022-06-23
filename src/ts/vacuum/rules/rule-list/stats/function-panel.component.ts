import { customElement, property } from 'lit/decorators.js';
import { html, LitElement } from 'lit';
import functionPanelCss from './function-panel.css';

@customElement('function-panel')
export class FunctionPanelComponent extends LitElement {
  static styles = functionPanelCss;

  @property()
  functionName: string;

  @property()
  functionType: string;

  render() {
    return html`<span class="label">Function:</span>
      <a
        href="/vacuum/functions/${this
          .functionType}/${this.functionName.toLowerCase()}"
        >${this.functionName}</a
      >`;
  }
}
