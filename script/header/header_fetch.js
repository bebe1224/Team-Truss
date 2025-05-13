
// <div id="header-placeholder"></div>   이곳에 불러오는 방법ㅎㅎ
// fetch('../../components/header.html')
//     .then(response => response.text())
//     .then(data => {
//         document.getElementById('header-placeholder').innerHTML = data;
//     })
//     .catch(error => console.error('헤더 로드 실패:', error));
const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const fetchPath = isLocal
    ? '../../components/header.html'
    : './components/header.html';

fetch(fetchPath)
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.text();
    })
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;

        // 💡 header.html이 삽입된 이후 실행해야 DOM을 찾을 수 있음
        const main_menu = document.querySelectorAll('.main_menu');
        const sub_menu = document.querySelectorAll('.sub_menu');

        main_menu.forEach((menu, index) => {
            menu.addEventListener('mouseenter', () => {
                sub_menu[index].classList.add('active');
            });
            menu.addEventListener('mouseleave', () => {
                sub_menu[index].classList.remove('active');
            });
        });
    })
    .catch(error => console.error('헤더 로드 실패:', error));




