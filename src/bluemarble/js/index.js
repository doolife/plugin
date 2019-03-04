import '../sass/index.scss';
import 'babel-polyfill';
import Bluemarble from './page/game';

let bluemarble = new Bluemarble({
    el:'#bluemarble',
    total:5
});