//메인페이지  .sect2 .inner .sect2_swiper .swiper-slide
const productElements = document.querySelectorAll(".sect2 .inner .sect2_swiper .swiper-slide");

productElements.forEach(function (el) {
    el.style.cursor = "pointer";
    el.addEventListener("click", function () {
        const data = {
            name: el.dataset.name,
            price: el.dataset.price,
            images: [
                el.dataset.image1,
                el.dataset.image2,
                el.dataset.image3,
                el.dataset.image4,
                el.dataset.image5,
                el.dataset.image6,
            ],
            displayName: el.querySelector("article b").textContent,
            displayPrice: el.querySelector("article .price").textContent,
        };

        localStorage.setItem("selectedProduct", JSON.stringify(data));
        window.location.href = "./product_detail.html";
    });
});
// 공통
const products = document.querySelectorAll(".product");

products.forEach(function (product) {
    product.style.cursor = "pointer";
    product.addEventListener("click", function () {
        const data = {
            name: product.dataset.name,  // 고유 ID 또는 이름
            price: product.dataset.price,
            images: [
                product.dataset.image1,
                product.dataset.image2,
                product.dataset.image3,
                product.dataset.image4,
                product.dataset.image5,
                product.dataset.image6,
            ],
            displayName: product.querySelector("article b").textContent,
            displayPrice: product.querySelector("article .price").textContent,
        };

        localStorage.setItem("selectedProduct", JSON.stringify(data));
        window.location.href = "./product_detail.html";
    });
});


