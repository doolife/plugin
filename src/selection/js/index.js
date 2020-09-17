import '../sass/index.scss';
import Selection from './util/selection';

const selection = new Selection({
    el:"#contents",
    data:{
        tribe:1,
        gender:0,
        job:18,
    },
    complete:false
});

// $(".btn__cht").on("click", ()=>{
//     console.log(selection.opts.complete)
//     if(selection.opts.complete) return;
//     console.log(selection.curr.tribe, selection.curr.gender, selection.curr.job)
// });

// 캐릭터 선택 완료시
// selection.complete = [2, 1, 31, true];