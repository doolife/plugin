class scrollbehavior {
    constructor(opts){
        this.opts = Object.assign({
            el:"#content",
            idx:"scene3-2",
            sceneCallback:(currentId)=>{

            }
        }, opts);

        this.el = document.querySelector(this.opts.el);
        this.menu = document.querySelector(".p-nav__menu--main");
        this.menuList = document.querySelectorAll("[data-key]");
        this.scene = document.querySelectorAll("[data-scene]");
        this.currScene;
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
        this.setClass();
    }

    _controls(){
        this.menu.addEventListener("click", e=>{
            e.preventDefault();
            if(this.isScrolling) return false;
            this.navAnchor(e);
        });

        this.el.addEventListener("wheel", this._wheelEvent.bind(this));
    }

    _settings(){
        TweenMax.to(this.scene, 0, {autoAlpha:0});
        this.shoHide(this.infoFind(this.opts.idx));
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
        this.shoHide(this.infoFind(this.opts.info[this.current.dep1Num].sub[this.current.dep2Num].key));
        this.setClass();
    }

    _scrollUp(){
        if(this.current.dep2Num<=0){
            if(this.current.dep1Num<=0) return false;
            this.current.dep1Num--;
            this.current.dep2Num = this.opts.info[this.current.dep1Num].sub.length-1;
        }else{
            this.current.dep2Num--;
        }
        this.shoHide(this.infoFind(this.opts.info[this.current.dep1Num].sub[this.current.dep2Num].key));
        this.setClass();
    }

    navAnchor(e){
        let anchor;
        let target = e.target;
        let tag = target.tagName;
        if(tag==="A"){
            anchor = this.strHref(target);
        }else if(tag==="LI"){
            anchor = this.strHref(target.children[0]);
        }else{
            return false;
        }
        let eleFind = this.infoFind(this.strConversion(anchor));
        if(eleFind===this.prevScene || eleFind===undefined) return false;
        this.shoHide(eleFind);
        this.classSettings(target.getAttribute("data-key"));
    }

    strHref(target){
        return target.getAttribute("href");
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
                    this.currScene = currStr.getAttribute("data-scene");
                }
            });
        });
        return currStr;
    }

    shoHide(eleData){
        this.isScrolling = true;
        TweenMax.fromTo(eleData, 0.8, {yPercent:0, scale:0.5}, {yPercent:0, scale:1.0, autoAlpha:1, onComplete:this._sceneComplete.bind(this)});
        TweenMax.to(eleData.parentElement, 0.6, {autoAlpha:1});
        if(this.prevScene!==undefined){
            TweenMax.to(this.prevScene, 0.6, {yPercent:-50, scale:0.8, autoAlpha:0});
            if(eleData.parentElement!==this.prevScene.parentElement){
                TweenMax.to(this.prevScene.parentElement, 0.6, {autoAlpha:0});
            };
        }
        this.callback();
        this.prevScene = eleData;
    }

    _sceneComplete(){
        this.isScrolling = false;
    };

    setClass(){
        Array.prototype.slice.call(this.menuList).forEach((ele, idx)=>{
            if(this.strConversion(ele.getAttribute("href"))==this.opts.info[this.current.dep1Num].sub[this.current.dep2Num].key){
                this.classSettings(ele.getAttribute("data-key"));
            }
        });
    }


    classSettings(strIdx){
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
            this.opts.sceneCallback(this.currScene);
        };
    };
}

export default scrollbehavior;