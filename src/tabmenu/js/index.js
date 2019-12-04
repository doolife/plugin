import '../sass/index.scss';
import 'babel-polyfill';
import TabMenu from './page/tabmenu';

const tabmenu1 = new TabMenu({
    el:"#tab1",
    idx:3,
    tabCallback(currId, prevId){

    }
});

const tabmenu2 = new TabMenu({
    el:"#tab2",
    idx:2,
    tabCallback(currId, prevId){

    }
});

const tabmenu3 = new TabMenu({
    el:"#tab3",
    idx:1,
    tabCallback(currId, prevId){

    }
});

// tabmenu1.seletedSet = "tab1_1";


