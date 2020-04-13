import '../sass/index.scss';
import Movingslider from './util/movingslider';


let movingslider1 = new Movingslider({
    el:"#moving-slider1",
    idx:0,
    total:5,
    smallWidth:100,
    smallHeight:100,
    largeWidth:300,
    largeHeight:300,
    expand:2,
    speed:500,
    startCallback(){
        console.log("prev | ", this.stPrevNum, this.stPrevId, " | curr", this.stCurrNum, this.stCurrId, "start")
    },
    endCallback(){
        // console.log("prev | ", this.endPrevNum, this.endPrevId, " | curr", this.endCurrNum, this.endCurrId, "end")
    }
});

// movingslider1.reset = 3;