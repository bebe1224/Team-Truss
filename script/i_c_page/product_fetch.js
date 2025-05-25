(() => {
    const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    const fetchPath = isLocal ? '../../components/product.html' : '/Team-Truss/components/product.html';
    const dataPath = isLocal ? '../../json/Product.json' : '/Team-Truss/json/Product.json';

    Promise.all([
        fetch(fetchPath).then(res => res.text()),
        fetch(dataPath).then(res => res.json())
    ])
        .then(([templateHTML, categories]) => {
            const path = window.location.pathname;
            let currentMainCategory = '';
            if (path.includes('import.html')) currentMainCategory = 'import';
            else if (path.includes('custom.html')) currentMainCategory = 'custom';
            else if (path.includes('parts.html')) currentMainCategory = 'parts';
            else if (path.includes('brand.html')) currentMainCategory = 'brand';

            let currentCategory = document.querySelector('.tab_btn')?.dataset.category || currentMainCategory || '';


            const urlParams = new URLSearchParams(window.location.search);
            const tabParam = urlParams.get('tab');
            const categoryMap = {
                'G바겐': 'gwagen', '포르쉐': 'porsche', '스즈키짐니': 'suzukijimny',
                '코펜세로': 'gopenze', '올드카': 'oldcar', '일본차': 'japanese', '머쓸카': 'musulka',
                'DAMD커스텀': 'DAMDCUSTOM', 'KUMOI커스텀': 'KUMOICUSTOM', '커스텀스토리': 'CUSTOMSTORY', '자동차꾸미기': 'AUTOCUSTOM',
                '용품 파츠(부품)': 'parts', '악세사리': 'accessories', '시트': 'seat', '전기': 'electric',
                '썬팅': 'tinting', '네비/블랙박스': 'navi', '오디오': 'audio',
                '스투시': 'stussy', '갤러리 댑': 'gallerydab', '와펜(기타 부자재)': 'wappen', '팀트러스': 'teamtrust'
            };
            if (tabParam && categoryMap[tabParam]) {
                currentCategory = categoryMap[tabParam];
                const targetTab = document.querySelector(`.tab_btn[data-category="${currentCategory}"]`);
                if (targetTab) {
                    document.querySelectorAll('.tab_btn').forEach(tab => tab.classList.remove('active'));
                    targetTab.classList.add('active');
                }
            }

            document.querySelectorAll('.tab_btn').forEach(tab => {
                tab.addEventListener('click', () => {
                    currentCategory = tab.dataset.category;
                    document.querySelectorAll('.tab_btn').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    renderProducts(currentCategory);
                });
            });

            const headerInterval = setInterval(() => {
                const menuItems = document.querySelectorAll('#header li[data-main-category]');
                if (menuItems.length > 0) {
                    clearInterval(headerInterval);
                    menuItems.forEach(item => {
                        item.addEventListener('click', (e) => {
                            e.preventDefault();
                            const mainCategory = item.dataset.mainCategory;
                            window.location.href = `${mainCategory}.html`;
                        });
                    });
                }
            }, 100);

            function renderProducts(categoryName) {
                const categoryData = categories.find(cat => cat.category === categoryName);
                if (!categoryData) return;

                const screenNumber = getScreenNumber(categoryName);
                const screen = document.querySelector(`.screen.screen${screenNumber}`);
                if (!screen) return;

                const productsContainers = screen.querySelectorAll('.products');
                productsContainers.forEach(container => container.innerHTML = '');

                let containerIndex = 0, count = 0;
                categoryData.products.forEach(product => {
                    let html = templateHTML;

                    html = html.replace(/data-name=".*?"/, `data-name="${product.name}"`);
                    html = html.replace(/data-price=".*?"/, `data-price="${product.originalPrice}"`);

                    // 🔥 images 배열 자동 삽입
                    for (let i = 0; i < product.images.length; i++) {
                        const imgPath = product.images[i] || '';
                        html = html.replace(new RegExp(`data-image${i + 1}=".*?"`, 'g'), `data-image${i + 1}="${imgPath}"`);
                    }

                    html = html.replace(/<b class="product_name">.*?<\/b>/, `<b class="product_name">${product.name}</b>`);
                    html = html.replace(/<span>.*?<\/span>/, `<span>${product.originalPrice}</span>`);
                    html = html.replace(/<b class="price">.*?<\/b>/, `<b class="price">${product.currentPrice}</b>`);
                    html = html.replace(/<img src=".*?" alt="product_img">/, `<img src="${product.images[0]}" alt="product_img">`);

                    productsContainers[containerIndex].innerHTML += html;
                    count++;
                    if (count >= 4) {
                        count = 0;
                        containerIndex++;
                    }
                });
                attachClickEvents(screen);
            }

            function attachClickEvents(screen) {
                screen.querySelectorAll(".product").forEach(product => {
                    product.style.cursor = "pointer"; // 포인터 적용
                    product.addEventListener("click", () => {
                        const data = {
                            name: product.dataset.name,
                            originalPrice: product.dataset.price,
                            currentPrice: product.querySelector(".price")?.textContent,
                            images: [
                                product.dataset.image1, product.dataset.image2,
                                product.dataset.image3, product.dataset.image4,
                                product.dataset.image5, product.dataset.image6
                            ]
                        };
                        localStorage.setItem("selectedProduct", JSON.stringify(data));
                        window.location.href = "./product_detail.html";
                    });
                });
            }
            //각 tab_btns tab_btn 에다가  data-category="해당명" 추가해야 작동됨 
            function getScreenNumber(category) {
                const map = {
                    'gwagen': 1, 'porsche': 2, 'suzukijimny': 3, 'gopenze': 4, 'oldcar': 5, 'japanese': 6, 'musulka': 7,
                    'DAMDCUSTOM': 1, 'KUMOICUSTOM': 2, 'CUSTOMSTORY': 3, 'AUTOCUSTOM': 4,
                    'parts': 1, 'accessories': 2, 'seat': 3, 'electric': 4, 'tinting': 5, 'naviblackbox': 6,
                    'audio': 7,
                    'stussy': 1, 'gallery_dap': 2, 'wappen': 3, 'teamtrust': 4,
                };
                return map[category] || 1;
            }

            renderProducts(currentCategory);
        })
        .catch(err => console.error('로드 실패:', err));
})();
