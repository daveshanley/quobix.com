/* this has been copied from: https://codingreflections.com/hide-header-on-scroll-down/ */
export function listenForScrolling() {
    var doc = document.documentElement;
    var w = window;
    var prevScroll = w.scrollY || doc.scrollTop;
    var curScroll;
    var direction = 0;
    var prevDirection = 0;

    var header = document.getElementById('main-navigation');
    var hr = document.getElementById('top-nav-divider');

    var checkScroll = function () {
    
        curScroll = w.scrollY || doc.scrollTop;
        if (curScroll > prevScroll) {
            //scrolled up
            direction = 2;
        }
        else if (curScroll < prevScroll) {
            //scrolled down
            direction = 1;
        }

        if (direction !== prevDirection) {
            toggleHeader(direction, curScroll);
        }

        prevScroll = curScroll;
    };

    var toggleHeader = function (direction: number, curScroll: number) {
        if (direction === 2 && curScroll > 80) {
            hr.classList.add('hide');
            header.classList.add('hide');
            prevDirection = direction;
        }
        else if (direction === 1 && curScroll < 80) {
            hr.classList.remove('hide');
            header.classList.remove('hide');
            prevDirection = direction;
        }
    };
    //  run scroll check on load (make sure we're not half way down the page)
    toggleHeader(2, w.scrollY || doc.scrollTop)
    window.addEventListener('scroll', checkScroll);
}