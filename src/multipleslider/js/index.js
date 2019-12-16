import '../sass/index.scss';
import Multipleslider from './page/multipleslider';

const multipleslider = new Multipleslider({
    el:"#multipleslider",
    auto:false,
    depth1:2,
    depth2:1,
    pagination:true,
    type:"slide",
    interval:3000
});