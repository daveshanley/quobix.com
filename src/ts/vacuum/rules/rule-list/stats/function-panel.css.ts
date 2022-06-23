import { css } from 'lit';

export default css`
  :host {
    display: block;
    padding-right: 10px;
  }

  .label {
    font-size: var(--rule-type-fontsize);
    color: var(--tertiary-color);
  }

  a {
    padding: 2px;
    color: var(--primary-color);
    text-decoration: none;
    display: block;
    font-size: var(--rule-function-fontsize);
  }

  a:hover {
    background-color: var(--primary-color);
    color: var(--invert-font-color);
  }
`;
