import '../sass/index.scss';
import Halfslice from './util/halfslice';

let halfslice = new Halfslice({
    el:"#slice1"
});

$(".btn__slice").on("click", function(){
    halfslice.slices();
});

$(".btn__reset").on("click", function(){
    halfslice.reset();
});

$(".btn__reset--slice").on("click", function(){
    halfslice.reset();
    halfslice.slices();
});