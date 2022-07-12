import { customElement } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import vacuumUrlInput from './vacuum-url-input.css';

@customElement('vacuum-url-input')
export class VacuumUrlInputComponent extends LitElement {
  static styles = vacuumUrlInput;

  private getUrlFromParams(): string {
    const params: any = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop as string),
    });
    return params.url;
  }

  render() {
    const url = this.getUrlFromParams();
    let showWarning = false;
    let urlValue = '';
    if (url) {
      urlValue = url;
      try {
        new URL(url);
      } catch (_) {
        showWarning = true;
      }
    }

    return html`
      <div class="url-warning ${!showWarning ? 'hidden' : ''}">
        That URL <strong>does not look valid.</strong>
      </div>
      <input
        type="text"
        id="url"
        placeholder="https://your.domain/openapi.yaml"
        value="${urlValue}"
      />
      <button @click=${this.analyze}>Analyze</button>
    `;
  }

  analyze() {}
}
