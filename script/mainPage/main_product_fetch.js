(() => {
    const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    const fetchPath = isLocal ? '../../components/product.html' : '/Team-Truss/components/product.html';
    const dataPath = isLocal ? '../../json/mainPage.json' : '/Team-Truss/json/mainPage.json';

    const maxPerContainer = 4;

    Promise.all([
        fetch(fetchPath).then(res => res.text()),
        fetch(dataPath).then(res => res.json())
    ])
        .then(([templateHTML, categories]) => {

            let currentCategory = 'bestseller1';

            const activeTabBtn = document.querySelector('.tab_btn.active');
            if (activeTabBtn && activeTabBtn.dataset.category) {
                currentCategory = activeTabBtn.dataset.category;
            }

            document.querySelectorAll('.sect4 .tab_btn').forEach(tab => {
                tab.addEventListener('click', () => {
                    currentCategory = tab.dataset.category;

                    document.querySelectorAll('.sect4 .tab_btn').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    document.querySelectorAll('.sect4 .screen').forEach((screen, i) => {
                        const screenNum = i + 1;
                        screen.classList.toggle('active', currentCategory === `bestseller${screenNum}`);
                    });

                    renderTabProducts(currentCategory);
                });
            });

            function renderTabProducts(categoryName) {
                const filteredProducts = categories
                    .filter(cat => cat.category === categoryName)
                    .flatMap(cat => cat.products);

                if (filteredProducts.length === 0) {
                    console.warn(`카테고리 ${categoryName} 데이터가 없습니다.`);
                    clearProducts('.sect4 .screen.active .products');
                    return;
                }

                const activeScreen = document.querySelector('.sect4 .screen.active');
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

                    productsContainers[containerIndex].insertAdjacentHTML('beforeend', productHTML);
                    count++;
                });

                attachClickEvents(productsContainers);
            }

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

                    containers[containerIndex].insertAdjacentHTML('beforeend', productHTML);
                    count++;
                });

                attachClickEvents(containers);
            }

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

            function clearProducts(containers) {
                if (NodeList.prototype.isPrototypeOf(containers) || Array.isArray(containers)) {
                    containers.forEach(c => c.innerHTML = '');
                } else if (containers instanceof HTMLElement) {
                    containers.innerHTML = '';
                }
            }

            if (!document.querySelector('.sect4 .tab_btn.active')) {
                const firstTab = document.querySelector('.sect4 .tab_btn');
                if (firstTab) firstTab.classList.add('active');
            }
            document.querySelectorAll('.sect4 .screen').forEach((screen, i) => {
                screen.classList.toggle('active', currentCategory === `bestseller${i + 1}`);
            });

            renderTabProducts(currentCategory);
            renderFixedSection('.sect6', 'NewProduct');
            renderFixedSection('.sect9', 'AllProduct');

        })
        .catch(err => console.error('로드 실패:', err));
})();
