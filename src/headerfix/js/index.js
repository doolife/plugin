import '../sass/index.scss';
import Scrollmove from "./util/scrollmove";
import Headerfix from "./util/headerfix";
import Wheeldata from "./util/wheeldata";

let $element = $(`[data-fix="contents"]`);
let isAnimation = false;
let scrollCheck = true;

$element.on("end", ()=>{
    if(!isAnimation) return;
    console.log("end!")
    isAnimation = false;
});

$("#container").on("mousewheel DOMMouseScroll", (e)=>{
    if(isAnimation) {e.preventDefault(); return;}
    if(Wheeldata(e)>0 && scrollCheck){
        e.preventDefault();
        isAnimation = true;
        Scrollmove.move(`[data-fix="contents"]`);
    }
});

$(window).on("scroll", (e)=>{
    let scTop = $(e.currentTarget).scrollTop();
    if(scTop<$element.offset().top){
        scrollCheck = true;
    }else{
        scrollCheck = false;
    }
});

$(window).on("resize", (e)=>{
    Headerfix(window.innerHeight);
}).resize();