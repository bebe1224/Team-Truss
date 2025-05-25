document.addEventListener('DOMContentLoaded', () => {
    const productData = JSON.parse(localStorage.getItem('selectedProduct'));
    if (!productData) {
        console.warn("선택한 상품 정보가 없습니다.");
        return;
    }

    const totalPriceElem = document.querySelector('.total_price');
    const quantityInput = document.getElementById('quantity');

    // productData에서 동적으로 가격 가져오기 (currentPrice)
    let basePrice = parsePrice(productData.currentPrice || productData.price || "0원");

    updateTotalPrice();

    window.increaseQuantity = function () {
        let quantity = parseInt(quantityInput.value);
        quantity++;
        quantityInput.value = quantity;
        updateTotalPrice();
    }

    window.decreaseQuantity = function () {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
            updateTotalPrice();
        }
    }

    function updateTotalPrice() {
        const quantity = parseInt(quantityInput.value);
        const total = basePrice * quantity;
        totalPriceElem.textContent = formatPrice(total) + "원";
    }

    function parsePrice(priceString) {
        return parseInt(priceString.replace(/[^\d]/g, '')) || 0;
    }

    function formatPrice(price) {
        return price.toLocaleString();
    }
});
