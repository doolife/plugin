import '../sass/index.scss';
import Flipcounter from './page/flipcounter';



/*var currentDate = new Date(window.now.year, window.now.monthOfYear-1, window.now.dayOfMonth, window.now.hourOfDay, window.now.minuteOfHour, window.now.secondOfMinute);

function initCount(){
    currentDate = new Date(currentDate.getTime()+1000);
    setTimeout(initCount, 1000);
}
initCount();*/

const flipcounter = new Flipcounter({
    el:"#flipcounter",
    date:new Date(2019, 9, 18, 10),     // 100시간 같이 3자리가 되면 안됨
    currentDate:"",         // currentDate
    parts:"dd-hh-mm-ss",
});