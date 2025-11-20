document.addEventListener("DOMContentLoaded", () => {
  const addCartButtons = document.querySelectorAll(".add-cart-btn");
  const cartCount = document.getElementById("cart-count");
  const popup = document.getElementById("popup-cart");

  let totalItems = 0;

  addCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Lấy số lượng từ input gần nhất
      const productCard = e.target.closest(".product-card");
      const qtyInput = productCard.querySelector(".qty-input");
      const quantity = parseInt(qtyInput.value);

      // 1. Cập nhật số lượng
      totalItems += quantity;
      cartCount.textContent = totalItems;

      // 2. Hiển thị popup thông báo
      showPopup("Sản phẩm đã được thêm vào giỏ hàng!");
    });
  });

  function showPopup(message) {
    popup.textContent = message;
    popup.classList.add("show");

    // Tự động ẩn popup sau 2 giây
    setTimeout(() => {
      popup.classList.remove("show");
    }, 2000);
  }
});
