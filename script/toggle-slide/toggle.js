$('.toggle-btn').on('click', function () {
    const $btn = $(this);
    const $panel = $btn.next('.detail_panel');
    const $label = $btn.find('span');

    $panel.slideToggle(300, function () {
        const isVisible = $panel.is(':visible');
        $label.text(isVisible ? '상품 상세 닫기' : '상품 상세 보기');
    });
});