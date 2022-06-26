import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { v4 as uuidv4 } from 'uuid';
import navigationStyles from './navigation-item.css';
import {
  NavigationClicked,
  NavigationClickedEvent,
} from '../model/navigation-clicked.event';

@customElement('vacuum-nav-item')
export class VacuumNavigationItemComponent extends LitElement {
  static styles = navigationStyles;

  @property()
  name: string;

  @property()
  url: string;

  @property({ type: Number })
  position: number;

  @property()
  open: boolean;

  private readonly _id: string;

  get id() {
    return this._id;
  }

  private _hasKids: boolean;

  constructor() {
    super();
    this._id = uuidv4();
  }

  toggle(evt: Event, skipJump?: boolean) {
    evt.preventDefault();
    this.open = !this.open;
    if (this._slottedChildren) {
      if (this._slottedChildren.length <= 0) {
        if (!skipJump) window.location.assign(this.url);
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

    // fire event up the chain to inform other navigation sections they need to close up.
    const options = {
      detail: { navItem: this },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(
      new CustomEvent<NavigationClickedEvent>(NavigationClicked, options)
    );
  }

  render() {
    let link: TemplateResult;
    let listItem: TemplateResult;

    if (!this.open) {
      link = html`<a
        itemprop="item"
        @click=${this.stopLinkClick}
        href="${this.url ? this.url : './'}"
      >
        <span itemprop="name">${this.name}</span>
        <meta itemprop="position" content="${this.position}" />
      </a>`;
      listItem = html` <li
        itemprop="itemListElement"
        itemscope=""
        itemtype="http://schema.org/ListItem"
        @keyup=${this.toggle}
        @click=${this.toggle}
        class="${this.open ? 'active' : ''}"
      >
        ${link}
      </li>`;
    } else {
      link = html`<span itemprop="name">${this.name}</span>`;
      listItem = html`<li
        itemprop="itemListElement"
        itemscope=""
        itemtype="http://schema.org/ListItem"
        class="${this.open ? 'active' : ''} ${this._hasKids ? 'has-kids' : ''} "
      >
        ${link}
        <meta itemprop="position" content=${this.position} />
      </li>`;
    }

    return html` ${listItem}
      <slot class="${this.open ? 'open' : 'closed'}"></slot>`;
  }
}
