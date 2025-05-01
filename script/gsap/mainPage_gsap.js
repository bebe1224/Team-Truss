// 현재 SplitText 인스턴스를 저장
let currentSplit = null;

// textEffect 등록
gsap.registerEffect({
    name: 'textEffect',
    defaults: {
        x: 50,
        y: 0,
        opacity: 0
    },
    effect: (target, { x, y, opacity }) => {
        // 기존 애니메이션 효과 복원
        if (currentSplit) currentSplit.revert();

        // 새 SplitText 효과 적용
        currentSplit = new SplitText(target, { type: 'chars' });
        const { chars } = currentSplit;

        return gsap.timeline()
            .from(chars, {
                opacity,
                x,
                scale: 0.9,
                stagger: 0.05,
                duration: 1.5
            });
    }
});