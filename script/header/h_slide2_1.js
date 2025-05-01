const main_menu = document.querySelectorAll('.main_menu')
const sub_menu = document.querySelectorAll('.sub_menu')

//전체 페이드인 페이드 아웃

// .sub_menu {
//     opacity: 0;
//     visibility: hidden;
//     transition: 0.3s ease-in-out;
//     &.active {
//         opacity: 1;
//         visibility: visible;
//     }
// }

main_menu.forEach((menu) => {
    menu.addEventListener('mouseenter', () => {
        sub_menu.forEach(sub => {
            sub.classList.add('active');
        });
    });
    menu.addEventListener('mouseleave', () => {
        sub_menu.forEach(sub => {
            sub.classList.remove('active');
        });
    });
});