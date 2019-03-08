import '../sass/index.scss';
import 'babel-polyfill';
import TabMenu from './page/tabmenu';

const tabmenu1 = new TabMenu({
    el:"#tab1",
    idx:3
});

const tabmenu2 = new TabMenu({
    el:"#tab2",
    idx:2
});

const tabmenu3 = new TabMenu({
    el:"#tab3",
    idx:1
});

tabmenu1.seletedSet = "tab1";



