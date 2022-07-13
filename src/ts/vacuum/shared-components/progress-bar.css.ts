import { css } from 'lit';

export default css`
  .progress-bar {
    height: 8px;
    background-color: var(--progress-bar-background);
    margin: 12px 0;
  }

  .progress-bar-filled {
    background-color: var(--progress-bar-fill);
    height: 100%;
    transition: width 0.3s ease;
    position: relative;
    width: 0;
  }

  .progress-bar-filled::before {
    content: '';
    border: 6px solid transparent;
    border-top-color: var(--progress-bar-fill);
    position: absolute;
    top: -12px;
    right: -6px;
  }
  .progress-bar-filled::after {
    color: var(--progress-bar-fill);
    content: attr(data-filled);
    display: block;
    font-size: 12px;
    white-space: nowrap;
    position: absolute;
    border: 6px solid transparent;
    top: -42px;
    right: 0;
    transform: translateX(50%);
  }

  .error {
    background-color: var(--error-color);
    border: 1px solid var(--error-color);
    color: var(--error-color);
  }

  .error::before {
    border-top-color: var(--error-color);
  }

  .error::after {
    color: var(--error-color);
  }

  .warn-400 {
    background-color: var(--warn-400);
    border: 1px solid var(--warn-400);
    color: var(--warn-400);
  }

  .warn-400::after {
    color: var(--warn-400);
  }

  .warn-400::before {
    border-top-color: var(--warn-400);
  }

  .warn-300 {
    background-color: var(--warn-300);
    border: 1px solid var(--warn-300);
    color: var(--warn-300);
  }

  .warn-300::after {
    color: var(--warn-300);
  }

  .warn-300::before {
    border-top-color: var(--warn-300);
  }

  .warn-200 {
    background-color: var(--warn-200);
    border: 1px solid var(--warn-200);
    color: var(--warn-200);
  }

  .warn-200::after {
    color: var(--warn-200);
  }

  .warn-200::before {
    border-top-color: var(--warn-200);
  }

  .warn {
    background-color: var(--warn-color);
    border: 1px solid var(--warn-color);
    color: var(--warn-color);
  }

  .warn::after {
    color: var(--warn-color);
  }

  .warn::before {
    border-top-color: var(--warn-color);
  }

  .ok-400 {
    background-color: var(--ok-400);
    border: 1px solid var(--ok-400);
    color: var(--ok-400);
  }

  .ok-400::after {
    color: var(--ok-400);
  }

  .ok-400::before {
    border-top-color: var(--ok-400);
  }

  .ok-300 {
    background-color: var(--ok-300);
    border: 1px solid var(--ok-300);
    color: var(--ok-300);
  }

  .ok-300::after {
    color: var(--ok-300);
  }

  .ok-300::before {
    border-top-color: var(--ok-300);
  }

  .ok-200 {
    background-color: var(--ok-200);
    border: 1px solid var(--ok-200);
    color: var(--ok-200);
  }

  .ok-200::after {
    color: var(--ok-200);
  }

  .ok-200::before {
    border-top-color: var(--ok-200);
  }

  .ok {
    background-color: var(--ok-color);
    border: 1px solid var(--ok-color);
    color: var(--ok-color);
  }

  .ok::after {
    color: var(--ok-color);
  }

  .ok::before {
    border-top-color: var(--ok-color);
  }

  .warning-count {
    background: none;
    color: var(--primary-color);
  }

  .error-count {
    background: none;
    color: var(--primary-color);
  }

  .info-count {
    background: none;
    color: var(--primary-color);
  }
`;
