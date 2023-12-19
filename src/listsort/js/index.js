import '../sass/index.scss';
import Listsort from './util/listsort';

const listsort = new Listsort({
    el: '#list-sort',           // 부모 선택자
    width:150,                  // 자식 가로 크기
    height:150,                 // 자식 세로 크기
    padding: 100,               // 브라우저와의 간격
    delay: 50,                  // 리사이즈 딜레이
    speed: 300,                 // 리스트 스피드
    customized:true,            // true 일 경우 자식 동적으로 생성(false 일 경우 html 에서 직접 자식 태그를 만들어서 사용)
    length: 28,                 // customized:true 일 경우만 사용 자식 갯수
    modifier:'color__list'      // customized:true 일 경우만 자식 클래스 추가
});

listsort.on("click", (curr, prev)=>{
    console.log(curr, prev)
});