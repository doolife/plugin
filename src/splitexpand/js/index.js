import 'babel-polyfill';
import '../sass/index.scss';
import Splitexpand from './util/splitexpand';

const splitexpand = new Splitexpand({
    el:"#contents",
    resetArr:["33%", "34%", "33%"],
    over:"50%",
    down:"25%",
    maxOver:"60%",
    minDown:"20%",
    clickEvent:false,
    speed:500,
    enterCallback(){
        // console.log(this.currIdx, "currIdx")
        // console.log(this.prevIdx, "prevIdx")
    },
    leaveCallback(){

    },
    clickCallback(){
        // console.log(this.currIdx, "currIdx")
    },
    enterCallbackMax(){
        // console.log(this.currIdx, "currIdx")
    }
});

splitexpand.on("mouseLeave", ()=>{
    console.log(splitexpand.currIdx, "mouseLeave")
});

splitexpand.on("mouseClick", ()=>{
    console.log(splitexpand.currIdx, "mouseClick")
});

splitexpand.on("mouseEnterMax", ()=>{
    // $(`.split-expand__list--wrap${splitexpand.currIdx+1}`)
    console.log(splitexpand.currIdx, "mouseEnterMax")
});