import '../sass/index.scss';
import Imgslider from './page/imgslider';

const imgslider1 = new Imgslider({
    el:"#slider1",
    idx:2,
    btn:true,
    page:true
});

const imgslider2 = new Imgslider({
    el:"#slider2",
    idx:1,
    btn:false,
    page:true
});