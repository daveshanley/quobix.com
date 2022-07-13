import { customElement } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import vacuumFileUploadCss from './vacuum-file-upload.css';

@customElement('vacuum-file-upload')
export class VacuumFileUploadComponent extends LitElement {
  static styles = vacuumFileUploadCss;

  render() {
    return html`
      <input
        type="file"
        id="input"
        placeholder="https://your.domain/openapi.yaml"
      />
    `;
  }
}
