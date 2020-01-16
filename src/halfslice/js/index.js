import '../sass/index.scss';
import Halfslice from './util/halfslice';

let halfslices = new Halfslice({
    el:"#slice1"
});

$(".btn__click").on("click", function(){
    halfslices.slices();
});