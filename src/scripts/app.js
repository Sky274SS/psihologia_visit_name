const $img = document.querySelectorAll('.first_page_block_child')
const modalOverlay = document.querySelector('.modal_overlay ');
const modals = document.querySelectorAll('.modal');
const $body = document.querySelector('body')

$img.forEach((el) => {
    el.addEventListener('click', (e) => {
        let path = e.currentTarget.getAttribute('data-path');

        modals.forEach((el) => {
            el.classList.remove('modal_visible');
        });

        document.querySelector(`[data-target="${path}"]`).classList.add('modal_visible');
        modalOverlay.classList.add('modal_overlay_visible');

        $body.style.overflowY = 'hidden'
    });
});

modalOverlay.addEventListener('click', (e) => {

    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('modal_overlay_visible');
        modals.forEach((el) => {
            el.classList.remove('modal_visible');
        });
        $body.style.overflowY = 'scroll'
    }
});

////////////////
const $menuButton = document.querySelector('#menu_button')


document.addEventListener('DOMContentLoaded', () => {
    const nextAll = element => {
        const nextElements = [];

        while (element.nextElementSibling) {
            nextElements.push(element.nextElementSibling);
            element = element.nextElementSibling;
        }

        return nextElements;
    }

    const menu = document.querySelector('.nav'),
        more = document.querySelector('.menu-more'),
        subMenu = document.querySelector('.menu-sub'),
        parent = document.querySelector('.header'),
        root = document.documentElement,
        moreWidth = getComputedStyle(root).getPropertyValue('--more-width'),
        moreMargin = getComputedStyle(root).getPropertyValue('--more-margin'),
        menuMargin = getComputedStyle(root).getPropertyValue('--menu-margin');

    const $menuClick = menu.querySelectorAll('li > a');
    $menuClick.forEach(el => {
        el.addEventListener('click', () => {
            if (subMenu.classList.contains('menu_more_active')) {
                subMenu.classList.remove('menu_more_active')
            }
        })
    })

    let windowWidth = window.innerWidth;

    const contract = () => {
        let w = 0,
            outerWidth = parent.offsetWidth - (parseInt(moreWidth) + parseInt(moreMargin) + parseInt(menuMargin) + 30);

        let menuItems = menu.querySelectorAll('li');

        for (let i = 0; i < menuItems.length; i++) {
            w += menuItems[i].offsetWidth;

            if (w > outerWidth) {
                let nextElements = nextAll(menuItems[i - 1]);

                let nextReverse = nextElements.reverse();

                nextReverse.forEach(el => {
                    el.remove();
                    subMenu.prepend(el);
                });

                break;
            }
        }
    };

    const expand = () => {
        let w = 0,
            outerWidth = parent.offsetWidth - (parseInt(moreWidth) + parseInt(moreMargin) + parseInt(menuMargin) + 30);

        let menuItems = menu.querySelectorAll('li');
        menuItems.forEach(el => {
            w += el.offsetWidth;
        });

        let submenuItems = subMenu.querySelectorAll('li');
        for (let i = 0; i < submenuItems.length; i++) {
            w += submenuItems[i].offsetWidth;
            if (w > outerWidth) {
                let a = 0;

                while (a < i) {
                    submenuItems[a].remove();
                    menu.appendChild(submenuItems[a]);

                    a++;
                }

                break;
            }
        }

        if (submenuItems.length > 0) {
            let lastOffset = submenuItems[submenuItems.length - 1].offsetWidth;

            if ((menu.offsetWidth + lastOffset) <= outerWidth) {
                submenuItems[submenuItems.length - 1].remove();
                menu.appendChild(submenuItems[submenuItems.length - 1]);
            }
        }
    };

    const checkActive = () => {
        if (subMenu.querySelectorAll('li').length) {
            more.classList.add('active');
        } else {
            more.classList.remove('active');
        }
    };

    contract();
    checkActive();

    window.addEventListener('resize', () => {
        (window.innerWidth > windowWidth) ? expand() : contract();
        windowWidth = window.innerWidth;
        checkActive();
    });
    $menuButton.addEventListener('click', () => {
        if (subMenu.classList.contains('menu_more_active')) {
            subMenu.classList.remove('menu_more_active')
        } else {
            subMenu.classList.add('menu_more_active')
        }


    })
});
