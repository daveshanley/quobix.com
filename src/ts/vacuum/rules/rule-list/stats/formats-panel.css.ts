import { css } from 'lit';

export default css`
  :host {
    display: flex;
    margin-top: 5px;
    padding-left: 5px;
  }

  .format-badge {
    display: inline-block;
    flex-grow: 1;
    border: 1px solid var(--secondary-color);
    color: var(--secondary-color);
    font-size: var(--rule-format-fontsize);
    margin-right: 5px;
    padding: 5px;
    text-align: center;
  }

  .version {
    color: var(--font-color);
  }
`;
