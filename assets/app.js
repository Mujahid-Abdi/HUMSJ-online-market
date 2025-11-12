const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));
const STORE_KEY = "humsj_market_data";
const THEME_KEY = "humsj_theme";

function applyTheme() {
  const saved = localStorage.getItem(THEME_KEY) || "light";
  document.documentElement.classList.toggle("dark", saved === "dark");
}
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
}

function initUI() {
  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");
  if (menuToggle) {
    menuToggle.addEventListener("click", () =>
      navLinks.classList.toggle("open")
    );
    $$("#navLinks a").forEach((a) =>
      a.addEventListener("click", () => navLinks.classList.remove("open"))
    );
  }
  const dd = document.querySelector(".dropdown");
  if (dd) {
    const btn = dd.querySelector(".dropbtn");
    btn.addEventListener("click", () => dd.classList.toggle("open"));
    document.addEventListener("click", (e) => {
      if (!dd.contains(e.target) && !btn.contains(e.target))
        dd.classList.remove("open");
    });
  }
  const themeToggle = $("#themeToggle");
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
}

function defaults() {
  return {
    stores: {
      sumeya: {
        id: "sumeya",
        name: "Sumeya Boutique",
        pin: "1111",
        contacts: [
          {
            name: "Aisha Yusuf",
            phone: "+251912345678",
            tg: "aisha_y",
            image:
              "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
          },
          {
            name: "Fatima Ahmed",
            phone: "+251911223344",
            tg: "fatima_humsj",
            image:
              "https://images.unsplash.com/photo-1594824476967-48c8b9642737",
          },
          {
            name: "Hawa Mohammed",
            phone: "+251910987654",
            tg: "hawa_m",
            image:
              "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
          },
        ],
        products: [
          {
            id: "s1",
            name: "Elegant Hijab",
            image:
              "https://images.unsplash.com/photo-1585386959984-a4155224d8e2",
            price: 350,
            desc: "Soft chiffon hijab, multiple colors",
            qty: 8,
          },
          {
            id: "s2",
            name: "Classic Abaya",
            image:
              "https://images.unsplash.com/photo-1606813902851-fb8b2b8c06a6",
            price: 1500,
            desc: "Lightweight abaya, modest fit",
            qty: 5,
          },
          {
            id: "s3",
            name: "Handbag",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            price: 1200,
            desc: "Stylish everyday bag",
            qty: 3,
          },
        ],
      },
      abuzar: {
        id: "abuzar",
        name: "Abuzar Stationery & Electronics",
        pin: "2222",
        contacts: [
          {
            name: "Abuzar Ali",
            phone: "+251912223344",
            tg: "abuzar_store",
            image:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
          },
          {
            name: "Bilal Ibrahim",
            phone: "+251910001122",
            tg: "bilal_humsj",
            image:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
          },
          {
            name: "Sa’ad Hassan",
            phone: "+251900998877",
            tg: "saad_stationery",
            image: "https://images.unsplash.com/photo-1552058544-f2b08422138a",
          },
        ],
        products: [
          {
            id: "a1",
            name: 'Laptop 14"',
            image:
              "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
            price: 35000,
            desc: "Reliable student laptop",
            qty: 2,
          },
          {
            id: "a2",
            name: "Printer",
            image:
              "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
            price: 9000,
            desc: "Print/Copy services available",
            qty: 1,
          },
          {
            id: "a3",
            name: "Notebook Pack",
            image:
              "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
            price: 120,
            desc: "A5 lined notebooks (set of 3)",
            qty: 20,
          },
        ],
      },
      rcc: {
        id: "rcc",
        name: "RCC Mini Market",
        pin: "3333",
        contacts: [
          {
            name: "Rashid Mohammed",
            phone: "+251922334455",
            tg: "rashid_rcc",
            image:
              "https://images.unsplash.com/photo-1603415526960-f7e0328b272a",
          },
          {
            name: "Khalid Nur",
            phone: "+251911556677",
            tg: "khalid_n",
            image:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
          },
          {
            name: "Musa Adam",
            phone: "+251933221100",
            tg: "musa_rcc",
            image:
              "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
          },
        ],
        products: [
          {
            id: "r1",
            name: "Men’s Watch",
            image:
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
            price: 2500,
            desc: "Stainless steel strap",
            qty: 6,
          },
          {
            id: "r2",
            name: "Perfume",
            image:
              "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
            price: 800,
            desc: "Fresh long-lasting scent",
            qty: 10,
          },
          {
            id: "r3",
            name: "Cap",
            image:
              "https://images.unsplash.com/photo-1600180758890-6b94519a8ba2",
            price: 300,
            desc: "Adjustable fit",
            qty: 0,
          },
        ],
      },
    },
  };
}

function normalizeData(db) {
  let changed = false;
  Object.values(db.stores).forEach((s) => {
    if (!s.orders) {
      s.orders = [];
      changed = true;
    }
    if (!s.pin) {
      s.pin = "1234";
      changed = true;
    }
  });
  if (changed) saveData(db);
  return db;
}

function loadData() {
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) {
    const d = defaults();
    normalizeData(d);
    localStorage.setItem(STORE_KEY, JSON.stringify(d));
    return d;
  }
  try {
    const obj = JSON.parse(raw);
    return normalizeData(obj);
  } catch (e) {
    const d = defaults();
    normalizeData(d);
    localStorage.setItem(STORE_KEY, JSON.stringify(d));
    return d;
  }
}
function saveData(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}
function currency(n) {
  return "ETB " + Number(n).toLocaleString();
}

function buildCard(p, storeId) {
  const disabled = p.qty <= 0;
  return `
  <div class="product-card">
    <div class="card-top product-media">${
      disabled ? '<div class="out">Out of Stock</div>' : ""
    }<img src="${p.image}" alt="${p.name}" loading="lazy"></div>
    <div class="product-body">
      <div class="product-title">${p.name}</div>
      <div class="product-meta"><span class="price">${currency(
        p.price
      )}</span><span class="badge">Qty: ${p.qty}</span></div>
      <div class="muted">${p.desc || ""}</div>
      <div class="card-actions">
        <button class="btn btn-primary" data-buy data-store="${storeId}" data-id="${
    p.id
  }" ${disabled ? "disabled" : ""}>Buy Now</button>
      </div>
    </div>
  </div>`;
}

function renderHome(data) {
  const wrap = $("#featuredWrap");
  if (!wrap) return;
  const items = [];
  Object.values(data.stores).forEach((s) => {
    s.products.slice(0, 1).forEach((p) => items.push({ s, p }));
  });
  wrap.innerHTML = items
    .map(({ s, p }) => {
      return `<div>${buildCard(
        p,
        s.id
      )}<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 4px 10px"><span class="badge">${
        s.name
      }</span><a class="btn btn-outline" href="shop.html?store=${
        s.id
      }">View Shop</a></div></div>`;
    })
    .join("");
  // Disable Buy buttons on home to encourage viewing the full shop page
  wrap.querySelectorAll("[data-buy]").forEach((b) => {
    b.disabled = true;
  });
}

function renderShop(data) {
  const storeId = getParam("store") || "sumeya";
  const store = data.stores[storeId] || data.stores.sumeya;
  const title = $("#shopTitle");
  if (title) title.textContent = store.name;
  const grid = $("#productsGrid");
  if (grid)
    grid.innerHTML = store.products.map((p) => buildCard(p, store.id)).join("");
  bindBuyButtons();
  const cg = $("#contactsGrid");
  if (cg)
    cg.innerHTML = store.contacts
      .map(
        (c) => `
  <div class="contact-card"><img src="${c.image}" alt="${c.name}" loading="lazy"><div><h3>${c.name}</h3><div>${c.phone}</div><a href="https://t.me/${c.tg}" target="_blank">@${c.tg}</a></div></div>
`
      )
      .join("");
  const adminLink = $("#adminLink");
  if (adminLink) adminLink.href = `admin.html?store=${store.id}`;
}

function openModal() {
  const m = $("#orderModal");
  if (m) m.classList.add("open");
}
function closeModal() {
  const m = $("#orderModal");
  if (m) m.classList.remove("open");
}

let currentPurchase = null;
function bindBuyButtons() {
  $$("[data-buy]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const storeId = btn.getAttribute("data-store");
      const id = btn.getAttribute("data-id");
      currentPurchase = { storeId, id };
      openModal();
    })
  );
}

function handleOrderSubmit(data) {
  const form = $("#orderForm");
  if (!form) return;
  const note = $("#deliveryNote");
  if (note) {
    const showNote = () => {
      note.style.display = "block";
    };
    ["fullname", "phone", "campus", "block", "room"].forEach(
      (n) => form[n] && form[n].addEventListener("input", showNote)
    );
  }
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    // handle optional/required payment proof image
    let paymentImage = null;
    const fileInput = form.querySelector('input[name="payment"]');
    const file = fileInput && fileInput.files && fileInput.files[0];
    if (file) {
      paymentImage = await new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = reject;
        fr.readAsDataURL(file);
      });
    }
    if (!currentPurchase) return;
    const db = loadData();
    const s = db.stores[currentPurchase.storeId];
    const idx = s.products.findIndex((x) => x.id === currentPurchase.id);
    if (idx > -1 && s.products[idx].qty > 0) {
      s.products[idx].qty -= 1;
    }
    // record order for admin view
    s.orders = s.orders || [];
    const order = {
      id: "o" + Date.now(),
      productId: currentPurchase.id,
      productName: s.products[idx]?.name || "Item",
      price: s.products[idx]?.price || 0,
      buyer: payload.fullname,
      phone: payload.phone,
      campus: payload.campus,
      block: payload.block,
      room: payload.room,
      ts: Date.now(),
      status: "New",
      paymentImage: paymentImage,
    };
    s.orders.unshift(order);
    saveData(db);
    const success = $("#orderSuccess");
    success.textContent = `Thank you ${payload.fullname}. Your order has been received.`;
    success.style.display = "block";
    form.querySelector('[type="submit"]').disabled = true;
    setTimeout(() => {
      form.reset();
      success.style.display = "none";
      form.querySelector('[type="submit"]').disabled = false;
      closeModal();
      if (document.body.dataset.page === "shop") renderShop(loadData());
      if (document.body.dataset.page === "home") renderHome(loadData());
    }, 1300);
  });
  $("#closeOrder").addEventListener("click", closeModal);
  $("#orderModal").addEventListener("click", (e) => {
    if (e.target.id === "orderModal") closeModal();
  });
}

function renderAdmin(db) {
  const storeId = getParam("store") || "sumeya";
  const store = db.stores[storeId] || db.stores.sumeya;
  const title = $("#adminTitle");
  if (title) title.textContent = `Admin – ${store.name}`;
  const form = $("#productForm");
  const list = $("#adminList");
  const ordersList = $("#ordersList");
  let editId = null;
  function refresh() {
    const data = loadData();
    const s = data.stores[store.id];
    list.innerHTML = s.products
      .map(
        (p) => `
  <tr class="table-row">
    <td>${p.name}</td><td>${currency(p.price)}</td><td>${p.qty}</td>
    <td>
      <button class="btn btn-outline" data-edit="${p.id}">Edit</button>
      <button class="btn btn-accent" data-qtyup="${p.id}">+1</button>
      <button class="btn btn-outline" data-qtydown="${p.id}">-1</button>
      <button class="btn btn-primary" data-delete="${p.id}">Delete</button>
    </td>
  </tr>`
      )
      .join("");
    bindRowActions();
    // render orders
    if (ordersList) {
      if (!s.orders || s.orders.length === 0) {
        ordersList.innerHTML = `<tr><td colspan="7" class="muted">No orders yet</td></tr>`;
      } else {
        ordersList.innerHTML = s.orders
          .map(
            (o) => `
          <tr class="table-row">
            <td>${new Date(o.ts).toLocaleString()}</td>
            <td>${o.productName}</td>
            <td>${o.buyer}</td>
            <td>${o.phone}</td>
            <td>${o.campus} • ${o.block} • ${o.room}</td>
            <td>${o.status || "New"}</td>
            <td>
              <button class="btn btn-accent" data-odone="${
                o.id
              }">Mark Done</button>
              ${
                o.paymentImage
                  ? '<a class="btn btn-outline" href="' +
                    o.paymentImage +
                    '" target="_blank">View Proof</a>'
                  : ""
              }
              <button class="btn btn-outline" data-odel="${
                o.id
              }">Delete</button>
            </td>
          </tr>`
          )
          .join("");
      }
      bindOrderActions();
    }
  }
  function bindRowActions() {
    list.querySelectorAll("[data-edit]").forEach((b) =>
      b.addEventListener("click", () => {
        const s = loadData().stores[store.id];
        const p = s.products.find((x) => x.id === b.dataset.edit);
        editId = p.id;
        form.name.value = p.name;
        form.image.value = p.image;
        form.price.value = p.price;
        form.desc.value = p.desc;
        form.qty.value = p.qty;
      })
    );
    list.querySelectorAll("[data-delete]").forEach((b) =>
      b.addEventListener("click", () => {
        const db = loadData();
        const s = db.stores[store.id];
        s.products = s.products.filter((x) => x.id !== b.dataset.delete);
        saveData(db);
        refresh();
      })
    );
    list.querySelectorAll("[data-qtyup]").forEach((b) =>
      b.addEventListener("click", () => {
        const db = loadData();
        const s = db.stores[store.id];
        const p = s.products.find((x) => x.id === b.dataset.qtyup);
        p.qty += 1;
        saveData(db);
        refresh();
      })
    );
    list.querySelectorAll("[data-qtydown]").forEach((b) =>
      b.addEventListener("click", () => {
        const db = loadData();
        const s = db.stores[store.id];
        const p = s.products.find((x) => x.id === b.dataset.qtydown);
        p.qty = Math.max(0, p.qty - 1);
        saveData(db);
        refresh();
      })
    );
  }
  function bindOrderActions() {
    if (!ordersList) return;
    ordersList.querySelectorAll("[data-odone]").forEach((b) =>
      b.addEventListener("click", () => {
        const db = loadData();
        const s = db.stores[store.id];
        const o = s.orders.find((x) => x.id === b.dataset.odone);
        if (o) {
          o.status = "Done";
          saveData(db);
          refresh();
        }
      })
    );
    ordersList.querySelectorAll("[data-odel]").forEach((b) =>
      b.addEventListener("click", () => {
        const db = loadData();
        const s = db.stores[store.id];
        s.orders = s.orders.filter((x) => x.id !== b.dataset.odel);
        saveData(db);
        refresh();
      })
    );
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const db = loadData();
    const s = db.stores[store.id];
    const item = {
      id: editId || "id" + Date.now(),
      name: form.name.value,
      image: form.image.value,
      price: Number(form.price.value || 0),
      desc: form.desc.value,
      qty: Number(form.qty.value || 0),
    };
    if (editId) {
      const i = s.products.findIndex((x) => x.id === editId);
      s.products[i] = item;
    } else {
      s.products.unshift(item);
    }
    saveData(db);
    form.reset();
    editId = null;
    refresh();
  });
  $("#storeSwitch").addEventListener("change", (e) => {
    window.location.href = `admin.html?store=${e.target.value}`;
  });
  // Admin PIN gate
  const pinModal = $("#pinModal");
  const pinName = $("#pinStoreName");
  const pinForm = $("#pinForm");
  const pinError = $("#pinError");
  const mainEl = document.querySelector("main");
  if (pinName) pinName.textContent = store.name;
  const sessionKey = `humsj_admin_${store.id}`;
  if (sessionStorage.getItem(sessionKey) === "ok") {
    pinModal && pinModal.classList.remove("open");
    if (mainEl) mainEl.style.display = "";
  } else if (pinModal && pinForm) {
    if (mainEl) mainEl.style.display = "none";
    pinModal.classList.add("open");
    pinForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const pin = pinForm.pin.value.trim();
      if (pin === store.pin) {
        sessionStorage.setItem(sessionKey, "ok");
        pinError && (pinError.style.display = "none");
        pinModal.classList.remove("open");
        if (mainEl) mainEl.style.display = "";
      } else {
        pinError && (pinError.style.display = "block");
        if (mainEl) mainEl.style.display = "none";
      }
    });
  }
  // Close PIN modal when clicking outside the card
  if (pinModal) {
    pinModal.addEventListener("click", (e) => {
      if (e.target && e.target.id === "pinModal") {
        window.location.href = `shop.html?store=${store.id}`;
      }
    });
  }
  // Change PIN flow
  const changePinBtn = $("#changePinBtn");
  const changePinModal = $("#changePinModal");
  const changePinForm = $("#changePinForm");
  const changePinError = $("#changePinError");
  const changePinSuccess = $("#changePinSuccess");
  if (changePinBtn && changePinModal) {
    changePinBtn.addEventListener("click", () =>
      changePinModal.classList.add("open")
    );
    const cancelBtn = $("#cancelChangePin");
    cancelBtn &&
      cancelBtn.addEventListener("click", () =>
        changePinModal.classList.remove("open")
      );
  }
  if (changePinForm) {
    changePinForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const oldPin = changePinForm.old.value.trim();
      const newPin = changePinForm.new.value.trim();
      const confirmPin = changePinForm.confirm.value.trim();
      if (oldPin !== store.pin) {
        if (changePinError) {
          changePinError.textContent = "Old PIN is incorrect.";
          changePinError.style.display = "block";
        }
        if (changePinSuccess) changePinSuccess.style.display = "none";
        return;
      }
      if (newPin.length < 4) {
        if (changePinError) {
          changePinError.textContent = "New PIN must be at least 4 digits.";
          changePinError.style.display = "block";
        }
        if (changePinSuccess) changePinSuccess.style.display = "none";
        return;
      }
      if (newPin !== confirmPin) {
        if (changePinError) {
          changePinError.textContent = "New PIN and confirm PIN do not match.";
          changePinError.style.display = "block";
        }
        if (changePinSuccess) changePinSuccess.style.display = "none";
        return;
      }
      const db2 = loadData();
      db2.stores[store.id].pin = newPin;
      saveData(db2);
      if (changePinError) changePinError.style.display = "none";
      if (changePinSuccess) changePinSuccess.style.display = "block";
      // force re-login
      sessionStorage.removeItem(sessionKey);
      changePinModal && changePinModal.classList.remove("open");
      pinModal && pinModal.classList.add("open");
      if (mainEl) mainEl.style.display = "none";
      if (pinName) pinName.textContent = store.name;
    });
  }
  // Require PIN again after leaving the page
  window.addEventListener("pagehide", () => {
    sessionStorage.removeItem(sessionKey);
  });
  refresh();
}

function boot() {
  applyTheme();
  initUI();
  const data = loadData();
  const page = document.body.dataset.page;
  if (page === "home") {
    renderHome(data);
  }
  if (page === "shop") {
    renderShop(data);
    handleOrderSubmit();
  }
  if (page === "admin") {
    renderAdmin(data);
  }
}

document.addEventListener("DOMContentLoaded", boot);
