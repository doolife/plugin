import '../sass/index.scss';
import Timer from './page/timer';

const timer = new Timer({
    el: "#timer",
    time: "01:00:05",
    start: false
});

timer.on("end", function () {
    console.log("종료!!!!!!!!!!!!!!!!!");
});

document.querySelector(".btn_start").addEventListener("click", function () {
    timer.start();
});

document.querySelector(".btn_pause").addEventListener("click", function () {
    timer.pause();
});

document.querySelector(".btn_stop").addEventListener("click", function () {
    timer.stop();
});

document.querySelector(".btn_restart").addEventListener("click", function () {
    timer.restart();
});
