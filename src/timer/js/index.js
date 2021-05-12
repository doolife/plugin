import '../sass/index.scss';
import Timer from './page/timer';

const timer = new Timer({
    el:"#timer",
    minutes:5,
    start:false
});

$(".btn_start").on("click", function(){
    timer.cleartimer(true);
    timer.countdown(5);
});

$(".btn_stop").on("click", function(){
    timer.cleartimer(false);
});

timer.on("end", function(){
    console.log("end!!!!!!!!!!!!!!!!!");
})
