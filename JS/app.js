// mobile menu
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav-menu");
if (menuToggle) {
  menuToggle.addEventListener("click", () => nav.classList.toggle("active"));
}

// cart and popup
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function showPopup(msg) {
  const p = document.createElement("div");
  p.className = "popup-cart";
  p.textContent = msg;
  document.body.appendChild(p);
  // show
  requestAnimationFrame(() => p.classList.add("show"));
  setTimeout(() => {
    p.classList.remove("show");
    setTimeout(() => p.remove(), 250);
  }, 1600);
}

// add-to-cart buttons
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-cart-btn")) {
    const card = e.target.closest(".product-card");
    if (!card) return;
    const name = card.querySelector(".product-name")
      ? card.querySelector(".product-name").innerText
      : card.querySelector("h3")?.innerText || "Sản phẩm";
    const priceText = card.querySelector(".price")?.innerText || "0";
    const price = Number(priceText.replace(/[^\d]/g, ""));
    const img = card.querySelector("img")?.src || "";
    const qtyEl = card.querySelector(".qty-input");
    let qty = 1;
    if (qtyEl) qty = Math.max(1, Number(qtyEl.value) || 1);

    // push to cart (by name)
    const existing = cart.find((i) => i.name === name);
    if (existing) existing.qty += qty;
    else cart.push({ name, price, img, qty });

    saveCart();
    showPopup(`Đã thêm ${name} (${qty}) vào giỏ`);
    // reset qty
    if (qtyEl) qtyEl.value = 1;
  }
});

// page load effect
window.addEventListener("load", () =>
  document.querySelector(".main")?.classList.add("loaded")
);
