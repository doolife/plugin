import '../sass/index.scss';
import Moviedata from './module/datacontrols';


const moviedata = new Moviedata({
    el:"#data-movie",
    url:"https://www.kobis.or.kr",
    key:"e93cc391a8b9c32da9cc474c7fc85149",
    totalData:224,
    itemPerPage:10,
    pageList:10,
    currPage:1,
});