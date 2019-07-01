import '../sass/index.scss';
import Quickmenu from "./util/quickmenu";

const quickmenu = new Quickmenu({
    element:"#contents",
    position:"center",
    margin:100,
    fix:100,
    speed:600,
    quickAni:false
});