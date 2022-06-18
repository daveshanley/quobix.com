import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import { UselessComponent } from './useless-component';
import './useless-component.init';

describe('Useless Component', () => {
  let element: UselessComponent;
  beforeEach(async () => {
    element = await fixture(html`<useless-component></useless-component>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('Useless!');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
