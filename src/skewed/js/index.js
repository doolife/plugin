import '../sass/index.scss';
import Skewed from './util/Skewed';

const skewed = new Skewed({
    el: '.skewed',
    width:'100%',           // 부모 가로 크기
    height:'350px',         // 부모 세로 크기
    gap:'0px',              // 리스트 간격
    skewAmount: '50px',     // 기울어짐
    clicked:true           // true일 경우 클릭으로 동작(마우스오버 아웃 동작 안함)
});

skewed.on("enter", (index) => {
    console.log(`Mouse entered at index ${index}!`);
});

skewed.on("leave", (index) => {
    console.log(`Mouse left at index ${index}!`);
});

skewed.on("click", (index) => {
    console.log(`Clicked at index ${index}!`);
});