import '../sass/index.scss';
import ChtSelect from './util/cht-select';

const chtselect = new ChtSelect({
    el:"#contents",
    scale:1.1,
    leftX:-50,
    rightX:50,
    enterCallback(){
        console.log(this.currArr)
    },
    leaveCallback(){
        console.log("leaveCallback")
    }
});