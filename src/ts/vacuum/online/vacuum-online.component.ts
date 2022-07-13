import { customElement, query, state } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import vacuumOnlineCss from './vacuum-online.css';
import { UrlSubmittedEvent } from '../model/spec-submitted-events';
import { VacuumLintingReportComponent } from './vacuum-linting-report.component';
import { LintingResults } from '../model/linting-result';
import { ApiError } from '../model/api-error';

@customElement('vacuum-online')
export class VacuumOnlineComponent extends LitElement {
  static styles = vacuumOnlineCss;

  @query('vacuum-linting-report')
  lintingReport: VacuumLintingReportComponent;

  @state()
  lintingResults: LintingResults;

  @state()
  open: boolean;

  @state()
  error: ApiError;

  private submittedUrl: string;

  render() {
    let loading: boolean;
    let expanded: boolean;

    if (this.open) {
      loading = true;
    }

    if (this.lintingResults) {
      expanded = true;
    }

    return html` <h2>OpenAPI specification URL</h2>
      <vacuum-url-input @urlSubmitted=${this.urlSubmitted}> </vacuum-url-input>
      <vacuum-linting-report
        url="${this.submittedUrl}"
        class="${loading ? 'loading' : null} ${expanded ? 'expanded' : null}"
      >
      </vacuum-linting-report>`;
  }

  urlSubmitted(evt: CustomEvent<UrlSubmittedEvent>) {
    this.open = true;
    this.submittedUrl = evt.detail.url;
    this.lintingResults = null;
    this.lintingReport.lintingResults = null;
    this.lintingReport.lintingError = null;
    this.fetchLintingResult(evt.detail.url);
  }

  async fetchLintingResult(url: string) {
    try {
      const response = await fetch(`https://api.quobix.com/lint?url=${url}`);
      if (response.ok) {
        const data = await response.json();
        this.lintingResults = data;
        this.lintingReport.lintingResults = data;
      } else {
        const apiError = await response.json();
        this.error = apiError;
        this.lintingReport.lintingError = apiError;
      }
    } catch (error) {
      // todo.
    }
  }
}
