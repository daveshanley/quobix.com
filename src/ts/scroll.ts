/* this has been copied from: https://codingreflections.com/hide-header-on-scroll-down/ */
import { MobileNavigationComponent } from './vacuum/mobile-navigation/navigation.component';

export function listenForScrolling() {
  const doc = document.documentElement;
  const w = window;
  let prevScroll = w.scrollY || doc.scrollTop;
  let curScroll;
  let direction = 0;
  let prevDirection = 0;

  const header = document.querySelector('.quobix-header');
  const mobile: MobileNavigationComponent =
    document.querySelector('mobile-nav');

  const toggleHeader = (dir: number, curSc: number) => {
    if (dir === 2 && curSc > 60) {
      mobile.hide = true;
      header.classList.add('hide');
      prevDirection = dir;
    } else if (dir === 1 && curSc < 60) {
      header.classList.remove('hide');
      mobile.hide = false;
      prevDirection = dir;
    }
  };

  const checkScroll = () => {
    curScroll = w.scrollY || doc.scrollTop;
    if (curScroll > prevScroll) {
      direction = 2;
    } else if (curScroll < prevScroll) {
      direction = 1;
    }

    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }

    prevScroll = curScroll;
  };

  //  run scroll check on load (make sure we're not half way down the page)
  toggleHeader(2, w.scrollY || doc.scrollTop);
  window.addEventListener('scroll', checkScroll);
}
