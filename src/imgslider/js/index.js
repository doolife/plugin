import '../sass/index.scss';
import Imgslider from './page/imgslider';

const imgslider1 = new Imgslider({
    el:"#slider1",
    idx:1,
    page:true
});

const imgslider2 = new Imgslider({
    el:"#slider2",
    idx:2,
    page:false
});