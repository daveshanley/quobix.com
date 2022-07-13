import { customElement, property } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import progressBarCss from './progress-bar.css';
import { GetScoreColor } from '../utils/score-colors';

@customElement('progress-bar')
export class ProgressBarComponent extends LitElement {
  static styles = progressBarCss;

  @property({ type: Number })
  value: number;

  @property()
  label: string;

  @property()
  preset: string;

  render() {
    return html`
      <div class="progress-bar">
        <div
          class="progress-bar-filled ${this.colorForScore()}"
          data-filled="${this.label}"
          style="width: ${this.value}%"
        ></div>
      </div>
    `;
  }

  colorForScore(): string {
    if (this.preset) {
      return this.preset;
    }
    return GetScoreColor(this.value);
  }
}
