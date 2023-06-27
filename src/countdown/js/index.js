import 'babel-polyfill';
import '../sass/index.scss';
import CountDown from './util/countdown';

const counter = new CountDown({
    el:"#counter",
    startDate:Date.parse("2022-07-11T16:12:00+09:00"),
    endDate:new Date(Date.parse(`2022-08-19T23:59:59+09:00`))
});