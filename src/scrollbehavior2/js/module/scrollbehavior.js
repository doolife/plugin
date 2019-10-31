class scrollbehavior {
    constructor(opts){
        this.opts = Object.assign({
            el:"#element",
            depth1:"scene1",
            depth2:"scene1-1",
            type:"fade",
            sceneCallback:(depth1, depth2)=>{

            }
        }, opts);

        this.el = document.querySelector(this.opts.el);
        this.main = this.el.querySelectorAll("[data-main]");
        this.sub = this.el.querySelectorAll("[data-sub]");

        this.screenArray = [];
        this.current = {
            dep1Obj:"",
            dep2Obj:"",
            dep1Id:"",
            dep2Id:"",
            dep1Num:"",
            dep2Num:"",
        };
        this.previous = {
            dep1Obj:"",
            dep2Obj:""
        };

        this.state = {
            isScrolling:true
        };

        this._init();
    };

    _init(){
        this._basicSettings();
        this._constrols();
        this.display();
    };

    _constrols(){
        this.el.addEventListener("wheel", this._wheelEvent.bind(this));
    };

    _basicSettings(){
        Array.prototype.slice.call(this.main).forEach((mainEle, mainIndex)=>{
            this.screenArray[mainIndex] = {
                ele:mainEle,
                sub:[]
            };
            if(mainEle.getAttribute("data-main")==this.opts.depth1){
                // this.current.dep1Obj = mainEle;
                this.current.dep1Num = mainIndex;
            };
            Array.prototype.slice.call(mainEle.querySelectorAll("[data-sub]")).forEach((subEle, subIndex)=>{
                this.screenArray[mainIndex].sub[subIndex] = {
                    ele:subEle,
                };
                if(mainEle.getAttribute("data-main")==this.opts.depth1){
                    if(subEle.getAttribute("data-sub")==this.opts.depth2){
                        // this.current.dep2Obj = subEle;
                        this.current.dep2Num = subIndex;
                    }
                }
            });
        });

        if(this.opts.type=="fade"){
            this._fadeSettings();
        };
    };

    _fadeSettings(){
        TweenMax.to(this.main, 0, {autoAlpha:0, zIndex:""});
        TweenMax.to(this.sub, 0, {autoAlpha:0, zIndex:""});
    };

    _wheelEvent(e){
        if(this.state.isScrolling) return false;
        if(this._wheelData(e) > 0) {
            this._scrollDown();
        }else {
            this._scrollUp();
        }
    };

    _wheelData(e){
        let delta = Math.sign(e.deltaY);
        if(e.type == "wheel") return e.deltaY > 0 ? delta : delta;
    };

    _scrollDown(){
        if(this.current.dep2Num>=this.screenArray[this.current.dep1Num].sub.length-1){
            if(this.current.dep1Num>=this.screenArray.length-1) return false;
            this.current.dep1Num++;
            this.current.dep2Num = 0;
        }else{
            this.current.dep2Num++;
        }
        this.display();
    };

    _scrollUp(){
        if(this.current.dep2Num<=0){
            if(this.current.dep1Num<=0) return false;
            this.current.dep1Num--;
            this.current.dep2Num = this.screenArray[this.current.dep1Num].sub.length-1;
        }else{
            this.current.dep2Num--;
        }
        this.display();
    };

    display(){
        if(this.screenArray[this.current.dep1Num]==undefined || this.screenArray[this.current.dep1Num].sub[this.current.dep2Num]==undefined) return false;

        this.currentDepth();
        if(this.opts.type=="fade"){
            this.fadeType();
        };
        this.prevDepth();

        this.state.isScrolling = true;
    };

    fadeType(){
        if(this.previous.dep2Obj!=""){
            TweenMax.to(this.previous.dep1Obj, 1, {autoAlpha:0});
            TweenMax.to(this.previous.dep2Obj, 0.6, {yPercent:-50, scale:0.8, autoAlpha:0});
        };

        TweenMax.to(this.current.dep1Obj, 0.8, {autoAlpha:1});
        TweenMax.fromTo(this.current.dep2Obj, 0.8, {yPercent:0, scale:0.7}, {yPercent:0, scale:1.0, autoAlpha:1, onComplete:this._sceneComplete.bind(this)});

        this.callback();
    };

    currentDepth(){
        this.current.dep1Obj = this.screenArray[this.current.dep1Num].ele;
        this.current.dep2Obj = this.screenArray[this.current.dep1Num].sub[this.current.dep2Num].ele;
        this.current.dep1Id = this.screenArray[this.current.dep1Num].ele.getAttribute("data-main");
        this.current.dep2Id = this.screenArray[this.current.dep1Num].sub[this.current.dep2Num].ele.getAttribute("data-sub");
    };

    prevDepth(){
        this.previous.dep1Obj = this.screenArray[this.current.dep1Num].ele;
        this.previous.dep2Obj = this.screenArray[this.current.dep1Num].sub[this.current.dep2Num].ele;
    };

    _sceneComplete(){
        this.state.isScrolling = false;
    };

    callback(){
        if (typeof this.opts.sceneCallback == "function"){
            this.opts.sceneCallback(this.current.dep1Num, this.current.dep2Num, this.current.dep1Id, this.current.dep2Id);
        };
    };
};

export default scrollbehavior;