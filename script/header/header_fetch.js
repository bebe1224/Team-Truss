
// <div id="header-placeholder"></div>   이곳에 불러오는 방법ㅎㅎ
// fetch('../../components/header.html')
//     .then(response => response.text())
//     .then(data => {
//         document.getElementById('header-placeholder').innerHTML = data;
//     })
//     .catch(error => console.error('헤더 로드 실패:', error));
const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

const fetchPath = isLocal
    ? '../../components/header.html'  // 로컬 경로
    : 'components/header.html';       // GitHub Pages 경로

fetch(fetchPath)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
    })
    .catch(error => console.error('헤더 로드 실패:', error));


