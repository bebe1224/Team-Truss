const tabBtns = document.querySelectorAll(".tab_btn");
const screens = document.querySelectorAll(".screen");

// URL에서 tab 파라미터 읽기
const urlParams = new URLSearchParams(window.location.search);
const activeTab = urlParams.get("tab");

// 탭 이름과 버튼 텍스트 비교해서 일치하는 탭 활성화
let found = false;
tabBtns.forEach((btn, i) => {
    if (btn.textContent.trim() === activeTab) {
        btn.classList.add("active");
        screens[i].classList.add("active");
        found = true;
    }
});

// 없으면 기본 첫 번째 탭 활성화
if (!found && tabBtns.length > 0 && screens.length > 0) {
    tabBtns[0].classList.add("active");
    screens[0].classList.add("active");
}

// 클릭 시 동작
tabBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        screens.forEach(s => s.classList.remove("active"));

        btn.classList.add("active");
        screens[i].classList.add("active");
    });
});









