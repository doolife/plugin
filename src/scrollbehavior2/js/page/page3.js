let obj1 = document.querySelector(".obj3_1");
let obj2 = document.querySelector(".obj3_2");
let obj3 = document.querySelector(".obj3_3");
let pageTimeline = new TimelineMax({paused:true});

const init = ()=>{
    setAnimation();
};

const setAnimation = ()=>{
    pageTimeline
    .fromTo([obj1], 0.8, {y:300, autoAlpha:0}, {y:0, autoAlpha:1}, "+=1.0")
    .from(obj2, 0.8, {x:225, autoAlpha:0}, "-=0.0")
    .from(obj3, 0.8, {x:-225, autoAlpha:0}, "-=0.8");
};

const palyAnimation = ()=>{
    pageTimeline.seek(0);
    pageTimeline.play();
};

init();

export default {
    init,
    palyAnimation
};