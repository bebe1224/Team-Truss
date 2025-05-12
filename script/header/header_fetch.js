
// <div id="header-placeholder"></div>   이곳에 불러오는 방법ㅎㅎ
fetch('../../components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
    })
    .catch(error => console.error('헤더 로드 실패:', error));
