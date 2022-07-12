import { customElement } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import vacuumOnlineCss from './vacuum-online.css';

@customElement('vacuum-online')
export class VacuumOnlineComponent extends LitElement {
  static styles = vacuumOnlineCss;

  render() {
    return html`<slot></slot>`;
  }
}
