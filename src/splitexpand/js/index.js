import 'babel-polyfill';
import '../sass/index.scss';
import Splitexpand from './util/splitexpand';

const splitexpand = new Splitexpand({
    el:"#contents",
    resetArr:["33%", "34%", "33%"],
    over:"50%",
    down:"25%",
    speed:500,
    enterCallback(){
        console.log(this.currIdx, "currIdx")
        console.log(this.prevIdx, "prevIdx")
    },
    leaveCallback(){

    }
});

splitexpand.on("mouseLeave", ()=>{
    console.log(splitexpand.prevIdx, "mouseLeave")
});