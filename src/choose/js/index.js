import '../sass/index.scss';
import Choose from './util/choose';

const choose = new Choose({
    el:"#contents",
    data:{
        tribe:0,
        job:4,
        gender:1,
    },
    complete:false
});

$(".btn__cht").on("click", ()=>{
    console.log(choose.opts.complete)
    if(choose.opts.complete) return;
    console.log(choose.curr.tribe, choose.curr.job, choose.curr.gender)
});

// 캐릭터 선택 완료시
// choose.complete = [1, 16, 0, true];