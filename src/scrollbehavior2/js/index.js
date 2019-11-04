import '../sass/index.scss';
import 'babel-polyfill';
import navigator from "./module/navigator";
import scrollbehavior from "./module/scrollbehavior";
import page1 from './page/page1';
import page2 from './page/page2';
import page3 from './page/page3';
import page4 from './page/page4';

const navigation = new navigator({
    el:"#navigator",
    depth1:"scene1",
    depth2:"scene1-1",
    gnbCallback:(curr1Num, curr2Num, prev1Num, prev2Num)=>{
        if(curr1Num===prev1Num && curr2Num===prev2Num || sceneAction.state.isScrolling) return false;
        if(curr1Num===prev1Num && prev2Num==undefined) return false;
        sceneAction.current.dep1Num = curr1Num;
        sceneAction.current.dep2Num = curr2Num;
        sceneAction.display();
    }
});

const sceneAction = new scrollbehavior({
    el:"#contents",
    depth1:"scene1",
    depth2:"scene1-1",
    type:"fade",
    sceneCallback:(curr1Num, curr2Num, depth1Id, depth2Id)=>{
        navigation.current.dep1Num = curr1Num;
        navigation.current.dep2Num = curr2Num;
        navigation.display();
        switch (true) {
            case depth1Id==="scene1" && depth2Id==="scene1-1":
                page1.palyAnimation();
                break;
            case depth1Id==="scene2" && depth2Id==="scene2-1":
                page2.palyAnimation();
                break;
            case depth1Id==="scene3" && depth2Id==="scene3-2":
                page3.palyAnimation();
                break;
            case depth1Id==="scene4" && depth2Id==="scene4-2":
                page4.palyAnimation();
                break;
        }
    }
});