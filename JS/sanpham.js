document.addEventListener("DOMContentLoaded", () => {
  // === KHỞI TẠO BIẾN TÌM KIẾM ===
  const searchInput = document.querySelector(".header-search input");
  const searchButton = document.querySelector(".header-search button");

  // Giả định các thẻ sản phẩm riêng lẻ có class là .product-card
  const products = document.querySelectorAll(".product-card");

  // === HÀM TÌM KIẾM SẢN PHẨM ===
  function filterProducts() {
    const query = searchInput.value.toLowerCase().trim();
    let found = false;

    // 1. Lọc và ẩn/hiện các thẻ sản phẩm riêng lẻ (.product-card)
    products.forEach((product) => {
      // Tìm tên sản phẩm trong thẻ con có class .product-name
      const nameElement = product.querySelector(".product-name");

      if (nameElement) {
        const name = nameElement.textContent.toLowerCase();

        if (name.includes(query)) {
          product.style.display = "block";
          found = true;
        } else {
          product.style.display = "none";
        }
      }
    });

    // 2. Ẩn toàn bộ section cha (.product-section)
    const sections = document.querySelectorAll(".product-section");
    sections.forEach((section) => (section.style.display = "none"));

    // Chỉ hiển thị section nào có sản phẩm còn hiển thị
    const visibleProducts = document.querySelectorAll(
      ".product-card:not([style*='display: none'])"
    );
    visibleProducts.forEach((product) => {
      // Tìm section gần nhất và hiển thị nó
      const parentSection = product.closest(".product-section");
      if (parentSection) {
        parentSection.style.display = "block";
      }
    });

    // 3. Thông báo nếu không tìm thấy
    if (!found) {
      alert(`Không tìm thấy sản phẩm "${query}"!`);
    }
  }

  // === ĐĂNG KÝ SỰ KIỆN TÌM KIẾM ===

  // Gắn sự kiện click cho nút "Tìm"
  if (searchButton) {
    searchButton.addEventListener("click", filterProducts);
  }

  // Gắn sự kiện nhấn Enter cho ô input
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        filterProducts();
      }
    });
  }
});
