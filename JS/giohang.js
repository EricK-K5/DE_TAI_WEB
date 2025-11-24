const currentUser = localStorage.getItem("currentUser");
const CART_KEY = `cart_${currentUser}`;

const cart = document.querySelector(".cart");

const addCartButton = document.querySelectorAll(".add-cart-btn");
addCartButton.forEach(button => {
    button.addEventListener("click", event =>{
        const productCard = event.target.closest(".product-card");
        addToCart(productCard);
    });
});

function addToCart(productCard, quantity=0) {
    const productImgSrc = productCard.querySelector("img").src;
    const productTitle = productCard.querySelector(".product-name").textContent;
    const productPrice = productCard.querySelector(".price").textContent;

    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const existing = cart.find(item => item.title === productTitle);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            img: productImgSrc,
            title: productTitle,
            price: productPrice,
            quantity: quantity
        });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
    updateTotalPrice();
}

function renderCart() {
    const cartContent = document.querySelector(".cart-content");
    if (!cartContent) return;

    cartContent.innerHTML = "";

    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    cart.forEach(item => {
        const cartCard = document.createElement("div");
        cartCard.classList.add("cart-card");
        cartCard.innerHTML = `
            <img src="${item.img}" class="cart-img">
            <div class="cart-detail">
                <h2 class="cart-product-title">${item.title}</h2>
                <span class="cart-price">${item.price}</span>
                <div class="cart-quantity">
                    <button class="decrement">-</button>
                    <span class="num">${item.quantity}</span>
                    <button class="increment">+</button>
                </div>
            </div>
            <i class="ri-delete-bin-line cart-remove"></i>
        `;
        cartContent.appendChild(cartCard);
    });
}

const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    if (!totalPriceElement) return;

    const cartCards = document.querySelectorAll(".cart-card");
    let total = 0;

    cartCards.forEach(cartCard => {
        const priceElement = cartCard.querySelector(".cart-price");
        const quantityElement = cartCard.querySelector(".num");

        const price = parseFloat(priceElement.textContent.replace("đ", "").replace(/\./g,'')); 
        const quantity = parseInt(quantityElement.textContent);

        total += price * quantity;
    });

    totalPriceElement.textContent = `${total.toLocaleString('vi-VN')}đ`;
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateTotalPrice();

    const cartContent = document.querySelector(".cart-content");
    const buyNowButton = document.querySelector(".btn-buy");
    

    if (buyNowButton) {
        buyNowButton.addEventListener("click", () => {
            const cartCards = cartContent.querySelectorAll(".cart-card");

            if (cartCards.length === 0) {
                alert("Giỏ hàng của bạn đang trống. Hãy chọn thêm sản phẩm để mua sắm nhé");
                return;
            }

            localStorage.removeItem(CART_KEY);
            renderCart();
            updateTotalPrice();

            alert("Cảm ơn bạn đã mua sắm tại shop của chúng tôi!");
        });
    }

    if (cartContent) {
        cartContent.addEventListener("click", event => {
            const cartCard = event.target.closest(".cart-card");
            if(!cartCard) return;

            const numberElement = cartCard.querySelector(".num");
            const decrementButton = cartCard.querySelector(".decrement");
            let quantity = parseInt(numberElement.textContent);
            const title = cartCard.querySelector(".cart-product-title").textContent;

            let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
            const cartItem = cart.find(item => item.title === title);

            if(event.target.classList.contains("decrement") && quantity > 1){
                quantity--;
                if(quantity === 1) decrementButton.style.color = "#999";

            } else if(event.target.classList.contains("increment")){
                quantity++;
                decrementButton.style.color = "#333";

            } else if(event.target.classList.contains("cart-remove")){
                cart = cart.filter(item => item.title !== title);
                localStorage.setItem(CART_KEY, JSON.stringify(cart));
                cartCard.remove();
                updateTotalPrice(); 
                return;
            }

            numberElement.textContent = quantity;

            if(cartItem){
                cartItem.quantity = quantity;
                localStorage.setItem(CART_KEY, JSON.stringify(cart));
            }

            updateTotalPrice();
        });
    }
});
