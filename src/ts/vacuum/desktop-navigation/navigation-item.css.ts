import { css } from 'lit';

export default css`
  .vacuum-navigation-items {
    margin-top: 0;
    margin-left: 0;
    padding-left: 0;
  }

  ul.navigation-children {
    margin-top: 0;
    font-size: var(--childnav-font-size);
  }

  ul.navigation-children > li {
    margin-left: 0;
    padding-left: 15px;
  }
  .active-child-nav {
    background-color: var(--navigation-child-selected);
    color: var(--font-color);
  }

  li.child-nav:hover {
    background: none;
    color: var(--font-color);
  }

  li.child-nav a:hover {
    background: none;
    color: var(--font-color);
  }

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
