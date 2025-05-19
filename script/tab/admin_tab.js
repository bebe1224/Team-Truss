const mainTabBtns = document.querySelectorAll(".element");
const mainScreens = document.querySelectorAll(".screen");

// ✅ 각 screen마다 내부 탭 연결
mainScreens.forEach(screen => {
    const subTabBtns = screen.querySelectorAll(".tab_menus li");
    const subScreens = screen.querySelectorAll(".sub_screen");

    subTabBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            subTabBtns.forEach(b => b.classList.remove("active"));
            subScreens.forEach(s => s.classList.remove("active"));

            btn.classList.add("active");
            subScreens[i].classList.add("active");
        });
    });
});

// ✅ 상위 탭 클릭 시 새로고침되게 (쿼리스트링에 탭 인덱스 저장)
mainTabBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        // 현재 URL에 탭 인덱스 추가 후 새로고침
        const url = new URL(window.location.href);
        url.searchParams.set("tab", i);
        window.location.href = url.toString();
    });
});

// ✅ 초기 상태 설정 (쿼리스트링 기반으로 탭 복원)
window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabIndex = parseInt(urlParams.get("tab")) || 0;

    if (mainTabBtns[tabIndex] && mainScreens[tabIndex]) {
        mainTabBtns[tabIndex].classList.add("active");
        mainScreens[tabIndex].classList.add("active");

        const subTabBtns = mainScreens[tabIndex].querySelectorAll(".tab_menus li");
        const subScreens = mainScreens[tabIndex].querySelectorAll(".sub_screen");

        if (subTabBtns.length > 0 && subScreens.length > 0) {
            subTabBtns[2].classList.add("active");
            subScreens[2].classList.add("active");
        }
    }
});

