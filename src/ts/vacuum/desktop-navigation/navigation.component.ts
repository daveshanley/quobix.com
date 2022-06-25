import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import navigationStyles from './navigation-item.css';
import { VacuumNavigationItemComponent } from './navigation-item.component';
import { NavigationClickedEvent } from '../model/navigation-clicked.event';

@customElement('vacuum-desktop-navigation')
export class VacuumNavigationComponent extends LitElement {
  static styles = navigationStyles;

  activated(evt: CustomEvent<NavigationClickedEvent>) {
    let slots: Element[];
    const sl = this.shadowRoot.querySelector('slot');
    if (sl) {
      slots = sl.assignedElements({ flatten: true });
    }
    if (slots) {
      slots.forEach(slot => {
        const navItem = slot as VacuumNavigationItemComponent;
        if (evt.detail.navItem.id !== navItem.id) {
          if (navItem.open) navItem.toggle(new Event('click'), true);
        }
      });
    }
  }

  render() {
    return html`
      <ul
        class="vacuum-navigation-items"
        itemscope=""
        itemtype="http://schema.org/BreadcrumbList"
      >
        <slot @navigationClicked=${this.activated}></slot>
      </ul>
    `;
  }
}