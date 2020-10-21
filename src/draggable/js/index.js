import '../sass/index.scss';
import Draggable from './util/draggable';


let draggable = new Draggable({
    el:"#draggable",
    pos:"rightBottom"   // center, leftTop, rightTop, leftBottom, rightBottom
});