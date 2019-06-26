class navigator {
    constructor(opts){
        this.opts = Object.assign({
            el:"[data-wrap='gnb']",
            depth1:0,
            depth2:0,
            custom:false,
            gnbCallback:(dep1, dep2, prev1, prev2)=>{

            }
        }, opts);

        this.gnbWrap = document.querySelector(this.opts.el);
        this.gnbList = this.gnbWrap.querySelectorAll("[data-gnb]");
        this.snbList = this.gnbWrap.querySelectorAll("[data-snb]");

        this.parentArray = [];
        this.childrenArray = [];
        this.current = {
            depth1Id:"",
            depth2Id:"",
        };

        this.previous = {
            depth1Id:"",
            depth2Id:"",
        };

        this.currentId;
        this.prevId;

        this._init();
    };

    _init(){
        this._settings();
        this._controls();
        this.prevDepth();
    };

    _controls(){
        // this.gnbWrap.addEventListener("click", this.pagination.bind(this), false);
        this.gnbWrap.addEventListener("click", (e)=>{
            this.opts.gnbCallback(this.pagination(e)[0], this.pagination(e)[1], this.previous.depth1Id, this.previous.depth2Id);
        });
    }

    _settings(){
        Array.prototype.slice.call(this.gnbList).forEach((element1, index1)=>{
            this.childrenArray[index1] = [];
            this.parentArray.push(element1.getAttribute("data-gnb"));
            if(index1==this.opts.depth1){
                this.current.depth1Id = this.parentArray[index1];
            };
            Array.prototype.slice.call(element1.querySelectorAll("[data-snb]")).forEach((element2, index2)=>{
                this.childrenArray[index1][index2] = element2.getAttribute("data-snb");
                if(index1==this.opts.depth1){
                    if(index2==this.opts.depth2){
                        this.current.depth2Id = this.childrenArray[index1][index2];
                    }
                }
            });
        });
    };

    pagination(e){
        if(e.target.nodeName=="BUTTON"){
            if(e.target.parentNode.getAttribute("data-snb")==null){
                this.current.depth1Id = e.target.parentNode.getAttribute("data-gnb");
                if(e.target.parentNode.lastElementChild.firstElementChild!=null){
                    this.current.depth2Id = e.target.parentNode.lastElementChild.firstElementChild.getAttribute("data-snb");
                }else{
                    this.current.depth2Id = null;
                }
            }else{
                this.current.depth1Id = e.target.parentNode.parentNode.parentNode.getAttribute("data-gnb");
                this.current.depth2Id = e.target.parentNode.getAttribute("data-snb");
            }
        };
        return [this.current.depth1Id, this.current.depth2Id];
    };

    prevDepth(){
        this.previous.depth1Id = this.current.depth1Id;
        this.previous.depth2Id = this.current.depth2Id;
    };

    classRemove(prev1, prev2){
        if(this.gnbWrap.querySelector(`[data-gnb="${prev1}"]`).querySelector(`[data-snb="${prev2}"]`)==null){
            this.gnbWrap.querySelector(`[data-gnb="${prev1}"]`).classList.remove("on");
        }else{
            this.gnbWrap.querySelector(`[data-gnb="${prev1}"]`).classList.remove("on");
            this.gnbWrap.querySelector(`[data-gnb="${prev1}"]`).querySelector(`[data-snb="${prev2}"]`).classList.remove("on");
        }
    };

    classAdd(current1, current2){
        this.current.depth1Id = current1;
        this.current.depth2Id = current2;

        if(this.gnbWrap.querySelector(`[data-gnb="${current1}"]`).querySelector(`[data-snb="${current2}"]`)==null){
            this.gnbWrap.querySelector(`[data-gnb="${current1}"]`).classList.add("on");
        }else{
            this.gnbWrap.querySelector(`[data-gnb="${current1}"]`).classList.add("on");
            this.gnbWrap.querySelector(`[data-gnb="${current1}"]`).querySelector(`[data-snb="${current2}"]`).classList.add("on");
        };

        this.prevDepth();
    };
};

export default navigator;