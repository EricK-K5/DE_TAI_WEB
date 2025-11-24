document.addEventListener("DOMContentLoaded", () => {
  // ================== GIỎ HÀNG ==================
  const addCartButtons = document.querySelectorAll(".btn-add-cart");
  const cartCount = document.getElementById("cart-count");
  const popup = document.getElementById("popup-cart");

  let totalItems = 0;

  addCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card");
      const qtyInput = productCard.querySelector(".qty-input") || { value: 1 };
      const quantity = parseInt(qtyInput.value);

      totalItems += quantity;
      if (cartCount) cartCount.textContent = totalItems;

      showPopup("Sản phẩm đã được thêm vào giỏ hàng!");
      // addToCart(productCard, quantity); // Gọi hàm xử lý giỏ hàng nếu có
    });
  });

  function showPopup(message) {
    if (!popup) return;
    popup.textContent = message;
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
    }, 2000);
  }

  // ================== TÌM KIẾM SẢN PHẨM ==================
  const searchInput = document.querySelector(".header-search input");
  const searchButton = document.querySelector(".header-search button");
  const products = document.querySelectorAll(".product-card");

  function filterProducts() {
    const query = searchInput.value.toLowerCase();
    let found = false;

    products.forEach((product) => {
      const nameElem = product.querySelector(".product-name") || product.querySelector(".card-title");
      const name = nameElem.textContent.toLowerCase();
      if (name.includes(query)) {
        product.style.display = "block";
        found = true;
      } else {
        product.style.display = "none";
      }
    });

    // Ẩn section nếu không còn sản phẩm hiển thị
    const sections = document.querySelectorAll(".product-section");
    sections.forEach((section) => {
      const visible = section.querySelectorAll(".product-card:not([style*='display: none'])");
      section.style.display = visible.length ? "block" : "none";
    });

    if (!found) alert("Không tìm thấy sản phẩm!");
  }

  searchButton.addEventListener("click", filterProducts);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") filterProducts();
  });

  // ================== NÚT XEM TẤT CẢ SẢN PHẨM ==================
  const viewAllBtn = document.getElementById("view-all-products");
  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", () => {
      window.location.href = "sanpham.html";
    });
  }
});
