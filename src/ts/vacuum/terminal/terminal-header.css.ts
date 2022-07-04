import { css } from 'lit';

export default css`
  :host {
    display: flex;
    padding: 4px;
    height: 24px;
    width: 100%;
    background: var(--terminal-header-background);
    color: black;
  }
  .close-simulation {
    width: 6px;
    height: 6px;
    padding: 4px;
    display: inline-block;
    border: 1px solid var(--background-color);
  }

  .close-simulation-button {
    padding: 3px;
    background-color: var(--background-color);
  }

  .terminal-header-name {
    font-style: italic;
    color: var(--font-color);
  }

  .header {
    display: inline-block;
    vertical-align: center;
    line-height: 1rem;
    padding-left: 7px;
    font-size: 0.9rem;
    color: var(--tertiary-color);
  }

  @media only screen and (max-width: 600px) {
    .header {
      font-size: 0.7rem;
    }
  }
`;
