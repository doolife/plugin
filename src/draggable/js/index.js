import '../sass/index.scss';
import Draggable from './util/draggable';


let draggable1 = new Draggable({
    el: "#draggable1",
    pos: "rightBottom", // 위치 지정 center, leftTop, rightTop, leftBottom, rightBottom
});

let draggable2 = new Draggable({
    el: "#draggable2",
    pos: "rightBottom",
});

draggable1.mouseupCallback(() => {
    console.log("Mouse up!");
});

draggable1.mouseleaveCallback(() => {
    console.log("Mouse leave!");
});

draggable1.mouseenterCallback(() => {
    console.log("Mouse entered!");
});