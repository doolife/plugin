import '../sass/index.scss';
import ChtSelect from './util/cht-select';

const chtSelect = new ChtSelect({
    el: "#cht-select",      // 부모 선택자
    scale: 1.2,             // 현재 엘리먼트 크기
    leftMove: -65,          // 현재 엘리먼트 기준 좌측 엘리먼트들 좌측 이동
    rightMove: 65           // 현재 엘리먼트 기준 우측 엘리먼트들 우측 이동
});

chtSelect.on("click", (index)=>{
    console.log("click", index)
});