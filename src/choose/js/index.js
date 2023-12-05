import '../sass/index.scss';
import Choose from './util/choose';

const choose = new Choose({
    el: "#contents",    // 선택자
    data: {
        tribe: 1,       // 부족
        job: 5,         // 직업
        gender: 1,      // 성별
    },
    complete: false,    // 완료 여부
});

// 선택시 콜백 함수
choose.on("selectCallback", (currTribe, prevJob, currJob, currGender, deviceType) => {
    console.log(currTribe, prevJob, currJob, currGender, deviceType);
});

document.querySelector(".btn__cht").addEventListener("click", () => {
    console.log(choose.opts.complete)
    if (choose.opts.complete) return;
    console.log(choose.curr.tribe, choose.curr.job, choose.curr.gender)
});

// 캐릭터 선택 완료시
// choose.complete = [1, 16, 0, true];