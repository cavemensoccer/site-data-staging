// Shared header + navigation for every page. Load after config.js (the
// Photos group reads SOCCER_CONFIG.PHOTO_LINKS), then call initSiteChrome().
//
// This exists so the header/nav markup is defined once instead of hand-copied
// into every HTML file -- see HANDOFF.md's "Known gotchas" history for why
// that duplication was a recurring source of drift (e.g. the Instagram icon's
// ~1,900-character inline SVG used to be pasted into all 5 pages separately).

const NAV_GROUPS = [
    {
        label: 'Team',
        items: [
            { label: 'Roster', href: 'roster.html' },
            { label: 'Schedule', href: 'schedule.html' }
        ]
    },
    {
        label: 'Photos',
        items: [] // filled in at render time from SOCCER_CONFIG.PHOTO_LINKS
    },
    {
        label: 'Resources',
        items: [
            { label: 'Pay Team Fees', href: 'payteamfees.html' },
            { label: 'Coaching From The Sideline', href: 'coaching.html' },
            { label: 'Register My Athlete', href: 'https://www.registermyathlete.com/', external: true },
            { label: 'School Website', href: 'https://afhs.alpineschools.org/', external: true }
        ]
    }
];

const STANDALONE_ITEMS = [
    { label: 'Contact Coach Waldron', href: 'mailto:caseybwaldron@gmail.com?subject=Contact%20-%20American%20Fork%20Boys%20Soccer' }
];

const INSTAGRAM_LINK_HTML = `
    <a href="https://www.instagram.com/cavemensoccer/" target="_blank" aria-label="Visit American Fork Boys Soccer on Instagram">
        <svg class="instagram-icon" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.668 2.668 0 1 1 0 5.336 2.668 2.668 0 0 1 0-5.336z"/></svg>
    </a>
`;

// isHome: the homepage keeps its title as an <h1> (the page's one semantic
// heading); inner pages use a plain link since they each have their own
// <h2 class="page-header"> for the actual page title.
function buildHeaderHtml(isHome) {
    const titleTag = isHome
        ? '<h1 class="main-title">CAVEMEN SOCCER</h1>'
        : '<a href="index.html" class="main-title">CAVEMEN SOCCER</a>';
    return `
    <div class="logo-group">
        <a href="index.html"><img src="./_assets/media/743114cb73f024a44c543e53d752d24d.png" alt="American Fork Soccer Logo" class="main-logo"></a>
        ${titleTag}
    </div>
    ${INSTAGRAM_LINK_HTML}
`;
}

// Photos years newest-first; falls back to an empty group if config.js
// hasn't defined PHOTO_LINKS yet (so this never throws, just renders no
// photo links rather than breaking the whole nav).
function buildPhotoGroupItems() {
    const links = (window.SOCCER_CONFIG && window.SOCCER_CONFIG.PHOTO_LINKS) || {};
    return Object.keys(links)
        .sort((a, b) => b.localeCompare(a))
        .map(year => ({ label: year, href: links[year], external: true }));
}

function renderNavLink(item) {
    const target = item.external ? ' target="_blank"' : '';
    return `<li><a href="${item.href}"${target}>${item.label.toUpperCase()}</a></li>`;
}

function renderNavItemsHtml() {
    const photoGroup = NAV_GROUPS.find(g => g.label === 'Photos');
    photoGroup.items = buildPhotoGroupItems();

    const groupsHtml = NAV_GROUPS.map(group => `
        <li class="nav-group">
            <details>
                <summary>${group.label.toUpperCase()}</summary>
                <ul class="nav-subitems">
                    ${group.items.map(renderNavLink).join('')}
                </ul>
            </details>
        </li>
    `).join('');

    const standaloneHtml = STANDALONE_ITEMS.map(renderNavLink).join('');

    return groupsHtml + standaloneHtml;
}

// headerId: the element to fill with the logo/title/Instagram icon.
// navContentId: the element to fill with the nav <li> items -- a
//   <ul class="side-nav"> on the homepage, or a plain <ul> nested inside
//   the <nav class="side-menu"> on inner pages.
// navToggleId: hamburger pages only -- the element whose "active" class
//   gets toggled (the outer <nav class="side-menu">, which is what the
//   slide-in CSS targets). Defaults to navContentId when omitted, which is
//   correct for the homepage (no separate outer wrapper there).
// hamburger: true on inner pages -- wires up the existing #menu-toggle /
//   #menu-overlay elements. The homepage doesn't use this.
// isHome: true only for index.html -- see buildHeaderHtml() for why.
function initSiteChrome({ headerId, navContentId, navToggleId, hamburger, isHome }) {
    const headerEl = document.getElementById(headerId);
    if (headerEl) headerEl.innerHTML = buildHeaderHtml(!!isHome);

    const navContentEl = document.getElementById(navContentId);
    if (navContentEl) navContentEl.innerHTML = renderNavItemsHtml();

    if (hamburger) {
        const toggle = document.getElementById('menu-toggle');
        const toggleTarget = document.getElementById(navToggleId || navContentId);
        const overlay = document.getElementById('menu-overlay');
        if (toggle && toggleTarget && overlay) {
            const toggleMenu = () => {
                toggleTarget.classList.toggle('active');
                overlay.classList.toggle('active');
            };
            toggle.addEventListener('click', toggleMenu);
            overlay.addEventListener('click', toggleMenu);
        }
    }
}
