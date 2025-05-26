// Swiper 생성  sect1
const swiper = new Swiper(".sect1_swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    speed: 1000,
    effect: "fade",
    fadeEffect: { crossFade: true },
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});

// 슬라이드 변경 완료 시 텍스트 애니메이션
swiper.on("slideChangeTransitionStart", () => {
    const activeSlide = swiper.slides[swiper.activeIndkex];
    const text = activeSlide.querySelector(".text");
    if (text) {
        gsap.effects.textEffect(text);
    }
});

// 처음 로딩 시 1번 슬라이드에도 적용
window.addEventListener("load", () => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const text = activeSlide.querySelector(".text");
    if (text) {
        gsap.effects.textEffect(text);
    }
});


//======================= fetch 하는곳에 넣어서 주석처리
// // Swiper 생성  sect2
// const swiper2 = new Swiper(".sect2_swiper", {
//     slidesPerView: 4,
//     spaceBetween: 32,
//     // effect: "coverflow",
//     speed: 1000,
//     autoplay: {
//         delay: 3500,
//         disableOnInteraction: false,
//     },
//     scrollbar: {
//         el: ".swiper-scrollbar",
//         // hide: true,
//     },
// });