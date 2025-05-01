const main_menu = document.querySelectorAll('.main_menu')
const sub_menu = document.querySelectorAll('.sub_menu')

//개별 페이드인 페이드 아웃

// .sub_menu {
//     opacity: 0;
//     visibility: hidden;
//     transition: 0.3s ease-in-out;
//     &.active {
//         opacity: 1;
//         visibility: visible;
//     }
//}

main_menu.forEach((menu, index) => {
    menu.addEventListener('mouseenter', () => {
        sub_menu[index].classList.add('active');
    });
    menu.addEventListener('mouseleave', () => {
        sub_menu[index].classList.remove('active');
    });
});