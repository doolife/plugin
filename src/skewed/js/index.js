import '../sass/index.scss';
import Skewed from './util/skewed';

// 인스턴스 생성
const skewed = new Skewed({
    el: '#skewed',          // 부모 선택자
    width:'100%',           // 부모 가로 크기
    height:'350px',         // 부모 세로 크기
    gap:'0px',              // 리스트 간격
    skewAmount: '50px',     // 기울어짐
    clicked:false           // true일 경우 클릭으로 동작(마우스오버 아웃 동작 안함)
});

skewed.on("enter", (curr, prev) => {         // mouseenter index
    console.log(`mouse entered ${curr} ${prev}`);
});

skewed.on("leave", (curr, prev) => {         // mouseleave index
    console.log(`mouse leave ${curr} ${prev}`);
});

skewed.on("click", (curr, prev) => {         // click index
    console.log(`clicked ${curr} ${prev}!`);
});