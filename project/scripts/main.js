const state = {
    featured: [
        {id:'f1',name:'Golden Latte',desc:'House espresso, steamed milk, honey & cinnamon.',price:600, img:'./images/goldenlatte.jpeg'},
        {id:'f2',name:'Vanilla Cold Brew',desc:'Slow-steeped cold brew with Madagascar vanilla.',price:700, img:'./images/vanillacoldbrew.jpeg'},
        {id:'f3',name:'Cocoa Croissant',desc:'Buttery croissant filled with dark chocolate.' ,price:450, img:'./images/cocoacroissant.jpeg'}
    ],
    testimonials: [
        {id:1,name:'Amina',note:"Lovely space — great espresso."},
        {id:2,name:'David',note:'Cozy and friendly staff.'}
    ],
    menu: [
        {id:1,name:'Espresso',category:'coffee',price:300,desc:'Double shot of house espresso',img:'./images/espresso.jpeg'},
        {id:2,name:'Cappuccino',category:'coffee',price:450,desc:'Espresso with steamed milk and foam',img:'./images/cappuccino.jpeg'},
        {id:3,name:'Green Tea',category:'tea',price:350,desc:'Sencha green tea served hot',img:'./images/green-tea.jpeg'},
        {id:4,name:'Blueberry Muffin',category:'pastry',price:400,desc:'Freshly baked blueberry muffin',img:'./images/muffin.jpeg'},
        {id:5,name:'Iced Americano',category:'coffee',price:380,desc:'Espresso with chilled water and ice',img:'./images/americano.jpeg'}
    ],
    events: [
        {id:'e1',title:'Open Mic Night',date:'2025-10-25',spots:20,desc:'Local artists and poets share work.'},
        {id:'e2',title:'Book Club — Local Authors',date:'2025-11-02',spots:12,desc:'Discuss books by local writers.'}
    ]
};

// Storage helpers
function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function load(key, fallback) { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }

// Ensure initial persistent data exists
function ensureInitialData() {
    if (!localStorage.getItem('events')) save('events', state.events);
    if (!localStorage.getItem('menu')) save('menu', state.menu);
    if (!localStorage.getItem('testimonials')) save('testimonials', state.testimonials);
    if (!localStorage.getItem('featuredIndex')) localStorage.setItem('featuredIndex', '0');
}

// Featured carousel
function renderFeatured() {
    const el = document.getElementById('featured-card');
    if (!el) return;
    const list = load('featured', state.featured);
    let idx = Number(localStorage.getItem('featuredIndex')) || 0;
    idx = ((idx % list.length) + list.length) % list.length;
    const item = list[idx];
    el.innerHTML = `
        <div class="featured-inner">
            <img src="${item.img}" alt="${item.name}" loading="lazy" width="320" height="200">
            <div>
                <h4>${item.name} — ₦${item.price}</h4>
                <p>${item.desc}</p>
                <button id="order-${item.id}">Order</button>
            </div>
        </div>
    `;
}

function changeFeatured(delta) {
    let idx = Number(localStorage.getItem('featuredIndex')) || 0;
    idx += delta;
    localStorage.setItem('featuredIndex', String(idx));
    renderFeatured();
}

// Testimonials
function renderTestimonials() {
    const el = document.getElementById('testimonials-list');
    if (!el) return;
    const testimonials = load('testimonials', state.testimonials);
    el.innerHTML = testimonials.map(t =>
        `<div class="testimonial"><strong>${t.name}</strong>: ${t.note}</div>`
    ).join('');
}

// Menu
function renderMenu(filter = 'all', search = '') {
    const el = document.getElementById('menu-list');
    if (!el) return;
    let menu = load('menu', state.menu);
    if (filter !== 'all') menu = menu.filter(m => m.category === filter);
    if (search) menu = menu.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));
    el.innerHTML = menu.map(item =>
        `<div class="menu-item">
            <img src="${item.img}" alt="${item.name}" width="120" height="80">
            <h5>${item.name} — ₦${item.price}</h5>
            <p>${item.desc}</p>
            <button class="add-cart" data-id="${item.id}">Add to Cart</button>
        </div>`
    ).join('');
}

// Events
function renderEvents() {
    const el = document.getElementById('events-list');
    if (!el) return;
    const events = load('events', state.events);
    el.innerHTML = events.map(ev =>
        `<div class="event">
            <h5>${ev.title} (${ev.date})</h5>
            <p>${ev.desc}</p>
            <span>Spots: ${ev.spots}</span>
        </div>`
    ).join('');
}

// Cart
function addToCart(id) {
    const menu = load('menu', state.menu);
    const item = menu.find(m => m.id === Number(id));
    if (!item) return;
    const cart = load('cart', []);
    const existing = cart.find(c => c.id === item.id);
    if (existing) { existing.qty += 1; } else { cart.push({id: item.id, name: item.name, price: item.price, qty: 1}); }
    save('cart', cart);
    alert(`${item.name} added to cart (total items: ${cart.reduce((s, i) => s + i.qty, 0)})`);
}

// Utilities & Init
function wireUp() {
    // year elements
    const y = new Date().getFullYear();
    ['year', 'year2'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = y;
    });

    ensureInitialData();
    renderFeatured();
    renderTestimonials();
    renderMenu();
    renderEvents();

    // featured controls
    const next = document.getElementById('next-feature');
    const prev = document.getElementById('prev-feature');
    if (next) next.addEventListener('click', () => changeFeatured(1));
    if (prev) prev.addEventListener('click', () => changeFeatured(-1));

    // menu filters
    const filterButtons = document.querySelectorAll('.filters button');
    filterButtons.forEach(btn => btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMenu(btn.dataset.filter || 'all', document.getElementById('search-input') ? document.getElementById('search-input').value.trim() : '');
    }));

    // search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.addEventListener('input', (e) => {
        const active = document.querySelector('.filters button.active');
        const filter = active ? active.dataset.filter : 'all';
        renderMenu(filter, e.target.value.trim());
    });

    // delegate add-to-cart buttons
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.add-cart')) {
            const id = e.target.dataset.id;
            addToCart(id);
        }
        if (e.target.id && e.target.id.startsWith('order-')) {
            const id = e.target.id.replace('order-', '');
            addToCart(id.replace('f', '')); // featured ids start with f; map to menu id if needed
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireUp);
} else {
    wireUp();
}