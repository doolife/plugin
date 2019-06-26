let obj1 = document.querySelector(".obj2_1");
let obj2 = document.querySelector(".obj2_2");
let obj3 = document.querySelector(".obj2_3");
let pageTimeline = new TimelineMax({paused:true});

const page2 = (str)=>{
    setAnimation();
    ingAnimation();
    return str;
};

const setAnimation = ()=>{
    pageTimeline
    .from(obj2, 0.8, {x:300, y:300, autoAlpha:0}, "-=0.0")
    .from(obj1, 0.8, {x:300, y:300, autoAlpha:0}, "-=0.5")
    .from(obj3, 0.8, {x:300, y:300, autoAlpha:0}, "-=0.5");
};

const ingAnimation = ()=>{
    pageTimeline.play();
};

export default page2;