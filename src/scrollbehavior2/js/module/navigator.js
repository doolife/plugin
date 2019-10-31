class navigator {
    constructor(opts){
        this.opts = Object.assign({
            el:"#navigator",
            depth1:"scene1",
            depth2:"scene1-2",
            gnbCallback:(curr1Num, curr2Num, prev1Num, prev2Num)=>{

            }
        }, opts);

        this.navWrap = document.querySelector(this.opts.el);
        this.mainList = this.navWrap.querySelectorAll("[data-main]");
        this.subList = this.navWrap.querySelectorAll("[data-sub]");

        this.listArray = [];
        this.current = {
            dep1Obj:"",
            dep2Obj:"",
            dep1Num:"",
            dep2Num:"",
        };
        this.previous = {
            dep1Obj:"",
            dep2Obj:"",
            dep1Num:"",
            dep2Num:"",
        };

        this._init();
    };

    _init(){
        this._settings();
        this._controls();
        this.display();
    };

    _settings(){
        Array.prototype.slice.call(this.mainList).forEach((mainEle, mainIndex)=>{
            this.listArray[mainIndex] = {
                ele:mainEle,
                sub:[]
            };
            if(mainEle.getAttribute("data-main")==this.opts.depth1){
                this.current.dep1Num = mainIndex;
            };
            Array.prototype.slice.call(mainEle.querySelectorAll("[data-sub]")).forEach((subEle, subIndex)=>{
                this.listArray[mainIndex].sub[subIndex] = {
                    ele:subEle,
                };
                if(mainEle.getAttribute("data-main")==this.opts.depth1){
                    if(subEle.getAttribute("data-sub")==this.opts.depth2){
                        this.current.dep2Num = subIndex;
                    }
                }
            });
        });
    };

    _controls(){
        Array.prototype.slice.call(this.mainList).forEach((item, mainIdx)=>{
            item.addEventListener("click", (evt)=>{
                this.callback(this.pagination(item, mainIdx, evt)[0], this.pagination(item, mainIdx, evt)[1], this.previous.dep1Num, this.previous.dep2Num);
            });
        });
    };

    pagination(item, mainIdx, evt){
        let anchors = Array.prototype.slice.call(item.querySelectorAll("LI"));
        let subIdx = Array.prototype.indexOf.call(anchors, evt.target.parentNode);

        if(subIdx<=-1) subIdx = 0;

        this.current.dep1Num = mainIdx;
        this.current.dep2Num = subIdx;
        return [this.current.dep1Num, this.current.dep2Num];

        // this.display();
        // this.callback();
    };

    display(){
        this.currentDepth();
        this.removeClass();
        this.addClass();
        this.prevDepth();
    };

    currentDepth(){
        if(this.listArray[this.current.dep1Num].sub[this.current.dep2Num]!=undefined){
            this.current.dep1Obj = this.listArray[this.current.dep1Num].ele;
            this.current.dep2Obj = this.listArray[this.current.dep1Num].sub[this.current.dep2Num].ele;
        }else{
            this.current.dep1Obj = this.listArray[this.current.dep1Num].ele;
            this.current.dep2Obj = undefined;
        }
    };

    prevDepth(){
        if(this.listArray[this.current.dep1Num].sub[this.current.dep2Num]!=undefined){
            this.previous.dep1Obj = this.listArray[this.current.dep1Num].ele;
            this.previous.dep2Obj = this.listArray[this.current.dep1Num].sub[this.current.dep2Num].ele;
            this.previous.dep1Num = this.current.dep1Num;
            this.previous.dep2Num = this.current.dep2Num;
        }else{
            this.previous.dep1Obj = this.listArray[this.current.dep1Num].ele;
            this.previous.dep2Obj = undefined;
            this.previous.dep1Num = this.current.dep1Num;
            this.previous.dep2Num = undefined;
        }
    };

    addClass(){
        this.current.dep1Obj.classList.add("p-nav__list--on");
        if(this.current.dep2Obj==undefined) return false;
        this.current.dep2Obj.classList.add("p-nav__list--on");
        this.prevDepth();
    };

    removeClass(){
        if(this.previous.dep1Obj != "" || this.previous.dep2Obj != ""){
            this.previous.dep1Obj.classList.remove("p-nav__list--on");
            if(this.previous.dep2Obj==undefined) return false;
            this.previous.dep2Obj.classList.remove("p-nav__list--on");
        }
    }
    
    callback(curr1Data, curr2Data, prev1Data, prev2Data){
        if (typeof this.opts.gnbCallback == "function"){
            this.opts.gnbCallback(curr1Data, curr2Data, prev1Data, prev2Data);
        };
    }
};

export default navigator;