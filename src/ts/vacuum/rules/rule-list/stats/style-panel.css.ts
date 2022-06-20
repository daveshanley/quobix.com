import { css } from 'lit';

export default css`
  :host {
    display: block;
    margin-top: 5px;
    padding-top: 3px;
    padding-bottom: 3px;
    border-top: 1px dashed var(--rule-item-border);
    padding-left: 10px;
  }

  .label {
    font-size: var(--rule-type-fontsize);
  }

  .rule-type {
    font-weight: bold;
    text-transform: capitalize;
    color: var(--secondary-color);
    font-size: var(--rule-type-fontsize);
  }
`;
