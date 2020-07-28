class Selectbox {
    constructor(opts){
        this.opts = Object.assign({
            el:"#select1",
            scHeight:400,
            listDisabled:false
        }, opts);

        if(document.querySelector(this.opts.el)==null) return false;
        this.elWrap = document.querySelector(this.opts.el);
        this.elComWrap = document.querySelectorAll("[data-select='wrap']");
        this.elTitle = this.elWrap.querySelector("[data-select='title']");
        this.elListWrap = this.elWrap.querySelector("[data-select='listWrap']");

        this.tagClone = "";
        this.actvieChk;

        this.init();
    }

    init() {
        this.controls();
    }
    controls(){
        this.elWrap.addEventListener("click", this.display.bind(this));

        this.elListWrap.addEventListener("click", this.listSelect.bind(this));

        document.addEventListener("click", ()=>{
            if(this.actvieChk==true) this.remove();
        });
    }
    display(evt){
        evt.stopPropagation();
        if(evt.currentTarget.hasAttribute("disabled")) return;
        if(!evt.currentTarget.classList.contains("active")){
            this.remove();
            this.active();
        }else{
            this.remove();
        };
    }
    active(){
        this.actvieChk = true;
        this.elWrap.classList.add("active");
        this.elTitle.classList.add("active");
        this.elListWrap.classList.add("active");
        if(this.elListWrap.clientHeight>=this.opts.scHeight){
            this.elListWrap.style.height = this.opts.scHeight+"px";
            this.elListWrap.style.overflowY = "auto";
        };
    }
    remove(){
        this.actvieChk = false;
        Array.from(this.elComWrap).forEach((contents)=>{
            if(contents.querySelector("[data-select='listWrap']")!=null){
                contents.classList.remove("active");
                contents.querySelector("[data-select='title']").classList.remove("active");
                contents.querySelector("[data-select='listWrap']").classList.remove("active");
            };
        });
        this.elListWrap.style.height = "";
        this.elListWrap.style.overflowY = "";
    }
    select(){
        let txt = this.elTitle.querySelector("[data-tit='text']");
        let tag = this.elTitle.querySelector("[data-result='text']");

        if(txt!=null){
            this.elTitle.removeChild(txt);
        }else{
            this.elTitle.removeChild(tag);
        };

        this.remove();
        this.elTitle.appendChild(this.tagClone);
    }
    listSelect(evt){
        evt.stopPropagation();
        if(this.opts.listDisabled) return false;
        let target = evt.target;
        while (target && target.parentNode !== this.elListWrap) {
            target = target.parentNode;   // 클릭된 요소가 직접 자식이 아닌 경우
            if(!target) return;     // 요소가 없는 경우
        }
        if (target.tagName === 'LI'){   // 요소가 LI 인지 확인
            this.tagClone = target.children[0].cloneNode(true)
            this.select();
        }
    }
}

export default Selectbox;