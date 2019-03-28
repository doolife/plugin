class Selectbox {
    constructor(opts){
        this.opts = Object.assign({
            el:"#select1",
            scHeight:400
        }, opts)

        this.elWrap = document.querySelector(this.opts.el);
        this.elComWrap = document.querySelectorAll("[data-select='wrap']");
        this.elTitle = this.elWrap.querySelector("[data-select='title']");
        this.elListWrap = this.elWrap.querySelector("[data-select='listWrap']");
        this.elList = this.elWrap.querySelector("[data-select='list']");
        this.elNoData = this.elWrap.querySelector("[data-list='no']");

        this.titEvent = "";
        this.listEvent = "";
        this.tagClone = "";

        this.init()
    }

    init() {
        this.controls()
    }
    controls(){
        this.elTitle.addEventListener("click", (e)=>{
            this.titEvent = e;
            this.display()
        })

        if(this.elListWrap!=null){
            this.elListWrap.addEventListener("click", (e)=>{
                this.listEvent = e;
                if(this.listEvent.target.nodeName=="DIV"){
                    this.tagClone = this.listEvent.target.cloneNode(true);
                    this.select();
                }
            })
        }

        document.addEventListener("click", (e)=>{
            if(e.target==document.querySelector("body")){
                if(!this.elTitle.classList.contains("active")) return;
                this.remove()
            }
        })
    }
    display(){
        if(this.titEvent.currentTarget.hasAttribute("disabled")) return;
        if(!this.titEvent.currentTarget.classList.contains("active")){
            this.remove()
            this.active()
        }else{
            this.remove()
        }
    }
    active(){
        this.elTitle.classList.add("active")
        this.elListWrap.classList.add("active")
        if(this.elListWrap.clientHeight>=this.opts.scHeight){
            this.elListWrap.style.height = this.opts.scHeight+"px";
            this.elListWrap.style.overflowY = "auto";
        }
    }
    remove(){
        Array.from(this.elComWrap).forEach((contents)=>{
            if(contents.querySelector("[data-select='listWrap']")!=null){
                contents.querySelector("[data-select='title']").classList.remove("active")
                contents.querySelector("[data-select='listWrap']").classList.remove("active")
            }
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
        }

        this.remove();
        this.elTitle.appendChild(this.tagClone);
    }
}

for (let i = 1; i < 9; i++) {
    document.querySelector(".s1").querySelector(".select_list").innerHTML += "<li  data-select='list'><div data-result='text'><span>서버</span><span>캐릭터</span>1_"+i+"</div></li>";
}

export default Selectbox;