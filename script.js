/* Brew and Bloom | script
   Edit CONFIG, MENU and REVIEWS to update the site content. */

const CONFIG = {
  // WhatsApp number in international format, digits only
  whatsappNumber: "447700900456",
  whatsappMessage: "Hi Brew & Bloom! I'd like to order for pickup.\n\nName:\nPickup time:\nOrder:",
  instagramHandle: "brewandbloom.ldn",
  phoneDisplay: "020 7946 0321",
  phoneDial: "+442079460321",
  email: "hello@brewandbloom.co.uk",
  addressLine1: "The Lakeside Pavilion, Regent's Park",
  addressLine2: "London NW1 4NR",
  // Where the map and directions point to
  mapQuery: "Boating Lake, Regent's Park, London NW1 4NR",
  // 24h format, index 0 = Sunday. Use { open: null } for closed days.
  hours: [
    { day: "Sunday",    open: "08:00", close: "17:30" },
    { day: "Monday",    open: "07:30", close: "17:00" },
    { day: "Tuesday",   open: "07:30", close: "17:00" },
    { day: "Wednesday", open: "07:30", close: "17:00" },
    { day: "Thursday",  open: "07:30", close: "17:00" },
    { day: "Friday",    open: "07:30", close: "17:00" },
    { day: "Saturday",  open: "08:00", close: "17:30" }
  ],
  kitchenClosesBefore: 120,
  currency: "\u00A3"
};

const MENU = [
  { cat: ["popular", "brunch"], name: "Croissant Benedict", desc: "Spinach, smoked beef bacon, hollandaise", price: "12.50", img: "images/croissant-benedict.jpg" },
  { cat: ["popular", "brunch"], name: "Bianca Flatbread", desc: "Burrata, creamed spinach, rocket", price: "13.00", img: "images/bianca-flatbread.jpg" },
  { cat: ["popular", "bakery"], name: "Cinnamon Swirl", desc: "Brown butter and cinnamon sugar", price: "3.80", img: "images/cinnamon-swirls.jpg" },
  { cat: ["popular", "coffee"], name: "Flat White", desc: "Lakeside house blend, cocoa and plum", price: "3.60", img: "images/croissant-board.jpg" },
  { cat: ["brunch"], name: "Avocado and Ham Benedict", desc: "Sourdough, smashed avocado, chives", price: "12.00", img: "images/avocado-ham-benedict.jpg" },
  { cat: ["brunch"], name: "Chorizo Benedict", desc: "House brioche, chorizo, kale salad", price: "12.50", img: "images/chorizo-benedict.jpg" },
  { cat: ["brunch"], name: "Poached Eggs on Brioche", desc: "Avocado, sunflower seeds, sorrel", price: "10.50", img: "images/poached-eggs-brioche.jpg" },
  { cat: ["bakery"], name: "Croissant Board", desc: "Hazelnut chocolate, banana, berries", price: "7.50", img: "images/croissant-board.jpg" },
  { cat: ["bakery"], name: "Pain aux Raisins", desc: "Vanilla custard, rum soaked raisins", price: "3.80", img: "images/cinnamon-swirls.jpg" },
  { cat: ["bakery"], name: "Double Chocolate Cookie", desc: "Dark chocolate and sea salt", price: "3.20", img: "images/croissant-board.jpg" },
  { cat: ["coffee"], name: "Cardamom Oat Latte", desc: "Oat milk at no extra charge", price: "4.10", img: "images/cinnamon-swirls.jpg" },
  { cat: ["coffee"], name: "Espresso or Cortado", desc: "Guest single origin each month", price: "2.80", img: "images/croissant-board.jpg" },
  { cat: ["coffee"], name: "Loose Leaf Tea", desc: "Chamomile, sencha or breakfast", price: "3.00", img: "images/neon-sign.jpg" }
];

const REVIEWS = [
  { initials: "SO", name: "Sophie O.", role: "Morning dog walker", rating: 5, title: "The best part of my morning loop",
    text: "Two laps of the lake, then a flat white and a cinnamon swirl at the window. The team know my order and always have a biscuit for Bramble." },
  { initials: "MR", name: "Marcus R.", role: "Works nearby in Marylebone", rating: 5, title: "Worth the walk from the office",
    text: "I order on WhatsApp as I leave the office and it is ready by the time I reach York Gate. The croissant Benedict is the best brunch in this part of London." },
  { initials: "LT", name: "Leila T.", role: "Saturday brunch regular", rating: 5, title: "Our weekend tradition",
    text: "Six of us on the red banquette every other Saturday. The Bianca flatbread is a must, and we always take a bag of pastries for the walk home through the park." }
];

(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Links and contact details ---------- */
  const waUrl = "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(CONFIG.whatsappMessage);
  const igUrl = "https://www.instagram.com/" + CONFIG.instagramHandle + "/";
  const q = encodeURIComponent(CONFIG.mapQuery);

  $$("[data-whatsapp]").forEach(a => { a.href = waUrl; a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-instagram]").forEach(a => { a.href = igUrl; });
  $$("[data-directions]").forEach(a => { a.href = "https://www.google.com/maps/dir/?api=1&destination=" + q; });
  $$("[data-phone]").forEach(el => { el.textContent = CONFIG.phoneDisplay; });
  $$("[data-phone-link]").forEach(a => { a.href = "tel:" + CONFIG.phoneDial; });
  $$("[data-email]").forEach(el => { el.textContent = CONFIG.email; });
  $$("[data-address-line1]").forEach(el => { el.textContent = CONFIG.addressLine1; });
  $$("[data-address-line2]").forEach(el => { el.textContent = CONFIG.addressLine2; });
  $$("[data-address-inline]").forEach(el => { el.textContent = CONFIG.addressLine1 + ", " + CONFIG.addressLine2; });
  $$("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
  const map = $("[data-map]");
  if (map) map.src = "https://www.google.com/maps?q=" + q + "&output=embed";

  /* ---------- Mobile nav ---------- */
  const burger = $("[data-burger]");
  const nav = $("#site-nav");
  function setNav(open) {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  }
  burger.addEventListener("click", () => setNav(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", nav).forEach(a => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setNav(false); });
  window.addEventListener("resize", () => { if (window.innerWidth > 900) setNav(false); });

  /* ---------- Hours and live status ---------- */
  const toMin = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const fmt = n => String(Math.floor(n / 60) % 24).padStart(2, "0") + ":" + String(n % 60).padStart(2, "0");

  const hoursBody = $("[data-hours-body]");
  hoursBody.innerHTML = [1, 2, 3, 4, 5, 6, 0].map(i => {
    const d = CONFIG.hours[i];
    const t = d.open ? d.open + " to " + d.close : "Closed";
    return '<tr data-day="' + i + '"><td>' + d.day + '</td><td>' + t + '</td></tr>';
  }).join("");

  function nextOpening(now) {
    for (let i = 1; i <= 7; i++) {
      const d = CONFIG.hours[(now.getDay() + i) % 7];
      if (d.open) return (i === 1 ? "tomorrow" : d.day) + " at " + d.open;
    }
    return null;
  }

  function updateStatus() {
    const now = new Date();
    const dayIdx = now.getDay();
    const today = CONFIG.hours[dayIdx];
    const mins = now.getHours() * 60 + now.getMinutes();
    let open = false, short, long, detail;

    if (today.open) {
      const o = toMin(today.open), c = toMin(today.close), k = c - CONFIG.kitchenClosesBefore;
      if (mins >= o && mins < c) {
        open = true;
        short = "Open until " + today.close;
        long = "Open now until " + today.close;
        detail = mins < k
          ? "Brunch orders until " + fmt(k) + ", coffee until " + today.close + "."
          : "The kitchen has closed, but the coffee bar is pouring until " + today.close + ".";
      } else if (mins < o) {
        short = "Opens " + today.open;
        long = "Opens today at " + today.open;
        detail = "Message ahead and your coffee will be ready when we open.";
      }
    }
    if (!short) {
      const n = nextOpening(now);
      short = "Closed now";
      long = n ? "Closed, opens " + n : "Closed";
      detail = n ? "We open again " + n + "." : "See you soon.";
    }

    $$("[data-status-short]").forEach(el => { el.textContent = short; });
    $$("[data-status-long]").forEach(el => { el.textContent = long; });
    $$("[data-status-dot]").forEach(el => el.classList.toggle("is-closed", !open));
    const big = $("[data-status-big]");
    big.textContent = open ? "Open" : "Closed";
    big.classList.toggle("is-open", open);
    big.classList.toggle("is-closed", !open);
    $("[data-status-detail]").textContent = detail;

    $$("tr", hoursBody).forEach(tr => {
      const isToday = Number(tr.dataset.day) === dayIdx;
      tr.classList.toggle("is-today", isToday);
      const cell = tr.firstElementChild;
      const tag = cell.querySelector(".today-tag");
      if (isToday && !tag) cell.insertAdjacentHTML("beforeend", '<span class="today-tag">TODAY</span>');
      if (!isToday && tag) tag.remove();
    });
  }
  updateStatus();
  setInterval(updateStatus, 30000);

  /* ---------- Menu cards ---------- */
  const cards = $("[data-cards]");
  const tabs = $$("[data-cat]");
  const select = $("[data-cat-select]");

  function renderMenu(cat) {
    cards.innerHTML = MENU.filter(m => m.cat.includes(cat)).slice(0, 4).map(m =>
      '<article class="card">' +
        '<div class="card-img"><img src="' + esc(m.img) + '" alt="' + esc(m.name) + '" loading="lazy">' +
        '<span class="card-price mono">' + CONFIG.currency + esc(m.price) + '</span></div>' +
        '<h3>' + esc(m.name) + '</h3><p>' + esc(m.desc) + '</p>' +
      '</article>'
    ).join("");
    cards.scrollLeft = 0;
    tabs.forEach(t => t.setAttribute("aria-selected", String(t.dataset.cat === cat)));
    select.value = cat;
  }
  tabs.forEach(t => t.addEventListener("click", () => renderMenu(t.dataset.cat)));
  select.addEventListener("change", () => renderMenu(select.value));
  renderMenu("popular");

  /* ---------- Reviews carousel ---------- */
  let rIndex = 0;
  const dotsWrap = $("[data-r-dots]");
  dotsWrap.innerHTML = REVIEWS.map((_, i) => '<button aria-label="Show review ' + (i + 1) + '" data-i="' + i + '"></button>').join("");

  function showReview(i) {
    rIndex = (i + REVIEWS.length) % REVIEWS.length;
    const r = REVIEWS[rIndex];
    $("[data-r-initials]").textContent = r.initials;
    $("[data-r-name]").textContent = r.name;
    $("[data-r-role]").textContent = r.role;
    $("[data-r-rating]").textContent = r.rating;
    $("[data-r-title]").textContent = r.title;
    $("[data-r-text]").textContent = r.text;
    $$("button", dotsWrap).forEach((b, j) => b.setAttribute("aria-current", String(j === rIndex)));
  }
  $("[data-r-prev]").addEventListener("click", () => showReview(rIndex - 1));
  $("[data-r-next]").addEventListener("click", () => showReview(rIndex + 1));
  $$("button", dotsWrap).forEach(b => b.addEventListener("click", () => showReview(Number(b.dataset.i))));
  showReview(0);

  /* ---------- Newsletter ---------- */
  const form = $("[data-news-form]");
  const msg = $("[data-news-msg]");
  const original = msg.innerHTML;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const input = form.querySelector("input");
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    input.setAttribute("aria-invalid", String(!ok));
    msg.classList.toggle("is-ok", ok);
    msg.classList.toggle("is-err", !ok);
    if (ok) {
      // Connect this to your email provider (Mailchimp, Brevo, etc.)
      msg.textContent = "Thanks! You are on the list. Look out for this week's specials.";
      form.reset();
    } else {
      msg.textContent = "Please enter a valid email address.";
      setTimeout(() => { msg.classList.remove("is-err"); msg.innerHTML = original; }, 4000);
    }
  });
})();
