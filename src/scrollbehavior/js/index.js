import '../sass/index.scss';
import 'babel-polyfill';
import Scrollbehavior from './module/scrollbehavior';
import Navigator from './module/navigator';
import page1 from './page/page1';
import page2 from './page/page2';
import page3 from './page/page3';
import page4 from './page/page4';

const layoutScene= {
    scene1:page1,
    scene2:page2,
    scene3:page3,
    scene4:page4,
};

const navigator = new Navigator({
    el:"#navgation",
    depth1:0,
    depth2:0,
    custom:true,
    gnbCallback:(dep1, dep2, prev1, prev2)=>{
        if(dep1===prev1 && dep2===prev2 || scrollbehavior.isScrolling) return false;
        if(dep2==null){
            if(dep1===prev1) return false;
            scrollbehavior.current.depth1Id = dep1;
        }else{
            scrollbehavior.current.depth1Id = dep1;
            scrollbehavior.current.depth2Id = dep2;
        };
        scrollbehavior.display();
    }
});

const scrollbehavior = new Scrollbehavior({
    el:"#scrollbehavior",
    depth1:2,
    depth2:1,
    type:"fade",
    timer:1.2,
    sceneCallback:(dep1, dep2, prev1, prev2)=>{
        switch (true) {
            case dep1==="scene1" && dep2==="scene1":
                layoutScene.scene1("section1_1");
                break;
            case dep1==="scene2":
                layoutScene.scene2("section2_1");
                break;
            case dep1==="scene3" && dep2==="scene1":
                layoutScene.scene3("section3_1");
                break;
            case dep1==="scene4":
                layoutScene.scene4("section4_1");
                break;
        }
        navigator.classRemove(prev1, prev2);
        navigator.classAdd(dep1, dep2);
    }
});


// document.querySelector(scrollbehavior.opts.el).addEventListener('transform', (event)=> {
//     console.log(event);
// });