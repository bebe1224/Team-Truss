const main_menu = document.querySelectorAll('.main_menu');
const sub_menu = document.querySelectorAll('.sub_menu');

//전체 깜빡이는 느낌

// .sub_menu {
//     display: none;
//     li {
//         a {}
//     }
// }

main_menu.forEach((menu) => {
    menu.addEventListener('mouseenter', () => {
        sub_menu.forEach(sub => {
            sub.style.display = 'block';
        });
    });
    menu.addEventListener('mouseleave', () => {
        sub_menu.forEach(sub => {
            sub.style.display = 'none';
        });
    });
});