(() => {
    const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    const dataPath = isLocal ? '../../json/mainPage.json' : '/Team-Truss/json/mainPage.json';
    const componentPath = isLocal ? '../../components/mainSwiperBox.html' : '/Team-Truss/components/mainSwiperBox.html';

    Promise.all([
        fetch(dataPath).then(res => res.json()),
        fetch(componentPath).then(res => res.text())
    ])
    .then(([categories, componentHTML]) => {
        const swiperWrapper = document.querySelector('.sect2_swiper .swiper-wrapper');
        if (!swiperWrapper) return console.error('swiper-wrapper 요소가 없습니다.');

        // Recommended 카테고리 제품 필터링
        const products = categories
            .filter(cat => cat.category === 'Recommended')
            .flatMap(cat => cat.products);

        // 기존 슬라이드 전부 제거
        swiperWrapper.innerHTML = '';

        // 제품 데이터 수만큼 슬라이드 생성 및 데이터 채우기
        products.forEach(product => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';

            let productHTML = componentHTML
                .replace(/data-name=""/g, `data-name="${product.name}"`)
                .replace(/data-price=""/g, `data-price="${product.originalPrice}"`)
                .replace(/data-image1=""/g, `data-image1="${product.images[0] || ''}"`)
                .replace(/data-image2=""/g, `data-image2="${product.images[1] || ''}"`)
                .replace(/data-image3=""/g, `data-image3="${product.images[2] || ''}"`)
                .replace(/data-image4=""/g, `data-image4="${product.images[3] || ''}"`)
                .replace(/data-image5=""/g, `data-image5="${product.images[4] || ''}"`)
                .replace(/data-image6=""/g, `data-image6="${product.images[5] || ''}"`);

            productHTML = productHTML.replace(/<img src="" alt="product_img">/, `<img src="${product.images[0] || ''}" alt="product_img">`)
                .replace(/<b class="product_name">.*?<\/b>/, `<b class="product_name">${product.name}</b>`)
                .replace(/<span>.*?<\/span>/, `<span style="font-size:12px;color:#AAAAAA;text-decoration:line-through;">${product.originalPrice}</span>`)
                .replace(/<b class="price">.*?<\/b>/, `<b class="price">${product.currentPrice}</b>`);

            slide.innerHTML = productHTML;
            swiperWrapper.appendChild(slide);

            // 클릭 이벤트 연결
            const productBox = slide.querySelector('.i_w');
            if (productBox) {
                productBox.addEventListener('click', () => {
                    const data = {
                        name: product.name,
                        originalPrice: product.originalPrice,
                        currentPrice: product.currentPrice,
                        images: product.images
                    };
                    localStorage.setItem('selectedProduct', JSON.stringify(data));
                    window.location.href = './product_detail.html';
                });
            }
        });

        // swiper 초기화 (슬라이드 삽입 완료 후)
        new Swiper(".sect2_swiper", {
            slidesPerView: 4,
            spaceBetween: 32,
            speed: 1000,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            scrollbar: {
                el: ".swiper-scrollbar",
            },
        });
    })
    .catch(err => console.error('sect2 로드 실패:', err));
})();
