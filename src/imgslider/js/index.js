import 'babel-polyfill';
import '../sass/index.scss';
import Imgslider from './page/imgslider';

const imgslider1 = new Imgslider({
    el:"#slider1",
    idx:2,
    btn:true,
    page:true,
    type:"fade",
    initCallback(currId, prevId, currNum, prevNum){
        console.log(currId, prevId, currNum, prevNum, "init callback")
    },
    startCallback(currId, prevId, currNum, prevNum){
        console.log(currId, prevId, currNum, prevNum, "start callback")
    },
    endCallback(currId, prevId, currNum, prevNum){
        console.log(currId, prevId, currNum, prevNum, "end callback")
    }
});

const imgslider2 = new Imgslider({
    el:"#slider2",
    idx:1,
    btn:true,
    page:true,
    type:"slide",
    wheel:true,
    initCallback(currId, prevId, currNum, prevNum){
        console.log(currId, prevId, currNum, prevNum, "init callback")
    },
    startCallback(currId, prevId, currNum, prevNum){
        console.log(currId, prevId, currNum, prevNum, "start callback")
    },
    endCallback(currId, prevId, currNum, prevNum){
        console.log(currId, prevId, currNum, prevNum, "end callback")
    }
});

const imgslider3 = new Imgslider({
    el:"#slider3",
    idx:0,
    btn:true,
    page:true,
    type:"slide",
    direction:"y",
    startCallback(currId, prevId, currNum, prevNum){

    }
});