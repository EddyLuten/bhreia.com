let
    toc,
    pageTitle,
    footerNavs,
    headerTopic,
    hideSpoiler = (
        localStorage.getItem('hideSpoiler') === 'true'
    ),
    scrambleMenu = (
        localStorage.getItem('unscramble') === 'true' ? false : true
    );

function killSpoiler(e) {
    if (e.detail === 'remember')
        localStorage.setItem('hideSpoiler', 'true');
    const spoiler = document.getElementById('page_spoiler');
    spoiler.classList.add('removing');
    spoiler.addEventListener('animationend', () => {
        spoiler.parentElement.removeChild(spoiler);
        if (toc)
            toc.classList.remove('spoiled');
        pageTitle.classList.remove('spoiled');
        for (let nav of footerNavs) {
            nav.classList.remove('spoiled');
        }
        if (headerTopic)
            headerTopic.classList.remove('spoiled');
    });
}

function scrambleString(s) {
    const
        lower = 'abcdefghijklmnopqrstuvwxyz'.split(''),
        upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return String(s)
        .split('')
        .map((c) =>
            upper.includes(c)
                ? randArr(upper)
                : (c.trim().length === 0
                    ? c
                    : randArr(lower))
        )
        .join('');
}

function scrambleLockedTitle(elem) {
    const orig = elem.getAttribute('unscrambled');
    const len = String('🔐').length;
    const ix = String(orig).indexOf('🔐');
    const newHtml = (
        orig.substring(0, ix + len) +
        scrambleString(orig.substring(ix + len))
    );

    elem.innerText = newHtml;
}

function setupScrambling() {
    // Set up scrambling
    if (scrambleMenu) {
        for(let elem of document.getElementsByTagName('a')) {
            if (String(elem.innerText).trim().startsWith('🔐')) {
                const orig = String(elem.innerText);
                elem.setAttribute('unscrambled', orig);
                scrambleLockedTitle(elem);
            }
        }
    }
}

function scrollToMenuItem() {
    const item = document.querySelector('a.md-nav__link--active');
    if (!item) return;
    item.scrollIntoView({
        behavior: 'smooth',
        block:    'nearest',
        inline:   'nearest',
    });
}

window.addEventListener('DOMContentLoaded', () => {
    pageTitle = document.getElementsByTagName('h1');
    if (pageTitle.length > 0) {
        pageTitle = pageTitle[0];
    } else {
        pageTitle = undefined;
    }

    const spoiler = document.getElementById('page_spoiler');
    if (spoiler) {
        if (!hideSpoiler) {
            toc = document.querySelector("[data-md-type='toc']");
            if (!toc) {
                toc = document.querySelector("[data-md-component='toc']");
            }
            if (toc) {
                toc.classList.add('spoiled');
            }
            if (pageTitle) {
                pageTitle.classList.add('spoiled');
            }
            footerNavs = document.getElementsByClassName('md-footer__title')
            if (footerNavs.length > 0) {
                for (let nav of footerNavs) {
                    if (nav.outerHTML.includes('🔐'))
                        nav.classList.add('spoiled');
                }
            }
            headerTopic = document.querySelector('[data-md-component="header-topic"]');
            if (headerTopic) {
                headerTopic.classList.add('spoiled');
            }
        } else {
            spoiler.parentElement.removeChild(spoiler);
        }
    }

    let sidebar = document.getElementsByClassName('md-sidebar--primary');
    if (sidebar) {
        sidebar = sidebar[0];
        let button = document.createElement('button');
        button.classList.add('unscramble-button');
        button.type = 'button';
        button.innerText = (scrambleMenu ? 'Uns' : 'S') + 'cramble 🔐 Items';
        button.onclick = () => {
            scrambleMenu = !scrambleMenu;
            button.innerText = (scrambleMenu ? 'Uns' : 'S') + 'cramble 🔐 Items';
            localStorage.setItem('unscramble', String(!scrambleMenu));
            let scrambles = document.querySelectorAll("[unscrambled]");
            for (let elem of scrambles) {
                elem.innerText = elem.getAttribute('unscrambled');
            }
            setupScrambling();
        };
        sidebar.prepend(button);
    }
    
    setupScrambling();

    window.setTimeout(() => scrollToMenuItem(), 250);
    window.addEventListener('resize', scrollToMenuItem);
    window.addEventListener('ShowSpoiler', killSpoiler);
});