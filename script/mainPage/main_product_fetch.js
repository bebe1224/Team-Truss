
// (() => {
//     const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
//     const fetchPath = isLocal ? '../../components/product.html' : '/Team-Truss/components/Product.html';
//     const dataPath = isLocal ? '../../json/mainPage.json' : '/Team-Truss/json/mainPage.json';

//     const maxPerContainer = 4;

//     // 탭 버튼 data-category 값 (JSON 카테고리명)
//     // 각 카테고리명에 대응하는 화면 클래스명 매핑
//     const tabToScreenMap = {
//         'bestseller1': 'screen1',
//         'bestseller2': 'screen2',
//         'bestseller3': 'screen3',
//         'bestseller4': 'screen4',
//     };

//     Promise.all([
//         fetch(fetchPath).then(res => res.text()),
//         fetch(dataPath).then(res => res.json())
//     ])
//         .then(([templateHTML, categories]) => {
//             let currentCategory = 'bestseller1';

//             // 초기 active 탭 셋팅
//             const activeTabBtn = document.querySelector('.tab_btn.active');
//             if (activeTabBtn && activeTabBtn.dataset.category) {
//                 currentCategory = activeTabBtn.dataset.category;
//             }

//             // 탭 클릭 이벤트 설정
//             document.querySelectorAll('.tab_btn').forEach(tab => {
//                 tab.addEventListener('click', () => {
//                     currentCategory = tab.dataset.category;

//                     // 탭 active 클래스 토글
//                     document.querySelectorAll('.tab_btn').forEach(t => t.classList.remove('active'));
//                     tab.classList.add('active');

//                     // 화면 전환 (screen 활성화 토글)
//                     const allScreens = document.querySelectorAll('.screen');
//                     allScreens.forEach(screen => screen.classList.remove('active'));
//                     const screenClass = tabToScreenMap[currentCategory];
//                     if (screenClass) {
//                         const activeScreen = document.querySelector(`.screen.${screenClass}`);
//                         if (activeScreen) activeScreen.classList.add('active');
//                     }

//                     renderProducts(currentCategory);
//                 });
//             });

//             // 초기 화면 표시 및 제품 렌더링
//             const initialScreenClass = tabToScreenMap[currentCategory];
//             if (initialScreenClass) {
//                 const initialScreen = document.querySelector(`.screen.${initialScreenClass}`);
//                 if (initialScreen) initialScreen.classList.add('active');
//             }
//             renderProducts(currentCategory);

//             function renderProducts(categoryName) {
//                 // 현재 화면 찾기
//                 const screenClass = tabToScreenMap[categoryName];
//                 if (!screenClass) {
//                     console.warn(`화면 클래스가 매핑되지 않았습니다: ${categoryName}`);
//                     return;
//                 }
//                 const activeScreen = document.querySelector(`.screen.${screenClass}`);
//                 if (!activeScreen) {
//                     console.warn(`화면 요소가 없습니다: .screen.${screenClass}`);
//                     return;
//                 }

//                 // 해당 카테고리 상품 필터링
//                 const filteredProducts = categories
//                     .filter(cat => cat.category === categoryName)
//                     .flatMap(cat => cat.products);

//                 if (filteredProducts.length === 0) {
//                     console.warn(`카테고리 ${categoryName} 데이터가 없습니다.`);
//                     // 비어있으면 화면 안 .products 초기화
//                     activeScreen.querySelectorAll('.products').forEach(container => container.innerHTML = '');
//                     return;
//                 }

//                 const productsContainers = activeScreen.querySelectorAll('.products');
//                 if (productsContainers.length === 0) {
//                     console.warn('products 컨테이너가 없습니다.');
//                     return;
//                 }
//                 productsContainers.forEach(container => container.innerHTML = '');

//                 let containerIndex = 0;
//                 let count = 0;

//                 filteredProducts.forEach(product => {
//                     if (count >= maxPerContainer) {
//                         count = 0;
//                         containerIndex++;
//                     }
//                     if (containerIndex >= productsContainers.length) {
//                         console.warn('products 컨테이너가 부족합니다.');
//                         return;
//                     }

//                     let productHTML = templateHTML;
//                     productHTML = productHTML.replace(/data-name=".*?"/g, `data-name="${product.name}"`);
//                     productHTML = productHTML.replace(/data-price=".*?"/g, `data-price="${product.originalPrice}"`);

//                     for (let i = 0; i < 6; i++) {
//                         const imgPath = product.images[i] || '';
//                         productHTML = productHTML.replace(new RegExp(`data-image${i + 1}=".*?"`, 'g'), `data-image${i + 1}="${imgPath}"`);
//                     }

//                     productHTML = productHTML.replace(/<b class="product_name">.*?<\/b>/g, `<b class="product_name">${product.name}</b>`);
//                     productHTML = productHTML.replace(/<span>.*?<\/span>/g, `<span>${product.originalPrice}</span>`);
//                     productHTML = productHTML.replace(/<b class="price">.*?<\/b>/g, `<b class="price">${product.currentPrice}</b>`);
//                     productHTML = productHTML.replace(/<img src=".*?" alt="product_img">/g, `<img src="${product.images[0]}" alt="product_img">`);

//                     productsContainers[containerIndex].innerHTML += productHTML;
//                     count++;
//                 });

//                 attachClickEvents(productsContainers);
//             }

//             function attachClickEvents(productsContainers) {
//                 productsContainers.forEach(screen => {
//                     screen.querySelectorAll(".product").forEach(product => {
//                         product.style.cursor = "pointer";
//                         product.addEventListener("click", () => {
//                             const data = {
//                                 name: product.dataset.name,
//                                 originalPrice: product.dataset.price,
//                                 currentPrice: product.querySelector(".price")?.textContent || '',
//                                 images: [
//                                     product.dataset.image1, product.dataset.image2,
//                                     product.dataset.image3, product.dataset.image4,
//                                     product.dataset.image5, product.dataset.image6
//                                 ].filter(Boolean)
//                             };
//                             localStorage.setItem("selectedProduct", JSON.stringify(data));
//                             window.location.href = "./product_detail.html";
//                         });
//                     });
//                 });
//             }

//         })
//         .catch(err => console.error('로드 실패:', err));
// })();


(() => {
    const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    const fetchPath = isLocal ? '../../components/product.html' : '/Team-Truss/components/Product.html';
    const dataPath = isLocal ? '../../json/mainPage.json' : '/Team-Truss/json/mainPage.json';

    const maxPerContainer = 4;

    Promise.all([
        fetch(fetchPath).then(res => res.text()),
        fetch(dataPath).then(res => res.json())
    ])
        .then(([templateHTML, categories]) => {

            // 탭 기본 카테고리
            let currentCategory = 'bestseller1';

            // 초기 활성 탭 버튼 찾기
            const activeTabBtn = document.querySelector('.tab_btn.active');
            if (activeTabBtn && activeTabBtn.dataset.category) {
                currentCategory = activeTabBtn.dataset.category;
            }

            // 탭 클릭 이벤트
            document.querySelectorAll('.sect4 .tab_btn').forEach(tab => {
                tab.addEventListener('click', () => {
                    currentCategory = tab.dataset.category;

                    // 탭 버튼 활성화 토글
                    document.querySelectorAll('.sect4 .tab_btn').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    // 화면 스크린 전환 (.screen1, screen2, ...)
                    document.querySelectorAll('.sect4 .screen').forEach((screen, i) => {
                        // screen 클래스 숫자를 카테고리 숫자와 매칭
                        const screenNum = i + 1;
                        screen.classList.toggle('active', currentCategory === `bestseller${screenNum}`);
                    });

                    renderTabProducts(currentCategory);
                });
            });

            // 탭 영역(.sect4) 제품 렌더 함수
            function renderTabProducts(categoryName) {
                const filteredProducts = categories
                    .filter(cat => cat.category === categoryName)
                    .flatMap(cat => cat.products);

                if (filteredProducts.length === 0) {
                    console.warn(`카테고리 ${categoryName} 데이터가 없습니다.`);
                    clearProducts('.sect4 .screen.active .products');
                    return;
                }

                const activeScreen = document.querySelector(`.sect4 .screen.active`);
                if (!activeScreen) return;

                const productsContainers = activeScreen.querySelectorAll('.products');
                clearProducts(productsContainers);

                let containerIndex = 0;
                let count = 0;

                filteredProducts.forEach(product => {
                    if (count >= maxPerContainer) {
                        count = 0;
                        containerIndex++;
                    }
                    if (containerIndex >= productsContainers.length) return;

                    let productHTML = templateHTML;
                    productHTML = productHTML.replace(/data-name=".*?"/g, `data-name="${product.name}"`);
                    productHTML = productHTML.replace(/data-price=".*?"/g, `data-price="${product.originalPrice}"`);

                    for (let i = 0; i < 6; i++) {
                        const imgPath = product.images[i] || '';
                        productHTML = productHTML.replace(new RegExp(`data-image${i + 1}=".*?"`, 'g'), `data-image${i + 1}="${imgPath}"`);
                    }

                    productHTML = productHTML.replace(/<b class="product_name">.*?<\/b>/g, `<b class="product_name">${product.name}</b>`);
                    productHTML = productHTML.replace(/<span>.*?<\/span>/g, `<span>${product.originalPrice}</span>`);
                    productHTML = productHTML.replace(/<b class="price">.*?<\/b>/g, `<b class="price">${product.currentPrice}</b>`);
                    productHTML = productHTML.replace(/<img src=".*?" alt="product_img">/g, `<img src="${product.images[0]}" alt="product_img">`);

                    productsContainers[containerIndex].innerHTML += productHTML;
                    count++;
                });

                attachClickEvents(productsContainers);
            }

            // 탭 없는 고정 영역 렌더 함수
            function renderFixedSection(sectionClass, categoryName) {
                const section = document.querySelector(sectionClass);
                if (!section) return;

                const productsWrap = section.querySelector('.products_wrap');
                if (!productsWrap) return;

                const containers = productsWrap.querySelectorAll('.products');
                clearProducts(containers);

                const filteredProducts = categories
                    .filter(cat => cat.category === categoryName)
                    .flatMap(cat => cat.products);

                if (filteredProducts.length === 0) {
                    console.warn(`${categoryName} 카테고리 데이터가 없습니다.`);
                    return;
                }

                let containerIndex = 0;
                let count = 0;

                filteredProducts.forEach(product => {
                    if (count >= maxPerContainer) {
                        count = 0;
                        containerIndex++;
                    }
                    if (containerIndex >= containers.length) return;

                    let productHTML = templateHTML;
                    productHTML = productHTML.replace(/data-name=".*?"/g, `data-name="${product.name}"`);
                    productHTML = productHTML.replace(/data-price=".*?"/g, `data-price="${product.originalPrice}"`);

                    for (let i = 0; i < 6; i++) {
                        const imgPath = product.images[i] || '';
                        productHTML = productHTML.replace(new RegExp(`data-image${i + 1}=".*?"`, 'g'), `data-image${i + 1}="${imgPath}"`);
                    }

                    productHTML = productHTML.replace(/<b class="product_name">.*?<\/b>/g, `<b class="product_name">${product.name}</b>`);
                    productHTML = productHTML.replace(/<span>.*?<\/span>/g, `<span>${product.originalPrice}</span>`);
                    productHTML = productHTML.replace(/<b class="price">.*?<\/b>/g, `<b class="price">${product.currentPrice}</b>`);
                    productHTML = productHTML.replace(/<img src=".*?" alt="product_img">/g, `<img src="${product.images[0]}" alt="product_img">`);

                    containers[containerIndex].innerHTML += productHTML;
                    count++;
                });

                attachClickEvents(containers);
            }

            // 제품 클릭 이벤트 부착
            function attachClickEvents(productsContainers) {
                productsContainers.forEach(container => {
                    container.querySelectorAll('.product').forEach(product => {
                        product.style.cursor = 'pointer';
                        product.addEventListener('click', () => {
                            const data = {
                                name: product.dataset.name,
                                originalPrice: product.dataset.price,
                                currentPrice: product.querySelector('.price')?.textContent || '',
                                images: [
                                    product.dataset.image1, product.dataset.image2,
                                    product.dataset.image3, product.dataset.image4,
                                    product.dataset.image5, product.dataset.image6
                                ].filter(Boolean)
                            };
                            localStorage.setItem('selectedProduct', JSON.stringify(data));
                            window.location.href = './product_detail.html';
                        });
                    });
                });
            }

            // products 컨테이너 비우기 헬퍼
            function clearProducts(containers) {
                if (NodeList.prototype.isPrototypeOf(containers) || Array.isArray(containers)) {
                    containers.forEach(c => c.innerHTML = '');
                } else if (containers instanceof HTMLElement) {
                    containers.innerHTML = '';
                }
            }

            // 초기 화면 세팅

            // 탭 기본 화면 세팅 (첫 번째 탭 활성화 및 화면 표시)
            if (!document.querySelector('.sect4 .tab_btn.active')) {
                const firstTab = document.querySelector('.sect4 .tab_btn');
                if (firstTab) firstTab.classList.add('active');
            }
            document.querySelectorAll('.sect4 .screen').forEach((screen, i) => {
                screen.classList.toggle('active', currentCategory === `bestseller${i + 1}`);
            });

            renderTabProducts(currentCategory);
            renderFixedSection('.sect6', 'NewProduct');  // 신상품
            renderFixedSection('.sect9', 'AllProduct');  // 전체상품

        })
        .catch(err => console.error('로드 실패:', err));
})();
