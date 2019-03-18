import '../sass/index.scss';
import 'babel-polyfill';
import Multipleslider from './page/multipleslider';

const multipleslider = new Multipleslider({
    el:"#multipleslider",
    auto:false,
    idx:4,
    pagination:true,
    type:"fade"
});