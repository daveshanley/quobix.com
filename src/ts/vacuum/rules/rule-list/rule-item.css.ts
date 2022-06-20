import { css } from 'lit';

export default css`
  .rule {
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

  rule-stats-panel {
    width: 190px;
    border-left: 1px solid var(--rule-item-border);
    background: linear-gradient(
      90deg,
      var(--rule-stats-background) 0%,
      var(--rule-item-background) 100%
    );
  }
`;
