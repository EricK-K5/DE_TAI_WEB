document.addEventListener("DOMContentLoaded", () => {
  // === KHỞI TẠO BIẾN TÌM KIẾM ===
  const searchInput = document.querySelector(".header-search input");
  const searchButton = document.querySelector(".header-search button");

  // Chỉ thu thập các khối ảnh trigger (có class .product-item-toggle VÀ .product-card)
  const productTriggers = document.querySelectorAll(
    ".product-item-toggle.product-card"
  );

  // === HÀM TÌM KIẾM SẢN PHẨM ===
  function filterProducts() {
    const query = searchInput.value.toLowerCase().trim();
    let found = false;

    // 1. Ẩn toàn bộ các khối mô tả chi tiết (#photo1, #photo2, #photo3)
    // để chúng không bị hiển thị nếu tìm kiếm được sản phẩm.
    document.getElementById("photo1").style.display = "none";
    document.getElementById("photo2").style.display = "none";
    document.getElementById("photo3").style.display = "none";

    // 2. Lọc và ẩn/hiện chỉ các khối ảnh trigger
    productTriggers.forEach((product) => {
      const nameElement = product.querySelector(".product-name");

      if (nameElement) {
        const name = nameElement.textContent.toLowerCase();

        if (name.includes(query)) {
          // Hiển thị khối ảnh trigger
          product.style.display = "block";
          found = true;
        } else {
          // Ẩn khối ảnh trigger
          product.style.display = "none";
        }
      }
    });

    // 3. Xử lý logic Ẩn/Hiện Section cha
    // Ẩn toàn bộ section trước (.product-section)
    const sections = document.querySelectorAll(".product-section");
    sections.forEach((section) => (section.style.display = "none"));

    // Chỉ hiển thị section nào có ít nhất một sản phẩm con còn hiển thị
    const visibleTriggers = document.querySelectorAll(
      ".product-item-toggle.product-card:not([style*='display: none'])"
    );

    // Nếu tìm thấy ít nhất một sản phẩm trigger, hiển thị section chứa nó
    if (visibleTriggers.length > 0) {
      visibleTriggers.forEach((product) => {
        const parentSection = product.closest(".product-section");
        if (parentSection) {
          parentSection.style.display = "block";
        }
      });
    }

    // Luôn hiển thị tiêu đề chính và video nếu có tìm kiếm được hoặc không
    document.querySelector(".video-section").style.display = "block";
    document.querySelector("h1.text-center.fw-bold").style.display = "block";

    // 4. Thông báo nếu không tìm thấy
    if (!found) {
      alert(`Không tìm thấy sản phẩm "${query}"!`);
    }
  }

  // === ĐĂNG KÝ SỰ KIỆN TÌM KIẾM ===

  if (searchButton) {
    searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      filterProducts();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        filterProducts();
      }
    });
  }
});
