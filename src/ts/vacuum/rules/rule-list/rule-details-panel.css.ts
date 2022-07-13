import { css } from 'lit';

export default css`
  :host {
    padding: 10px;
    position: relative;
  }

  h2 {
    margin-top: 0;
    font-size: var(--rule-item-header-fontsize);
  }

  p {
    font-size: var(--rule-item-details-fontsize);
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
  }

  a:hover {
    background-color: var(--primary-color);
    color: var(--invert-font-color);
  }

  .recommended-badge {
    display: block;
    position: absolute;
    top: -10px;
    text-align: center;
    height: 20px;
    width: 100px;
    border: 1px solid var(--rule-item-border);
    background-color: var(--rule-recommended-background);
    right: 3px;
    color: var(--tertiary-color);
    font-size: var(--rule-recommended-fontsize);
    line-height: 1.4rem;
    filter: drop-shadow(0 2px 2px black);
  }

  @media only screen and (max-width: 600px) {
    h2 {
      font-size: var(--rule-item-header-fontsize-mobile);
    }
  }
`;
