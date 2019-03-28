import '../sass/index.scss';
import 'babel-polyfill';
import Bluemarble from './page/game';

const bluemarble = new Bluemarble({
    el:'#bluemarble',
    total:5,
    chtPos:[
        {"x":0, "y":0},
        {"x":50, "y":0},
        {"x":0, "y":30},
        {"x":50, "y":30},
        {"x":25, "y":15}
    ]
});