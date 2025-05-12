const tabBtns = document.querySelectorAll(".element");
const screens = document.querySelectorAll(".screen");

tabBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        // 탭 버튼들에서 active 클래스 제거
        tabBtns.forEach(b => b.classList.remove("active"));
        screens.forEach(s => s.classList.remove("active"));

        // 클릭한 탭에 active 클래스 추가
        btn.classList.add("active");
        screens[i].classList.add("active");
    });
});


tabBtns[0].classList.add("active");
screens[0].classList.add("active");