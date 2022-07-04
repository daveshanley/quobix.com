import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';

@customElement('mobile-nav')
export class MobileNavigationComponent extends LitElement {
  @property()
  hide: boolean;

  @state()
  private open: boolean;

  static get styles() {
    const nav = css`
      div.hamburger {
        color: var(--secondary-color);
        padding-top: 5px;
        display: block;
        border: 1px dashed var(--secondary-color);
        height: 35px;
        border-radius: 5px;
        width: 40px;
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 1;
        transition: top 0.3s;
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      }
      .nav-items {
        border: 1px dashed var(--secondary-color);
        display: block;
        position: fixed;
        top: 50px;
        right: 10px;
        width: 50vw;
        background: var(--background-color-alpha);
        backdrop-filter: blur(4px);
        z-index: 2;
        padding: 10px;
        transition: right 0.3s;
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      }

      div.hamburger.open {
        color: var(--terminal-green);
      }

      div.hamburger.hide {
        top: -185px;
      }

      .nav-items.hide {
        right: -250px;
      }
    `;

    return [nav];
  }

  toggle() {
    this.open = !this.open;
  }

  render() {
    let navItems: TemplateResult;
    if (this.open) {
      navItems = html`<div class="nav-items ${this.hide ? 'hide' : ''}">
        <slot></slot>
      </div>`;
    }

    return html` <div
        class="hamburger ${this.hide ? 'hide' : ''} ${this.open ? 'open' : ''}"
        @click=${this.toggle}
        @keyup=${this.toggle}
      >
        <svg
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 768"
        >
          <rect x="213.5" y="151.5" width="598" height="96" />
          <rect x="212.6" y="335.86" width="598" height="96" />
          <rect x="212.5" y="519.5" width="598" height="96" />
        </svg>
      </div>
      ${navItems}`;
  }
}
