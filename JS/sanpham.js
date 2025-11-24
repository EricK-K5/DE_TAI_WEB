document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");
  const CART_KEY = `cart_${currentUser}`;

  function syncCartCount() {
    const cartData = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    let total = 0;

    cartData.forEach((item) => {
      total += item.quantity;
    });

    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = total;
    }
  }

  syncCartCount();

  const addCartButtons = document.querySelectorAll(".add-cart-btn");
  const cartCount = document.getElementById("cart-count");
  const popup = document.getElementById("popup-cart");

  let totalItems = 0;

  addCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card");
      const qtyInput = productCard.querySelector(".qty-input");
      const quantity = parseInt(qtyInput.value);

      totalItems += quantity;
      cartCount.textContent = totalItems;

      showPopup("Sản phẩm đã được thêm vào giỏ hàng!");
      addToCart(productCard, quantity);
    });
  });

  function showPopup(message) {
    popup.textContent = message;
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 2000);
  }
  const searchInput = document.querySelector(".header-search input");
  const searchButton = document.querySelector(".header-search button");
  const products = document.querySelectorAll(".product-card");

  searchButton.addEventListener("click", filterProducts);

  // Thêm tính năng Enter để tìm kiếm khi nhấn Enter
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      filterProducts();
    }
  });
  function filterProducts() {
    const query = searchInput.value.toLowerCase();
    let found = false;

    // Ẩn tất cả sản phẩm tham khảo chatgpt
    products.forEach((product) => {
      const name = product
        .querySelector(".product-name")
        .textContent.toLowerCase();
      if (name.includes(query)) {
        product.style.display = "block";
        found = true;
      } else {
        product.style.display = "none";
      }
    });

    // Ẩn toàn bộ section trước
    const sections = document.querySelectorAll(".product-section");
    sections.forEach((section) => (section.style.display = "none"));

    // Chỉ hiển thị section nào có sản phẩm còn hiển thị
    const visibleProducts = document.querySelectorAll(
      ".product-card:not([style*='display: none'])"
    );
    visibleProducts.forEach((product) => {
      product.closest(".product-section").style.display = "block";
    });

    // Nếu không tìm thấy sản phẩm nào
    if (!found) {
      alert("Không tìm thấy sản phẩm!");
    }
  }
});
