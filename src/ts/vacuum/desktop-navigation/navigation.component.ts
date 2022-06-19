import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('vacuum-nav-item')
export class VacuumNavigationItemComponent extends LitElement {
  @property()
  name: string;

  @property()
  url: string;

  @property()
  open: boolean;

  private _hasKids: boolean;

  static get styles() {
    const nav = css`
      a {
        color: var(--primary-color);
        text-decoration: none;
      }
      a:visited {
        color: var(--primary-color);
      }
      a:hover {
        color: var(--font-color);
      }

      li {
        list-style: none;
        margin: 0;
        padding: 0 0 0 5px;
      }

      li:hover {
        background-color: var(--navigation-hover);
        color: var(--font-color);
        cursor: pointer;
      }

      li.active:hover {
        background-color: var(--primary-color);
        color: var(--invert-font-color);
        cursor: default;
      }

      li:hover a {
        color: var(--font-color);
      }

      .active {
        background-color: var(--primary-color);
        color: var(--invert-font-color);
      }

      .active a {
        color: var(--invert-font-color);
      }

      li::after {
        content: '';
      }
      .nav-items {
        display: none;
      }
      .open {
        display: block;
        background-color: var(--navigation-child-container);
      }
      .closed {
        display: none;
      }

      li.has-kids {
        background-color: var(--navigation-hover);
        color: var(--font-color);
      }
      li.has-kids:hover {
        background-color: var(--navigation-hover);
        color: var(--font-color);
      }
    `;
    return [nav];
  }

  toggle(evt: Event) {
    evt.preventDefault();
    this.open = !this.open;
    if (this._slottedChildren) {
      if (this._slottedChildren.length <= 0) {
        window.location.assign(this.url);
      } else {
        this._hasKids = true;
      }
    }
  }

  protected get _slottedChildren() {
    const slot = this.shadowRoot.querySelector('slot');
    if (slot) {
      return slot.assignedElements({ flatten: true });
    }
    return null;
  }

  stopLinkClick(e: Event) {
    e.preventDefault();
  }

  render() {
    let link: TemplateResult;
    let listItem: TemplateResult;

    if (!this.open) {
      link = html`<a @click=${this.stopLinkClick} href="${this.url}"
        >${this.name}</a
      >`;
      listItem = html` <li
        @keyup=${this.toggle}
        @click=${this.toggle}
        class="${this.open ? 'active' : ''}"
      >
        ${link}
      </li>`;
    } else {
      link = html`${this.name}`;
      listItem = html`<li
        class="${this.open ? 'active' : ''} ${this._hasKids ? 'has-kids' : ''} "
      >
        ${link}
      </li>`;
    }

    return html` ${listItem}
      <slot class="${this.open ? 'open' : 'closed'}"></slot>`;
  }
}
