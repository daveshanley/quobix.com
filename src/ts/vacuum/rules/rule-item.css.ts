import { css } from 'lit';

export default css`
  .rule {
    padding: 10px;
    background-color: var(--rule-item-background);
    border: 1px solid var(--rule-item-border);
    margin-bottom: 20px;
    display: flex;
    align-items: stretch;
    align-content: stretch;
  }

  rule-details-panel {
    flex-grow: 2;
  }

  severity-panel {
    width: 100px;
    background-color: yellow;
  }
  style-panel {
    width: 100px;
    background-color: green;
  }
`;
