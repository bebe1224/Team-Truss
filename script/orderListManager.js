
const [searchBtn] = document.querySelectorAll('.search-btn');
const [tbody] = document.querySelectorAll('.order-table tbody');
const [totalCount] = document.querySelectorAll('.total strong');
const [sortSelect] = document.querySelectorAll('.select-sort');
const [countSelect] = document.querySelectorAll('.select-count');
const [pagination] = document.querySelectorAll('.pagination');

let orders = [];
let currentPage = 1;
let pageSize = 10;

// 검색 버튼 클릭 시 데이터 생성 및 렌더링
searchBtn.addEventListener('click', () => {
    const sortValue = sortSelect.value;
    pageSize = parseInt(countSelect.value, 10);

    // 예시 데이터 (상품명과 가격을 다양하게 생성 12137)
    orders = Array.from({ length: 12137 }, (_, i) => ({
        orderDate: `2025-05-${String((i % 30) + 1).padStart(2, '0')}`,
        orderNo: `ORD${1000 + i}`,
        name: `고객${i + 1}`,
        product: `상품${(i % 10) + 1}`,  // 상품1 ~ 상품10
        totalPrice: `${(100000 + (i % 10) * 5000).toLocaleString()}원`,  // 100,000원부터 5,000원 단위로 증가
        paidPrice: `${(95000 + (i % 10) * 5000).toLocaleString()}원`,
        payMethod: '카드결제',
        payStatus: '결제완료',
        status: {
            notShipped: '○',
            shipping: '●',
            done: '-',
            cancel: '-',
            exchange: '-',
            return: '-',
            delete: '×',
        },
        memo: '빠른 배송 요청'
    }));

    // 정렬
    if (sortValue === 'regist_d') {
        orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    } else if (sortValue === 'regist_a') {
        orders.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
    } else if (sortValue === 'orderNo_a') {
        orders.sort((a, b) => a.orderNo.localeCompare(b.orderNo));
    } else if (sortValue === 'orderNo_d') {
        orders.sort((a, b) => b.orderNo.localeCompare(a.orderNo));
    } else if (sortValue === 'product_a') {
        orders.sort((a, b) => a.product.localeCompare(b.product));
    } else if (sortValue === 'product_d') {
        orders.sort((a, b) => b.product.localeCompare(a.product));
    } else if (sortValue === 'totalPrice_a') {
        orders.sort((a, b) => parseInt(a.totalPrice.replace(/,/g, ''), 10) - parseInt(b.totalPrice.replace(/,/g, ''), 10));
    } else if (sortValue === 'totalPrice_d') {
        orders.sort((a, b) => parseInt(b.totalPrice.replace(/,/g, ''), 10) - parseInt(a.totalPrice.replace(/,/g, ''), 10));
    }

    currentPage = 1;
    renderOrders(getPageData(currentPage));
    renderPagination();
    totalCount.textContent = `: ${orders.length}`;
});

// 정렬 옵션 변경 시 (기존 데이터 정렬 후 렌더링)
sortSelect.addEventListener('change', () => {
    if (orders.length === 0) return;

    currentPage = 1;
    const val = sortSelect.value;
    if (val === 'regist_d') {
        orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    } else if (val === 'regist_a') {
        orders.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
    } else if (val === 'orderNo_a') {
        orders.sort((a, b) => a.orderNo.localeCompare(b.orderNo));
    } else if (val === 'orderNo_d') {
        orders.sort((a, b) => b.orderNo.localeCompare(a.orderNo));
    } else if (val === 'product_a') {
        orders.sort((a, b) => a.product.localeCompare(b.product));
    } else if (val === 'product_d') {
        orders.sort((a, b) => b.product.localeCompare(a.product));
    } else if (val === 'totalPrice_a') {
        orders.sort((a, b) => parseInt(a.totalPrice.replace(/,/g, ''), 10) - parseInt(b.totalPrice.replace(/,/g, ''), 10));
    } else if (val === 'totalPrice_d') {
        orders.sort((a, b) => parseInt(b.totalPrice.replace(/,/g, ''), 10) - parseInt(a.totalPrice.replace(/,/g, ''), 10));
    }
    renderOrders(getPageData(currentPage));
    renderPagination();
});

// 페이지당 개수 변경 시 (페이지 크기 변경 후 렌더링)
countSelect.addEventListener('change', () => {
    if (orders.length === 0) return;

    pageSize = parseInt(countSelect.value, 10);
    currentPage = 1;
    renderOrders(getPageData(currentPage));
    renderPagination();
});

// 현재 페이지에 맞는 데이터 반환
function getPageData(page) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return orders.slice(start, end);
}

// 주문 목록 렌더링
function renderOrders(orderList) {
    tbody.innerHTML = '';

    if (orderList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="17" style="text-align:center; padding:20px; color:#777;">
                    검색된 주문내역이 없습니다.
                </td>
            </tr>`;
        return;
    }

    const fragment = document.createDocumentFragment();
    orderList.forEach(order => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><label class="custom-checkbox"><input type="checkbox" class="fChk"><span class="cbx"></span>개별</label></td>
            <td>${order.orderDate}</td>
            <td>${order.orderNo}</td>
            <td>${order.name}</td>
            <td>${order.product}</td>
            <td>${order.totalPrice}</td>
            <td>${order.paidPrice}</td>
            <td>${order.payMethod}</td>
            <td>${order.payStatus}</td>
            <td>${order.status.notShipped}</td>
            <td>${order.status.shipping}</td>
            <td>${order.status.done}</td>
            <td>${order.status.cancel}</td>
            <td>${order.status.exchange}</td>
            <td>${order.status.return}</td>
            <td>${order.status.delete}</td>
            <td>${order.memo}</td>
        `;
        fragment.appendChild(tr);
    });

    tbody.appendChild(fragment);
}

// 페이지네이션 렌더링
function renderPagination() {
    const totalPages = Math.ceil(orders.length / pageSize);
    pagination.innerHTML = '';

    // 이전 버튼
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '« 이전';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderOrders(getPageData(currentPage));
            renderPagination();
        }
    });
    pagination.appendChild(prevBtn);

    // 페이지 번호 범위 (현재 ±3)
    let startPage = Math.max(1, currentPage - 3);
    let endPage = Math.min(totalPages, currentPage + 3);

    // 첫 페이지 + ...
    if (startPage > 1) {
        const firstPageBtn = document.createElement('button');
        firstPageBtn.textContent = '1';
        firstPageBtn.addEventListener('click', () => {
            currentPage = 1;
            renderOrders(getPageData(currentPage));
            renderPagination();
        });
        pagination.appendChild(firstPageBtn);

        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.margin = '0 5px';
            pagination.appendChild(dots);
        }
    }

    // 페이지 번호 버튼들
    for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = i === currentPage ? 'active' : '';
        btn.addEventListener('click', () => {
            currentPage = i;
            renderOrders(getPageData(currentPage));
            renderPagination();
        });
        pagination.appendChild(btn);
    }

    // 마지막 페이지 + ...
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.margin = '0 5px';
            pagination.appendChild(dots);
        }

        const lastPageBtn = document.createElement('button');
        lastPageBtn.textContent = totalPages;
        lastPageBtn.addEventListener('click', () => {
            currentPage = totalPages;
            renderOrders(getPageData(currentPage));
            renderPagination();
        });
        pagination.appendChild(lastPageBtn);
    }

    // 다음 버튼
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '다음 »';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderOrders(getPageData(currentPage));
            renderPagination();
        }
    });
    pagination.appendChild(nextBtn);
}
