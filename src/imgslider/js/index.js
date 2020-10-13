import 'babel-polyfill';
import '../sass/index.scss';
import imgslider from './page/imgslider';
import videoControl from './page/video-control';

const imgslider1 = new imgslider({
    el:"#slider1",
    idx:1,
    btn:true,
    page:true,
    type:"slide",
    wheel:true,
    infinity:true,
    speed:500,
    initCallback(){
        videoControl(this.currId)
        // console.log(this.currId, this.prevId, this.currNum, this.prevNum, "initCallback", this)
    },
    startCallback(){
        videoControl(this.currId)
        // console.log(this.currId, this.prevId, this.currNum, this.prevNum, "startCallback")
    },
    endCallback(){
        // console.log(this.currId, this.prevId, this.currNum, this.prevNum, "endCallback")
    }
});

const imgslider2 = new imgslider({
    el:"#slider2",
    idx:2,
    btn:true,
    page:true,
    type:"fade",
    infinity:false,
    speed:400,
    endPrevNext(){
        console.log(this.infCheck)
    }
});

const imgslider3 = new imgslider({
    el:"#slider3",
    idx:0,
    btn:true,
    page:false,
    type:"slide",
    direction:"y",
    infinity:true,
    speed:800
});

imgslider2.on("end",()=>{
    imgslider1.reset = 3;
    console.log("end!!")
});