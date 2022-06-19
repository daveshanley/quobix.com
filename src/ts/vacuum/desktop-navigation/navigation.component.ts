import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import navigationStyles from './navigation.css';

@customElement('vacuum-nav-item')
export class VacuumNavigationItemComponent extends LitElement {
  static styles = navigationStyles;

  @property()
  name: string;

  @property()
  url: string;

  @property()
  open: boolean;

  private _hasKids: boolean;

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
