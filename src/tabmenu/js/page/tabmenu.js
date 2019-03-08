class TabMenu{
    constructor(opts){
        this.opts = Object.assign({
            el:"#tabmenu",
            idx:1
        }, opts);

        this.elWrap = document.querySelector(this.opts.el);
        this.elTabWrap = this.elWrap.querySelector("[data-tab='wrap']");
        this.elTabMenu = this.elTabWrap.querySelectorAll("[data-tab]");
        this.elConWrap = this.elWrap.querySelector("[data-con='wrap']");
        this.elConList = this.elConWrap.querySelectorAll("[data-tab]");
        this.selected;

        this.init();
    };

    init(){
        this.settings();
        this.controls();
    };

    settings(){
        Array.from(this.elTabMenu).forEach((value, index)=>{
            if(index==this.opts.idx-1){
                this.selected = this.elTabMenu[index].getAttribute("data-tab");
            }
        });
        this.selection(this.selected);
    }

    controls(){
        this.elTabWrap.addEventListener("click", (e)=>{
            if(e.target.nodeName == "BUTTON") {
                if(e.target.parentNode.hasAttribute("disabled")) return;
                if(e.target.parentNode.classList.contains("active")) return;
                this.selection(e.target.parentNode.getAttribute("data-tab"));
            }
        });
    }

    selection(name){
        Array.from(this.elTabMenu).forEach((tab)=>{
            tab.classList.remove("active");
        });
        Array.from(this.elConList).forEach((contents)=>{
            contents.classList.remove("active");
        });

        this.elTabWrap.querySelector(`[data-tab="${name}"]`).classList.add("active");
        this.elConWrap.querySelector(`[data-tab="${name}"]`).classList.add("active");
    }

    set seletedSet(name){
        this.selection(name);
    }

};

export default TabMenu;