import '../sass/index.scss';
import Flipcounter from './page/flipcounter';

const flipcounter = new Flipcounter({
    el:"#flipcounter",
    date:new Date(2019, 4, 22, 10),
    currentDate:"",
    parts:"dd-hh-mm-ss",
});