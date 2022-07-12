import { css } from 'lit';

export default css`
  input {
    background: var(--terminal-header-background);
    border: 1px dashed var(--secondary-color-lowalpha);
    padding: 11px;
    color: var(--font-color);
    width: 80%;
    border-radius: 3px;
    font-size: 0.8rem;
    font-family: var(--font-stack);
  }

  button {
    background-color: var(--background-color);
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    padding: 9px;
    font-size: 1rem;
    font-weight: bold;
    font-family: var(--font-stack);
  }

  button:hover {
    background-color: var(--primary-color);
    color: var(--invert-font-color);
    cursor: pointer;
  }

  .url-warning {
    border: 1px solid var(--terminal-yellow);
    padding: 10px;
    color: var(--terminal-yellow);
    margin-bottom: 20px;
  }

  .hidden {
    display: none;
  }
`;
