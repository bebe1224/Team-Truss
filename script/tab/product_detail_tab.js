
    const productBox = document.querySelector(".product_box");
    const bigImage = productBox.querySelector(".i_w img");
    const thumbnails = productBox.querySelectorAll(".img_tab li img");

    thumbnails.forEach(function (thumb, index) {
        thumb.addEventListener("click", function () {
            bigImage.src = thumb.src;  // 클릭한 썸네일의 이미지를 큰 이미지로 설정
        });
    });
