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

// ===== ScrollTrigger 설정
const sect2_title_once = {
    trigger: ".sect2",
    start: "0% 20%",
    end: "100% 10%",
    markers: false, // 디버그용 마커 (선)
    once: true, // 한 번만 실행
}
const sect3_title_once = {
    trigger: ".sect3",
    start: "0% 54%",
    end: "50% 20%",
    markers: false, // 디버그용 마커 (선)
    once: true, // 한 번만 실행
}
const sect4_title_once = {
    trigger: ".sect4",
    start: "0% 20%",
    end: "100% 10%",
    markers: false, // 디버그용 마커 (선)
    once: true, // 한 번만 실행
}
const sect5_title_once = {
    trigger: ".sect5",
    start: "0% 20%",
    end: "100% 10%",
    markers: false, // 디버그용 마커 (선)
    once: true, // 한 번만 실행
}
const sect6_title_once = {
    trigger: ".sect6",
    start: "0% 20%",
    end: "100% 10%",
    markers: false, // 디버그용 마커 (선)
    once: true, // 한 번만 실행
}
const sect7_title_once = {
    trigger: ".sect7",
    start: "0% 20%",
    end: "100% 10%",
    markers: false, // 디버그용 마커 (선)
    once: true, // 한 번만 실행
}
const sect8_title_once = {
    trigger: ".sect8",
    start: "0% 20%",
    end: "100% 10%",
    markers: false, // 디버그용 마커 (선)
    once: true, // 한 번만 실행
}
const sect9_title_once = {
    trigger: ".sect9",
    start: "0% 20%",
    end: "100% 10%",
    markers: false, // 디버그용 마커 (선)
    once: true, // 한 번만 실행
}
//===== tl
const sect2_once_tl = gsap.timeline({
    scrollTrigger: sect2_title_once,
});
const sect3_once_tl = gsap.timeline({
    scrollTrigger: sect3_title_once,
});
const sect4_once_tl = gsap.timeline({
    scrollTrigger: sect4_title_once,
});
const sect5_once_tl = gsap.timeline({
    scrollTrigger: sect5_title_once,
});
const sect6_once_tl = gsap.timeline({
    scrollTrigger: sect6_title_once,
});
const sect7_once_tl = gsap.timeline({
    scrollTrigger: sect7_title_once,
});
const sect8_once_tl = gsap.timeline({
    scrollTrigger: sect8_title_once,
});
const sect9_once_tl = gsap.timeline({
    scrollTrigger: sect9_title_once,
});
//===== sect .title
ScrollTrigger.matchMedia({
    // // 0px ~ 767px
    // "(max-width: 767px)": function () {
    //     sect2_once_tl.fromTo(
    //         '.sect2  .inner > *',
    //         {
    //             autoAlpha: 0, // opacity: 0 + visibility: hidden
    //             y: 100,
    //         },
    //         {
    //             autoAlpha: 1,
    //             y: 0,
    //             duration: 2,
    //             stagger: 0.5,
    //         }
    //     );
    // },
    // 767px 이상
    "(min-width: 767px)": function () {
        sect2_once_tl.fromTo(
            '.sect2 .inner > *',
            {
                autoAlpha: 0,
                y: 100,
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.4,
            }
        );
        // sect2_once_tl.fromTo(
        //     '.sect2 .inner > *',
        //     {
        //         autoAlpha: 0,
        //         x: 100,
        //     },
        //     {
        //         autoAlpha: 1,
        //         x: 0,
        //         duration: 1,
        //     },
        //     '-=0.4' //첫 번째 애니메이션이 끝나기 0.4초 전에  시작
        // );
    }
}); //반응형포함
sect3_once_tl.fromTo(
    '.sect3 .inner > *',
    {
        autoAlpha: 0, // opacity: 0 + visibility: hidden
        y: 100,
    },
    {
        autoAlpha: 1, // opacity: 1 + visibility: visible
        y: 0,
        duration: 2,
        stagger: 0.5,
    }
);
ScrollTrigger.matchMedia({
    // 0px ~ 767px
    "(max-width: 767px)": function () {
        sect4_once_tl.fromTo(
            '.sect4 .inner .wrap > *',
            {
                autoAlpha: 0, // opacity: 0 + visibility: hidden
                y: 100,
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 2,
                stagger: 0.5,
            }
        );
    },

    // 767px 이상
    "(min-width: 767px)": function () {
        sect4_once_tl.fromTo(
            '.sect4 .inner > *',
            {
                autoAlpha: 0, // opacity: 0 + visibility: hidden
                y: 100,
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 2,
                stagger: 0.5,
            }
        );
    }
}); //반응형포함
sect5_once_tl.fromTo(
    '.sect5 .inner > *',
    {
        autoAlpha: 0, // opacity: 0 + visibility: hidden
        y: 100,
    },
    {
        autoAlpha: 1,
        y: 0,
        duration: 2,
        stagger: 0.5,
    }
);
sect6_once_tl.fromTo(
    '.sect6 .inner > *',
    {
        autoAlpha: 0, // opacity: 0 + visibility: hidden
        y: 100,
    },
    {
        autoAlpha: 1,
        y: 0,
        duration: 2,
        stagger: 0.5,
    }
);
sect7_once_tl.fromTo(
    '.sect7 .inner > *',
    {
        autoAlpha: 0, // opacity: 0 + visibility: hidden
        y: 100,
    },
    {
        autoAlpha: 1,
        y: 0,
        duration: 2,
        stagger: 0.5,
    }
);
sect8_once_tl.fromTo(
    '.sect8 .inner > *',
    {
        autoAlpha: 0, // opacity: 0 + visibility: hidden
        y: 100,
    },
    {
        autoAlpha: 1,
        y: 0,
        duration: 2,
        stagger: 0.5,
    }
);
sect9_once_tl.fromTo(
    '.sect9 .inner > *',
    {
        autoAlpha: 0, // opacity: 0 + visibility: hidden
        y: 100,
    },
    {
        autoAlpha: 1,
        y: 0,
        duration: 2,
        stagger: 0.5,
    }
);

