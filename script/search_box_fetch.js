const boxes = document.querySelectorAll(".box.box1");

boxes.forEach(box => {
    fetch("/components/search_box.html")
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