class scrollbehavior {
    constructor(opts){
        this.opts = Object.assign({
            el:"#content",
            info:"",    // Info
            idx:"scene1-2",
            sceneCallback:(currentId)=>{

            }
        }, opts);

        this.el = document.querySelector(this.opts.el);
        this.menu = document.querySelector("[data-nav='wrap']");
        this.menuList = document.querySelectorAll("[data-key]");
        this.scene = document.querySelectorAll("[data-scene]");

        this.start = false;
        this.currentId;
        this.previousId;
        this.prevScene;
        this.current = {
            dep1Id:"",
            dep2Id:"",
            dep1Num:"",
            dep2Num:""
        };
        this.previous = {
            dep1Num:"",
            dep2Num:""
        };
        this.isScrolling = false;

        this._init();
    }

    _init(){
        this._settings();
        this._controls();
    }

    _controls(){
        this.menu.addEventListener("click", e=>{
            let target = e.target;
            if(!this._urlCheck(target.getAttribute("href"))) e.preventDefault();
            if(this.isScrolling) return false;
            this.anchorNav(target);
        });

        this.el.addEventListener("wheel", this._wheelEvent.bind(this));
    }

    _settings(){
        TweenMax.to(this.scene, 0, {autoAlpha:0});
        if(!window.location.hash){
            this.sceneAction(this.infoFind(this.opts.idx));
        }else{
            this.sceneAction(this.infoFind(this.strConversion(window.location.hash)));
        }
    }

    _urlCheck(strUrl){
        let expUrl = /^http[s]?\:\/\//i;
        return expUrl.test(strUrl);
    }

    _wheelEvent(e){
        if(this.isScrolling) return false;
        if(this._wheelData(e) > 0) {
            this._scrollDown();
        }else {
            this._scrollUp();
        }
    }

    _wheelData(e){
        let delta = Math.sign(e.deltaY);
        if(e.type == "wheel") return e.deltaY > 0 ? delta : delta;
    }

    _scrollDown(){
        if(this.current.dep2Num>=this.opts.info[this.current.dep1Num].sub.length-1) {
            if(this.current.dep1Num>=this.opts.info.length-1) return false;
            this.current.dep1Num++;
            this.current.dep2Num = 0;
        }else{
            this.current.dep2Num++;
        }
        this.sceneAction(this.infoFind(this.opts.info[this.current.dep1Num].sub[this.current.dep2Num].key));
    }

    _scrollUp(){
        if(this.current.dep2Num<=0){
            if(this.current.dep1Num<=0) return false;
            this.current.dep1Num--;
            this.current.dep2Num = this.opts.info[this.current.dep1Num].sub.length-1;
        }else{
            this.current.dep2Num--;
        }
        this.sceneAction(this.infoFind(this.opts.info[this.current.dep1Num].sub[this.current.dep2Num].key));
    }

    anchorNav(eTarget){
        let anchor;
        let target = eTarget;
        let tag = target.tagName;
        if(tag==="A"){
            anchor = target.getAttribute("href");
        }else if(tag==="LI"){
            anchor = target.children[0].getAttribute("data-key");
        }else{
            return false;
        }
        let eleFind = this.infoFind(this.strConversion(anchor));
        if(eleFind===this.prevScene || eleFind===undefined) return false;
        this.sceneAction(eleFind);
        this.anchorClass(target.getAttribute("data-key"));
    }

    strConversion(str){
        return str.replace(/#/,"");
    }

    infoFind(eleStr){
        let currStr;
        this.opts.info.forEach((dataMain, mainIdx)=>{
            dataMain.sub.forEach((dataSub, subIdx)=>{
                if(dataSub.key==eleStr){
                    this.current.dep1Num = mainIdx;
                    this.current.dep2Num = subIdx;
                    currStr = dataSub.ele;
                    this.currentId = currStr.getAttribute("data-scene");
                }
            });
        });
        return currStr;
    }

    sceneAction(eleData){
        this.isScrolling = true;
        this.sceneAnimation(eleData);
        this.callback();
        this.anchorWheel();
        window.location.hash = this.currentId;
        this.prevScene = eleData;
        this.previousId = this.prevScene.getAttribute("data-scene");
        this.previous.dep1Num = this.current.dep1Num;
        this.previous.dep2Num = this.current.dep2Num;
    }

    situation(){
        let state;
        if(this.start){
            if(this.current.dep1Num == this.previous.dep1Num){
                if(this.current.dep2Num > this.previous.dep2Num){
                    state = 1;
                }else{
                    state = 0;
                }
            }else if(this.current.dep1Num > this.previous.dep1Num){
                state = 1;
            }else{
                state = 0;
            }
        }else{
            state = 2;
        }
        this.start = true;
        return state;
    }

    sceneAnimation(eleData){
        let currPos = {yPercent:0}, prevPos = {yPercent:0};
        if(this.situation()==2){
            currPos.yPercent = 0;
            prevPos.yPercent = 0;
        }else if(this.situation()==1){
            currPos.yPercent = 100;
            prevPos.yPercent = -100;
        }else{
            currPos.yPercent = -100;
            prevPos.yPercent = 100;
        };

        TweenMax.fromTo(eleData, 1.1, currPos, {yPercent:0, ease:Power1.easeOut, onComplete:()=>{
                this.isScrolling = false;
            }});
        TweenMax.set(eleData.parentElement, {autoAlpha:1, zIndex:7});
        TweenMax.set(eleData, {autoAlpha:1, zIndex:6});

        if(this.prevScene!==undefined){
            TweenMax.fromTo(this.prevScene, 1.1, {yPercent:0}, prevPos);
            TweenMax.set(this.prevScene, {zIndex:4});
            if(eleData.parentElement!==this.prevScene.parentElement) TweenMax.set(this.prevScene.parentElement, {zIndex:5});
        };
    }

    anchorWheel(){
        Array.prototype.slice.call(this.menuList).forEach((ele, idx)=>{
            if(this.strConversion(ele.getAttribute("href"))==this.opts.info[this.current.dep1Num].sub[this.current.dep2Num].key){
                this.anchorClass(ele.getAttribute("data-key"));
            }
        });
    }


    anchorClass(strIdx){
        let addElement;
        Array.prototype.slice.call(this.menuList).forEach((ele, idx)=>{
            ele.parentNode.classList.remove("p-nav__list--on");
        });

        Array.prototype.slice.call(this.menuList).forEach((ele, idx)=>{
            let dataKey = ele.getAttribute("data-key");
            if(ele.getAttribute("data-key")==strIdx){
                let dataSplit = dataKey.split("-");
                ele.parentNode.classList.add("p-nav__list--on");
                if(dataSplit[1]===undefined){
                    addElement = document.querySelector(`[data-key=${dataSplit[0]+"-1"}]`);
                    if(addElement===null) return false;
                }else{
                    addElement = document.querySelector(`[data-key=${dataSplit[0]}]`);
                }
                addElement.parentNode.classList.add("p-nav__list--on");
            }
        });
    }

    callback(){
        if (typeof this.opts.sceneCallback == "function"){
            this.opts.sceneCallback(this.currentId, this.previousId);
        };
    };
}

export default scrollbehavior;