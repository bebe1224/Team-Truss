const boxes = document.querySelectorAll(".box.box1");

// GitHub Pages 경로 판별
const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const fetchPath = isLocal
    ? '/components/search_box.html'  // 로컬 경로
    : '/Team-Truss/components/search_box.html';  // GitHub Pages 경로 (리포지토리명 포함)

boxes.forEach(box => {
    fetch(fetchPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`컴포넌트 로드 실패: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            box.innerHTML = html;
        })
        .catch(err => {
            console.error(err);
            box.innerHTML = "<p>컴포넌트 로드 실패</p>";
        });
});
