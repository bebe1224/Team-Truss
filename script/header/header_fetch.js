(() => {
    const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    const fetchPath = isLocal
        ? '../../components/header.html'  // 로컬 개발 경로
        : '/Team-Truss/components/header.html';  // GitHub Pages에 배포된 절대경로

    fetch(fetchPath)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            // fetch 이후 DOM 요소에 접근
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
})();

//최적 방법: 즉시 실행 함수 (IIFE) 로 스코프 분리
//IIFE = Immediately Invoked Function Expression
//뜻: 즉시 실행 함수 표현식

// 전역 변수 안 만들고 isLocal 중복 선언 방지됨
// 코드 재사용에도 안전
// 유지보수에 유리함

//이렇게 감싸면 isLocal이 외부에 노출되지 않고, 중복 선언 오류도 방지돼.
//즉, 모듈화 없이도 변수 충돌 걱정 없는 안전한 구조지.






