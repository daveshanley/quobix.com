import { customElement, property } from 'lit/decorators.js';
import { LitElement, html, TemplateResult } from 'lit';
import terminalCommandCss from './terminal-command.css';

@customElement('terminal-command')
export class TerminalWindowComponent extends LitElement {
  static styles = terminalCommandCss;

  @property()
  command: string;

  @property()
  cliCommand: string;

  @property()
  cliName: string;

  @property()
  flags: string;

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
  }

  render() {
    return html`
      <span class="prompt">$</span>
      <pre>${this.highlight()}</pre>
    `;
  }

  highlight(): TemplateResult[] {
    const segments = this.command.split(' ');
    const highlighted: Array<TemplateResult> = [];

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];

      if (segment === this.cliName) {
        highlighted.push(html`<span class="name">${segment}</span>&nbsp;`);
        continue;
      }
      if (segment === this.cliCommand) {
        highlighted.push(html`<span class="command">${segment}</span>&nbsp;`);
        continue;
      }

      // check flags
      if (this.flags) {
        let matched = false;
        const flagArray = this.flags.split(',');
        for (let n = 0; n < flagArray.length; n++) {
          const flag = flagArray[n];
          if (segment === flag) {
            let flagInput;
            if (
              segments[i + 1].indexOf('-') !== 0 &&
              i + 1 !== segments.length - 1
            ) {
              flagInput = html`<span class="flag">${segments[i + 1]}</span
                >&nbsp;`;
            }
            highlighted.push(
              html`<span class="flag">${flag}</span>&nbsp;${flagInput}`
            );
            matched = true;
            if (
              segments[i + 1].indexOf('-') !== 0 &&
              i + 1 !== segments.length - 1
            ) {
              i++;
            }
          }
        }
        if (matched) {
          continue;
        }
      }
      highlighted.push(html`<span class="input">${segment}</span>&nbsp;`);
    }
    return highlighted;
  }
}
