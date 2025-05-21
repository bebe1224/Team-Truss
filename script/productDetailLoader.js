window.addEventListener("DOMContentLoaded", function () {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (!product) {
        alert("상품 정보가 없습니다.");
        return;
    }

    // 큰 이미지
    document.querySelector(".i_w img").src = product.images[0];

    // 썸네일 이미지들
    const thumbImgs = document.querySelectorAll(".img_tab li img");
    for (let i = 0; i < thumbImgs.length; i++) {
        thumbImgs[i].src = product.images[i + 1];
    }

    // 상품 이름
    document.querySelector(".product_detail_box h2").textContent = product.displayName;

    // 소비자가 / 판매가
    const consumerPrice = document.querySelector(".detail .p1");
    const salePrice = document.querySelector(".detail .p2");
    const bottomPrice = document.querySelector(".wrap .price p");

    consumerPrice.innerHTML = `<span> 소비자가</span> ${product.price}원`;
    salePrice.innerHTML = `<span> 판매가</span> ${product.displayPrice}`;
    bottomPrice.textContent = product.displayPrice;
});