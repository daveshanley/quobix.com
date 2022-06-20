import { css } from 'lit';

export default css`
  :host {
    display: block;
    padding: 5px;
    border-bottom: 1px dashed var(--rule-item-border);
  }

  .severity-value {
    display: block;
    text-align: center;
    font-size: var(--rule-severity-fontsize);
  }

  .warn {
    border: 1px solid var(--terminal-yellow);
    color: var(--terminal-yellow);
  }

  .info {
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
  }

  .error {
    border: 1px solid var(--error-color);
    color: var(--font-color);
    background-color: var(--error-color-lowalpha);
  }

  .hint {
    border: 1px solid var(--tertiary-color);
    color: var(--tertiary-color);
  }
`;
