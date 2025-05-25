document.addEventListener('DOMContentLoaded', () => {
    const productData = JSON.parse(localStorage.getItem('selectedProduct'));
    if (!productData) {
        console.warn("선택한 상품 정보가 없습니다.");
        return;
    }

    // 상품 이름 넣기
    const productName = document.querySelector('.product_detail_box h2');
    if (productName) {
        productName.textContent = productData.name || "상품명 없음";
    }

    // 소비자가 가격 넣기
    const originalPriceElem = document.querySelector('.product_detail_box .p1');
    if (originalPriceElem) {
        originalPriceElem.innerHTML = `<span>소비자가</span> ${productData.originalPrice || "가격 정보 없음"}`;
    }

    // 판매가 가격 넣기
    const currentPriceElem = document.querySelector('.product_detail_box .p2');
    if (currentPriceElem) {
        const price = productData.currentPrice || productData.price || "가격 정보 없음";
        currentPriceElem.innerHTML = `<span>판매가</span> ${price}`;
    }

    // 큰 이미지 설정
    const bigImage = document.querySelector('.product_box .i_w img');
    if (bigImage && productData.images && productData.images.length > 0) {
        bigImage.src = productData.images[0];
    }

    // 썸네일 이미지 설정
    const thumbnails = document.querySelectorAll('.product_box .img_tab li img');
    thumbnails.forEach((thumbnail, index) => {
        // 썸네일에 이미지 넣기: images[1]부터 사용 하다가 생각해보니 그럴필요없음
        const imageSrc = productData.images[index + 0];
        if (imageSrc) {
            thumbnail.src = imageSrc;
        } else {
            thumbnail.src = '../imgs/default-thumbnail.jpg'; // 기본 이미지 (원하는 경로로 수정)
        }
    });

});
