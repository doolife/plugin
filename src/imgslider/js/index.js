import 'babel-polyfill';
import '../sass/index.scss';
import Imgslider from './page/imgslider';

const imgslider1 = new Imgslider({
    el:"#slider1",
    idx:1,
    btn:true,
    page:true,
    type:"slide",
    wheel:true,
    infinity:false,
    initCallback(){

    },
    startCallback(){

    },
    endCallback(){
        console.log(this.currId, this.prevId, this.currNum, this.prevNum, "endCallback")
    },
    endPrevNext(){
        console.log(this.infCheck)
    }
});

const imgslider2 = new Imgslider({
    el:"#slider2",
    idx:2,
    btn:true,
    page:true,
    type:"fade",
    infinity:true,
    initCallback(){
        console.log(this.currId, this.prevId, this.currNum, this.prevNum, "initCallback", this)
    },
    startCallback(){

    },
    endCallback(){

    }
});

const imgslider3 = new Imgslider({
    el:"#slider3",
    idx:0,
    btn:true,
    page:true,
    type:"slide",
    direction:"y",
    infinity:true,
    initCallback(){

    },
    startCallback(){
        console.log(this.currId, this.prevId, this.currNum, this.prevNum, "startCallback")
    },
    endCallback(){

    }
});