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

// ✅ 상위 탭 (좌측 메뉴) 클릭 처리
mainTabBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        // 모든 active 제거
        mainTabBtns.forEach(b => b.classList.remove("active"));
        mainScreens.forEach(s => s.classList.remove("active"));

        // 클릭된 요소만 active
        btn.classList.add("active");
        mainScreens[i].classList.add("active");

        // 하위 탭 초기화
        const subTabBtns = mainScreens[i].querySelectorAll(".tab_menus li");
        const subScreens = mainScreens[i].querySelectorAll(".sub_screen");

        subTabBtns.forEach(b => b.classList.remove("active"));
        subScreens.forEach(s => s.classList.remove("active"));

        if (subTabBtns.length > 0 && subScreens.length > 0) {
            subTabBtns[0].classList.add("active");
            subScreens[0].classList.add("active");
        }
    });
});

// ✅ 초기 상태: 가장 첫 번째 화면을 활성화
window.addEventListener("DOMContentLoaded", () => {
    // 첫 번째 .element와 .screen
    if (mainTabBtns.length > 0 && mainScreens.length > 0) {
        mainTabBtns[0].classList.add("active");
        mainScreens[0].classList.add("active");

        const subTabBtns = mainScreens[0].querySelectorAll(".tab_menus li");
        const subScreens = mainScreens[0].querySelectorAll(".sub_screen");

        if (subTabBtns.length > 0 && subScreens.length > 0) {
            subTabBtns[1].classList.add("active");
            subScreens[1].classList.add("active");
        }
    }
});


