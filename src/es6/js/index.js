import '../sass/index.scss';
import 'babel-polyfill';
import Main from './page/main';
import Sub from './page/sub';

class Intro extends Main{
    constructor(opts){
        super(opts);
    }
}

const intro = new Intro({
    el:"#children",
    name:"eunseok"
});

console.log(intro)


// const sub = new Sub({
//     el:'#ES7',
//     idx:0
// });
//
// console.dir(main);
// console.log(sub);