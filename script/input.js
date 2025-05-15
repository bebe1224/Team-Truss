//주문 페이지에 전체주문조회에서 주문상태 체크박스 스크립트
const chkAll = document.getElementById('chkAll');
const checkboxes = document.querySelectorAll('input.fChk:not(#chkAll)');

chkAll.addEventListener('change', () => {
    checkboxes.forEach(chk => chk.checked = chkAll.checked);
});

// 나머지 체크박스 중 하나라도 해제하면 전체 체크박스도 해제
checkboxes.forEach(chk => {
    chk.addEventListener('change', () => {
        if (!chk.checked) {
            chkAll.checked = false;
        } else {
            // 나머지 체크박스가 모두 체크됐을 때 전체 체크박스 자동 체크
            const allChecked = Array.from(checkboxes).every(c => c.checked);
            chkAll.checked = allChecked;
        }
    });
});