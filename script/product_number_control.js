let productPrice = 0; // 단가 저장용 전역 변수

window.addEventListener("DOMContentLoaded", function () {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (!product) {
        alert("상품 정보가 없습니다.");
        return;
    }

    // 큰 이미지 설정
    document.querySelector(".i_w img").src = product.images[0];

    // 썸네일 이미지 설정
    const thumbImgs = document.querySelectorAll(".img_tab li img");
    for (let i = 0; i < thumbImgs.length; i++) {
        thumbImgs[i].src = product.images[i + 1];
    }

    // 썸네일 클릭 시 큰 이미지 변경
    thumbImgs.forEach(function (thumb) {
        thumb.addEventListener("click", function () {
            document.querySelector(".i_w img").src = thumb.src;
        });
    });

    // 상품 이름 및 가격 표시
    document.querySelector(".product_detail_box h2").textContent = product.displayName;
    document.querySelector(".detail .p1").innerHTML = `<span> 소비자가</span> ${product.price}원`;
    document.querySelector(".detail .p2").innerHTML = `<span> 판매가</span> ${product.displayPrice}`;
    document.querySelector(".wrap .price p").textContent = product.displayPrice;

    // 단가 숫자로 저장 (쉼표 제거)
    productPrice = parseInt(product.displayPrice.replace(/,/g, ''));

    // 초기 총 가격 표시
    updateTotalPrice();
});

// 수량 증가 함수
function increaseQuantity() {
    const qtyInput = document.getElementById("quantity");
    let qty = parseInt(qtyInput.value);
    qtyInput.value = ++qty;
    updateTotalPrice();
}

// 수량 감소 함수
function decreaseQuantity() {
    const qtyInput = document.getElementById("quantity");
    let qty = parseInt(qtyInput.value);
    if (qty > 1) {
        qtyInput.value = --qty;
        updateTotalPrice();
    }
}

// 총 가격 업데이트 함수
function updateTotalPrice() {
    const quantity = parseInt(document.getElementById("quantity").value);
    const total = quantity * productPrice;
    document.querySelector(".total_price").textContent = total.toLocaleString() + "원";
}