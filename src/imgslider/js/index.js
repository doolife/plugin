import '../sass/index.scss';
import Imgslider from './page/imgslider';

const imgslider1 = new Imgslider({
    el:"#slider1",
    idx:2,
    btn:true,
    page:true,
    type:"fade"
});

const imgslider2 = new Imgslider({
    el:"#slider2",
    idx:1,
    btn:true,
    page:true,
    type:"slide"
});

const imgslider3 = new Imgslider({
    el:"#slider3",
    idx:0,
    btn:false,
    page:true,
    type:"slide"
});