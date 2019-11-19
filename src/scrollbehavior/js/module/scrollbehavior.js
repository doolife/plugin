class scrollbehavior {
    constructor(opts){
        this.opts = Object.assign({
            el:"#content",
            idx:"scene3-2",
            sceneCallback:(currentId)=>{

            }
        }, opts);

        this.el = document.querySelector(this.opts.el);
        this.menu = document.querySelector("[data-nav='wrap']");
        this.menuList = document.querySelectorAll("[data-key]");
        this.scene = document.querySelectorAll("[data-scene]");

        this.currentId;
        this.previousId;
        this.prevScene;
        this.current = {
            dep1Id:"",
            dep2Id:"",
            dep1Num:"",
            dep2Num:""
        };
        this.isScrolling = false;

        this._init();
    }

    _init(){
        this._settings();
        this._controls();
        this.anchorWheel();
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
            anchor = target.children[0].getAttribute("href");
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
    }

    sceneAnimation(eleData){
        TweenMax.fromTo(eleData, 0.8, {yPercent:0, scale:0.5}, {yPercent:0, scale:1.0, autoAlpha:1, onComplete:()=>{    // current element
                this.isScrolling = false;
            }});
        TweenMax.to(eleData.parentElement, 0.6, {autoAlpha:1});    // current-parent element
        if(this.prevScene!==undefined){
            TweenMax.to(this.prevScene, 0.6, {yPercent:-50, scale:0.8, autoAlpha:0});    // previous element
            if(eleData.parentElement!==this.prevScene.parentElement){
                TweenMax.to(this.prevScene.parentElement, 0.6, {autoAlpha:0});    // previous-parent element
            };
        }
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
            ele.classList.remove("p-nav__btn--on");
        });

        Array.prototype.slice.call(this.menuList).forEach((ele, idx)=>{
            let dataKey = ele.getAttribute("data-key");
            if(ele.getAttribute("data-key")==strIdx){
                let dataSplit = dataKey.split("-");
                ele.classList.add("p-nav__btn--on");
                if(dataSplit[1]===undefined){
                    addElement = document.querySelector(`[data-key=${dataSplit[0]+"-1"}]`);
                    if(addElement===null) return false;
                }else{
                    addElement = document.querySelector(`[data-key=${dataSplit[0]}]`);
                }
                addElement.classList.add("p-nav__btn--on");
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