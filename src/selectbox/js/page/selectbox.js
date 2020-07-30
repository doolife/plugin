class Selectbox {
    constructor(opts){
        this.opts = $.extend(true, {
            el:"#select1",
            height:400
        }, opts);

        this.$wrap = $(this.opts.el);
        this.$title = this.$wrap.find("[data-select='title']");
        this.$menu = this.$wrap.find("[data-select='menu']");
        this.$list = this.$wrap.find("[data-select='list']");

        this.status;

        this.init();
    }

    init() {
        this.controls();
    }

    controls(){
        this.$title.on("click", (evt)=> {this.display(evt)});
        this.$wrap.on("click", "[data-select='list']", (evt)=> {this.copyAndPaste(evt)});
        $(document).on("click", (evt)=> {if(this.status===true) this.hide()});
    }

    display(evt){
        evt.stopPropagation();
        if(this.$wrap.attr("disabled")!==undefined) return;
        if(!this.$wrap.hasClass("active")){
            this.hide();
            this.show();
        }else{
            this.hide();
        }
    }

    show(){
        this.$wrap.addClass("active");
        this.$menu.css({height:this.opts.height, overflowY:"auto"});
        this.status = true;
    }

    hide(){
        $("[data-select='wrap']").removeClass("active");
        this.$menu.css({height:"", overflowY:""});
        this.status = false;
    }

    copyAndPaste(evt){
        this.hide();
        let clones = $(evt.currentTarget).find("[data-result]").clone();
        this.$title.empty().append(clones);
    }
}

export default Selectbox;