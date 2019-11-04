let obj1 = document.querySelector(".obj1_1");
let obj2 = document.querySelector(".obj1_2");
let obj3 = document.querySelector(".obj1_3");
let pageTimeline = new TimelineMax({paused:true});

const init = ()=>{
    setAnimation();
};

const setAnimation = ()=>{
    pageTimeline
    .from(obj1, 0.8, {y:300, autoAlpha:0}, "+=1.0")
    .from(obj2, 0.8, {y:300, autoAlpha:0}, "-=0.5")
    .from(obj3, 0.8, {y:300, autoAlpha:0}, "-=0.5");
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