class TabMenu{
    constructor(opts){
        this.opts = Object.assign({
            el:"#tabmenu",
            idx:1,
            tabCallback(currId, prevId){

            }
        }, opts);

        this.elWrap = document.querySelector(this.opts.el);
        this.elTabWrap = this.elWrap.querySelector("[data-tab-wrap]");
        this.elTabMenu = this.elWrap.querySelectorAll("[data-tab]");
        this.elConList = this.elWrap.querySelectorAll("[data-con]");

        this.currId;
        this.prevId;

        this.init();
    };

    init(){
        this.settings();
        this.controls();
    };

    settings(){
        let selected = this.elTabMenu[this.opts.idx-1].getAttribute("data-tab");
        this.selection(selected);
    }

    controls(){
        this.elTabWrap.addEventListener("click", evt=>{
            this.selection(evt.target.getAttribute("data-tab"));
        });
    }

    selection(selected){
        this.currId = selected;

        if(this.prevId!=undefined){
            this.elWrap.querySelector(`[data-tab="${this.prevId}"]`).classList.remove("active");
            this.elWrap.querySelector(`[data-con="${this.prevId}"]`).classList.remove("active");
        }

        this.elWrap.querySelector(`[data-tab="${this.currId}"]`).classList.add("active");
        this.elWrap.querySelector(`[data-con="${this.currId}"]`).classList.add("active");

        if (typeof this.opts.tabCallback == "function"){
            this.opts.tabCallback(this.currId, this.prevId);
        };

        this.prevId = this.currId;
    }

    set seletedSet(selected){
        this.selection(selected);
    }

};

export default TabMenu;