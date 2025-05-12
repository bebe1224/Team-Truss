const main_menu = document.querySelectorAll('.main_menu')
const sub_menu = document.querySelectorAll('.sub_menu')

//전체체 슬라이드

// .sub_menu {
//     height: 0;
//     overflow: hidden;
//     transition: 0.3s ease -in -out;

//     &.active {
//          height: 72px;
//     }
// }

main_menu.forEach((menu) => {
    menu.addEventListener('mouseenter', () => {
        sub_menu.forEach(sub => {
            sub.classList.add('active');
        })
    });
    menu.addEventListener('mouseleave', () => {
        sub_menu.forEach(sub => {
            sub.classList.remove('active');
        })
    });
});

