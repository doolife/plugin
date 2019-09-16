import '../sass/index.scss';
import 'babel-polyfill';
import Selectbox from './page/selectbox';

const selectbox1 = new Selectbox({
    el:"#select1",
    scHeight:400
})

const selectbox2 = new Selectbox({
    el:"#select2",
    scHeight:400
})

const selectbox3 = new Selectbox({
    el:"#select3",
    scHeight:200,
    listDisabled:true
})

for (let i = 0; i < 9; i++) {
    document.querySelector(".s1").querySelector(".select_list").innerHTML += "<li data-select='list' data-id='"+i+"'><div data-result='text'>1_"+i+"</div></li>";
}

for (let i = 0; i < 4; i++) {
    document.querySelector(".s3").querySelector(".select_list").innerHTML += "<li data-select='list' data-id='"+i+"'><div data-result='text'><span>서버</span><span>캐릭터</span>3_"+i+"</div></li>";
}
// $("body").on("click", "[data-select=list]", function(){
//     console.log("??")
// })