import '../sass/index.scss';
import Expand from './util/expand';

const expand = new Expand({
    el:"#contents",
    interval:100,
    openCallback(){
        console.log(`%c open | ${this.$target}`, "color:pink; font-size:15px;");
    },
    closeCallback(){
        console.log(`%c close | ${this.$target}`, "color:pink; font-size:15px;");
    }
});

expand.on("end",()=>{
    console.log(`%c end | ${expand.$endTarget}`, "color:pink; font-size:15px;");
});