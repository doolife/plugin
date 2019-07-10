import '../sass/index.scss';
import Flipcounter from './page/flipcounter';

const flipcounter = new Flipcounter({
    el:"#flipcounter",
    date:new Date(2019, 9, 18, 10),     // 100시간 같이 3자리가 되면 안됨
    currentDate:"",
    parts:"dd-hh-mm-ss",
});