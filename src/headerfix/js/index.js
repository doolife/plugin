import '../sass/index.scss';
import Scrollmove from "./util/scrollmove";
import headerfix from "./util/headerfix";
import wheeldata from "./util/wheeldata";

let isScrolling = false;
let scrollCheck = true;

const scrollmove = new Scrollmove({
    el:"#contents"
});

scrollmove.on("end", ()=>{
    console.log("end!")
    isScrolling = false;
});

$("#container").on("mousewheel DOMMouseScroll", (e)=>{
    if(!isScrolling){
        if(wheeldata(e)>0 && scrollCheck){
            e.preventDefault();
            isScrolling = true;
            scrollmove.move();

        }
    }else{
        e.preventDefault();
    }
});

$(window).on("resize", (e)=>{
    headerfix(window.innerHeight);
}).resize();

$(window).on("scroll", (e)=>{
    let scTop = $(window).scrollTop();
    if(scTop<$(window).height()){
        scrollCheck = true;
    }else{
        scrollCheck = false;
    }
});