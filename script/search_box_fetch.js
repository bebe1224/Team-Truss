(function () {
    const boxes = document.querySelectorAll(".box.box1");

    const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    const fetchPath = isLocal
        ? '/components/search_box.html'
        : '/Team-Truss/components/search_box.html';

    boxes.forEach(box => {
        fetch(fetchPath)
            .then(response => {
                if (!response.ok) throw new Error(`컴포넌트 로드 실패: ${response.status}`);
                return response.text();
            })
            .then(html => {
                box.innerHTML = html;

                // ✅ box 안에서만 체크박스 로직 적용
                initSearchBoxEvents(box);
            })
            .catch(err => {
                console.error(err);
                box.innerHTML = "<p>컴포넌트 로드 실패</p>";
            });
    });
    
    //input.js 이벤트 여기다 넣어야 페치요청해도 기능됨
    function initSearchBoxEvents(container) {
        const chkAll = container.querySelector('#chkAll');
        const checkboxes = container.querySelectorAll('input.fChk:not(#chkAll)');

        if (!chkAll || checkboxes.length === 0) return;

        chkAll.addEventListener('change', () => {
            checkboxes.forEach(chk => chk.checked = chkAll.checked);
        });

        checkboxes.forEach(chk => {
            chk.addEventListener('change', () => {
                if (!chk.checked) {
                    chkAll.checked = false;
                } else {
                    const allChecked = Array.from(checkboxes).every(c => c.checked);
                    chkAll.checked = allChecked;
                }
            });
        });
    }
})();



