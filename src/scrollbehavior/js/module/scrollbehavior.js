class scrollbehavior {
    constructor(opts){
        this.opts = Object.assign({
            el:"#element",
            depth1:0,
            depth2:1,
            type:"fade",
            timer:2000,
            sceneCallback:(dep1, dep2, prev1, prev2)=>{

            }
        }, opts);

        this.wrap = document.querySelector(this.opts.el);
        this.main = this.wrap.querySelectorAll("[data-main]");
        this.sub = this.wrap.querySelectorAll("[data-sub]");

        this.parentArray = [];
        this.childrenArray = [];
        this.listArray = [];
        this.listLengthArray = [];

        this.current = {
            depth1Id:"",
            depth2Id:"",
        };

        this.previous = {
            depth1Id:"",
            depth2Id:"",
        };

        this.isScrolling = true;

        this._init();
    };

    _init(){
        this._basicSettings();
        this._typeSettings();
        this._constrols();
        this.prevDepth();
        this.display();
    };

    _constrols(){
        this.wrap.addEventListener("wheel", this.wheelEvent.bind(this));
    };

    _basicSettings(){
        Array.prototype.slice.call(this.main).forEach((element1, index1)=>{
            this.childrenArray[index1] = [];
            this.parentArray.push(element1.getAttribute("data-main"));
            this.listLengthArray.push(element1.querySelectorAll("[data-sub]").length);
            if(index1==this.opts.depth1){
                this.current.depth1Id = this.parentArray[index1];
            };
            Array.prototype.slice.call(element1.querySelectorAll("[data-sub]")).forEach((element2, index2)=>{
                this.listArray.push(element2.getAttribute("data-sub"));
                this.childrenArray[index1][index2] = element2.getAttribute("data-sub");
                if(index1==this.opts.depth1){
                    if(index2==this.opts.depth2){
                        this.current.depth2Id = this.childrenArray[index1][index2];
                    }
                }
            });
        });
    };

    _typeSettings(){
        if(this.opts.type=="fade"){
            TweenMax.to(this.main, 0, {autoAlpha:0, zIndex:""});
            TweenMax.to(this.sub, 0, {autoAlpha:0, zIndex:""});
            if(this.current.depth2Id==""){
                TweenMax.to(this.wrap.querySelector(`[data-main="${this.current.depth1Id}"]`), 0, {autoAlpha:1});
            }else{
                TweenMax.to(this.wrap.querySelector(`[data-main="${this.current.depth1Id}"]`), 0, {autoAlpha:1});
                TweenMax.to(this.wrap.querySelector(`[data-main="${this.current.depth1Id}"]>[data-sub="${this.current.depth2Id}"]`) , 0, {autoAlpha:1});
            }
        };
    };

    wheelEvent(e){
        if(this.isScrolling) return false;
        if(this.wheelData(e) > 0) {
            this.scrollDown();
        }else {
            this.scrollUp();
        };
    };

    wheelData(e){
        let delta = Math.sign(e.deltaY);
        if(e.type == "wheel") return e.deltaY > 0 ? delta : delta;
    };

    scrollDown(){
        this.next();
    };

    scrollUp(){
        this.prev();
    };

    display(){
        switch(this.opts.type){
            case "fade":
                this.fadeType();
                break;
        };

        this.prevDepth();
        this.isScrolling = true;
    };

    prev(){
        this.current1Num = this.parentArray.indexOf(this.current.depth1Id);
        this.current2Num = this.childrenArray[this.current1Num].indexOf(this.current.depth2Id)-1;

        if(this.childrenArray[this.current1Num][this.current2Num]==undefined){
            if(this.parentArray.indexOf(this.current.depth1Id)==0){
                return false;
            }else{
                this.current1Num = this.parentArray.indexOf(this.current.depth1Id)-1;
                this.current2Num = this.childrenArray[this.current1Num].indexOf(this.childrenArray[this.current1Num][this.childrenArray[this.current1Num].length-1]);
            }
        };

        this.current.depth1Id = this.parentArray[this.current1Num];
        this.current.depth2Id = this.childrenArray[this.current1Num][this.current2Num];

        this.display();
    };

    next(){
        this.current1Num = this.parentArray.indexOf(this.current.depth1Id);
        this.current2Num = this.childrenArray[this.current1Num].indexOf(this.current.depth2Id)+1;

        if(this.childrenArray[this.current1Num][this.current2Num]==undefined){
            if(this.parentArray.indexOf(this.current.depth1Id)==this.parentArray.length-1){
                return false;
            }else{
                this.current1Num = this.parentArray.indexOf(this.current.depth1Id)+1;
                this.current2Num = this.childrenArray[this.current1Num].indexOf(this.childrenArray[this.current1Num][0]);
            }
        };

        this.current.depth1Id = this.parentArray[this.current1Num];
        this.current.depth2Id = this.childrenArray[this.current1Num][this.current2Num];

        this.display();
    };

    prevDepth(){
        this.previous.depth1Id = this.current.depth1Id;
        this.previous.depth2Id = this.current.depth2Id;
    };

    fadeType(){
        if(this.previous.depth2Id=="" || this.previous.depth2Id==undefined){
            TweenMax.to(this.wrap.querySelector(`[data-main="${this.previous.depth1Id}"]`), this.opts.timer, {autoAlpha:0});
        }else{
            if(this.wrap.querySelector(`[data-main="${this.previous.depth1Id}"]>[data-sub="${this.previous.depth2Id}"]`)==null){
                TweenMax.to(this.wrap.querySelector(`[data-main="${this.previous.depth1Id}"]`), this.opts.timer, {autoAlpha:0});
            }else{
                TweenMax.to(this.wrap.querySelector(`[data-main="${this.previous.depth1Id}"]`), this.opts.timer, {autoAlpha:0});
                TweenMax.to(this.wrap.querySelector(`[data-main="${this.previous.depth1Id}"]>[data-sub="${this.previous.depth2Id}"]`), this.opts.timer, {autoAlpha:0});
            }
        };

        if(this.current.depth2Id=="" || this.current.depth2Id==undefined){
            TweenMax.to(this.wrap.querySelector(`[data-main="${this.current.depth1Id}"]`), this.opts.timer, {autoAlpha:this.opts.timer, onComplete:this.sceneComplete.bind(this)});
        }else{
            if(this.wrap.querySelector(`[data-main="${this.current.depth1Id}"]>[data-sub="${this.current.depth2Id}"]`)==null){
                TweenMax.to(this.wrap.querySelector(`[data-main="${this.current.depth1Id}"]`), this.opts.timer, {autoAlpha:this.opts.timer, onComplete:this.sceneComplete.bind(this)});
            }else{
                TweenMax.to(this.wrap.querySelector(`[data-main="${this.current.depth1Id}"]`), this.opts.timer, {autoAlpha:1});
                TweenMax.to(this.wrap.querySelector(`[data-main="${this.current.depth1Id}"]>[data-sub="${this.current.depth2Id}"]`), this.opts.timer, {autoAlpha:1, onComplete:this.sceneComplete.bind(this)});
            }
        };

        this.callback();
    };

    sceneComplete(){
        this.isScrolling = false;
    };

    callback(){
        if (typeof this.opts.sceneCallback == "function"){
            this.opts.sceneCallback(this.current.depth1Id, this.current.depth2Id, this.previous.depth1Id, this.previous.depth2Id);
            // this.on();
        };
    };

    on(){
        let event = new CustomEvent('transform', {
            detail: {
                curr1dep:this.current.depth1Id,
                curr2dep:this.current.depth2Id,
                prev1dep:this.previous.depth1Id,
                prev2dep:this.previous.depth2Id,
            }
        });
        this.wrap.dispatchEvent(event);
    }
};

export default scrollbehavior;