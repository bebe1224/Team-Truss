const displayInputs = document.getElementById("displayInputs");

function getMainOptionsHTML() {
    return `
    <label for="mainSection" class="font_weight_lighter">메인 진열 섹션</label>
    <select name="main_section" id="mainSection" class="select1">
      <option value="recommended">추천상품</option>
      <option value="bestseller">베스트셀러</option>
      <option value="new">신상품</option>
      <option value="all">전체상품</option>
    </select>
  `;
}

function getSubOptionsHTML() {
    return `
    <label for="subCategorySelect" class="font_weight_lighter">카테고리</label>
    <select id="subCategorySelect" name="sub_category" class="select1">
      <option value="import">직수입자동차</option>
      <option value="custom">커스텀튜닝</option>
      <option value="parts">용품/파츠</option>
      <option value="fashion">브랜드의류</option>
    </select>

    <label for="tabMenuSelect" class="font_weight_lighter">탭 메뉴</label>
    <select id="tabMenuSelect" name="tab_menu" class="select1"></select>
  `;
}

const tabMenus = {
    import: ["g바겐", "포르쉐", "스즈키짐니", "코펜세로", "올드카", "일본차", "머쓸카"],
    custom: ["DAMD커스텀", "KUMOI커스텀", "커스텀 스토리", "자동차꾸미기"],
    parts: ["부품", "악세서리", "시트", "전기", "썬팅", "네비/블랙박스", "오디오"],
    fashion: ["스투시", "갤러리 댑", "와펜", "팀트러스"]
};

document.querySelectorAll('input[name="display_location"]').forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.value === "main") {
            displayInputs.innerHTML = getMainOptionsHTML();
        } else if (radio.value === "sub") {
            displayInputs.innerHTML = getSubOptionsHTML();
            // 서브 카테고리 초기 탭 설정
            const subSelect = document.getElementById("subCategorySelect");
            const tabSelect = document.getElementById("tabMenuSelect");
            subSelect.addEventListener("change", () => {
                const val = subSelect.value;
                tabSelect.innerHTML = tabMenus[val].map(tab => `<option value="${tab}">${tab}</option>`).join("");
            });
            subSelect.dispatchEvent(new Event("change"));
        }
    });
});

// 초기 상태 반영
window.addEventListener("DOMContentLoaded", () => {
    const checked = document.querySelector('input[name="display_location"]:checked');
    if (checked) checked.dispatchEvent(new Event("change"));
});


