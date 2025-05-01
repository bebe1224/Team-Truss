const main_menu = document.querySelectorAll('.main_menu')
const sub_menu = document.querySelectorAll('.sub_menu')

//개별 깜빡이는 느낌

// .sub_menu {
//     display: none;
//     li {
//         a {}
//     }
// }

main_menu.forEach((menu, index) => {
    menu.addEventListener('mouseenter', () => {
        sub_menu[index].style.display = 'block';
    });
    menu.addEventListener('mouseleave', () => {
        sub_menu[index].style.display = 'none';
    });
});




