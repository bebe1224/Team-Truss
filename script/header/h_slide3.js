const main_menu = document.querySelectorAll('.main_menu')
const sub_menu = document.querySelectorAll('.sub_menu')

//개별 슬라이드

// .sub_menu {
//     height: 0;
//     overflow: hidden;
//     transition: 0.3s ease -in -out;

//     &.active {
//          height: 72px;
//     }
// }

main_menu.forEach((menu, index) => {
    menu.addEventListener('mouseenter', () => {
        sub_menu[index].classList.add('active');
    });
    menu.addEventListener('mouseleave', () => {
        sub_menu[index].classList.remove('active');
    });
});