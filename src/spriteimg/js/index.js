import '../sass/index.scss';
import Spriteimg from './util/spriteimg';

const smoke = new Spriteimg({
    el: "#smoke",
    frame: 22,
    autoPlay: false,
    horizontal: false,
    fps: 120,
    ratio: true,
    ratioWidth: 600,
    ratioHeight: 344
});

const sprite1 = new Spriteimg({
    el: "#sprite1",
    frame: 9,
    autoPlay: false,
    horizontal: true,
    fps: 120,
    ratio: false
});

const sprite2 = new Spriteimg({
    el: "#sprite2",
    frame: 9,
    autoPlay: false,
    horizontal: true,
    fps: 60
});

const endNone = ()=>{
    document.querySelector("#smoke").style.display = "none";
};

smoke.on("end",  ()=> {
    console.log("end!!")
    endNone();
});

document.querySelector("#smoke").addEventListener("click", ()=>{
    smoke.play();
});

document.querySelector("#btn1").querySelector(".btn_play").addEventListener("click", function () {
    sprite1.play();
});

document.querySelector("#btn1").querySelector(".btn_pause").addEventListener("click", function () {
    sprite1.pause();
});

document.querySelector("#btn1").querySelector(".btn_stop").addEventListener("click", function () {
    sprite1.stop();
});

document.querySelector("#btn1").querySelector(".btn_seek").addEventListener("click", function () {
    sprite1.seek(3);
});

document.querySelector("#btn2").querySelector(".btn_play").addEventListener("click", function () {
    sprite2.play();
});

document.querySelector("#btn2").querySelector(".btn_pause").addEventListener("click", function () {
    sprite2.pause();
});

document.querySelector("#btn2").querySelector(".btn_stop").addEventListener("click", function () {
    sprite2.stop();
});

document.querySelector("#btn2").querySelector(".btn_seek").addEventListener("click", function () {
    sprite2.seek(3);
});