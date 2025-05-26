const toTopButton = document.querySelector(".toTop");

// 스크롤 시 나타나고 사라지게
window.addEventListener("scroll", function () {
    if (window.scrollY > 100) { // 100px 이상 스크롤되면
        toTopButton.classList.add("active1");
    } else {
        toTopButton.classList.remove("active1");
    }
});

// 클릭하면 맨 위로 스크롤
toTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});