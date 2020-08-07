import '../sass/index.scss';
import Selectbox from './page/selectbox';

const selectbox1 = new Selectbox({
    el:"#select1",
    height:400,
    listDisabled:false
})

const selectbox2 = new Selectbox({
    el:"#select2",
    height:300,
    listDisabled:false
})

const selectbox3 = new Selectbox({
    el:"#select3",
    height:200,
    listDisabled:true
})

for (let i = 0; i < 9; i++) {
    document.querySelector(".s1").querySelector(".select-box__menu").innerHTML += "<li data-select='list' data-id='"+i+"'><div data-result='text'><i>1_"+i+"</i></div></li>";
}

for (let i = 0; i < 4; i++) {
    document.querySelector(".s3").querySelector(".select-box__menu").innerHTML += "<li data-select='list' data-id='"+i+"'><div data-result='text'><i>서버</i><i>캐릭터</i>3_"+i+"</div></li>";
}
$("body").on("click", "[data-select=list]", function(){
    console.log("body!!")
});