import '../sass/index.scss';
import Halfslice from './util/halfslice';

let halfslice = new Halfslice({
    el:"#slice1"
});

$(".btn__click").on("click", function(){
    halfslice.slices();
});