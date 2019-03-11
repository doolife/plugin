import '../sass/index.scss';
import 'babel-polyfill'
import Selectbox from './page/selectbox'

const selectbox1 = new Selectbox({
    el:"#select1",
    scHeight:400
})

const selectbox2 = new Selectbox({
    el:"#select2",
    scHeight:400
})

const selectbox3 = new Selectbox({
    el:"#select3",
    scHeight:300
})