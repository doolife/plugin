class Multipleslider {
    constructor(opts){
        this.opts = Object.assign({
            el:"#multipleslider",
            auto:false,
            idx:0,
            type:"fade"
        }, opts);

        this.$sliderContainer = $(this.opts.el).find("[data-slider='container']");
        this.$sliderWrapper = this.$sliderContainer.find("[data-slider='wrapper']");
        this.$sliderList = this.$sliderContainer.find("[data-list]");
        this.$thumbWrapper = $(this.opts.el).find("[data-thumb='wrapper']");
        this.$thumbList = this.$thumbWrapper.find("[data-thumb]");
        this.$prev = $(this.opts.el).find("[data-btn='prev']");
        this.$next = $(this.opts.el).find("[data-btn='next']");

        this.listArray = [];
        this.childrenArray = [];
        this.currentId = "";
        this.prevId = "";
        this.autoState;

        this.init();
    }

    init(){
        this.settings();
        this.controls();
        if(this.opts.pagination) this.paginationSet();
        this.display();
        if(this.opts.auto) this.autoPlay();
    };

    controls(){
        this.$prev.on("click", (e)=>{
            this.prev();
        });

        this.$next.on("click", (e)=>{
            this.next();
        });

        this.$thumbList.on("click", (e)=>{
            this.currentId = $(e.currentTarget).data("thumb");
            this.display();
        });

        this.$sliderContainer.on("click", "[data-paging='list']", (e)=>{
            this.currentId = $(e.currentTarget).data("pcon");
            this.display();
        });

        if(this.opts.auto) {
            $(this.opts.el).on("mouseenter", ()=>{
                clearTimeout(this.autoState);
                this.autoState = undefined;
            });

            $(this.opts.el).on("mouseleave", ()=>{
                if(this.autoState!=undefined) return;
                this.autoPlay();
            });
        };
    };

    settings(){
        this.$sliderList.each((index, ele)=> {
            this.listArray.push($(ele).data("slider"));
            if(index==this.opts.idx-1){
                this.currentId = this.listArray[index];
            }
        });

        this.$sliderList.css({opacity:"0", zIndex:""});
    };

    autoPlay(){
        this.autoState = setTimeout(()=>{
            this.autoPlay();
            this.next();
        }, 3000);
    };

    display(){
        if(this.prevId==this.currentId) return;
        if(this.opts.pagination) this.paginationState();
        this.classRemove();
        this.classAdd();
        this.hide();
        this.show();
    };

    prev(){
        let prevNum = this.listArray.indexOf(this.currentId)-1;
        if(0>prevNum) prevNum = this.listArray.length-1;
        this.currentId = this.listArray[prevNum];
        this.display();
    };

    next(){
        let nextNum = this.listArray.indexOf(this.currentId)+1;
        if(this.listArray.length<=nextNum) nextNum = 0;
        this.currentId = this.listArray[nextNum];
        this.display();
    };

    show(){
        this.$sliderContainer.find(`[data-slider="${this.currentId}"]`).stop().animate({opacity:"1", zIndex:"1"}, 600);
        this.prevId = this.currentId;
    };

    hide(){
        this.$sliderContainer.find(`[data-slider="${this.prevId}"]`).stop().animate({opacity:"0", zIndex:"0"}, 600);
    };

    paginationSet(){
        let appHtml = "<ul data-paging='wrapper'></ul>";
        this.$sliderContainer.append(appHtml);

        $.each(this.listArray, (index, ele)=>{
            this.$sliderContainer.find("[data-paging='wrapper']").append(
                "<li data-paging='list'><button type='button'></button></li>"
            );
        });

        this.$sliderContainer.find("[data-paging='list']").each((index, ele)=>{
            $(ele).attr("data-pcon", this.listArray[index]);
        });
    };

    paginationState(){
        let $parent = this.$sliderContainer.find(`[data-slider="${this.currentId}"]`).parent("[data-slider='wrapper']");

        this.childrenArray = [];
        $parent.find("[data-list]").each((index, ele)=>{
            this.childrenArray.push($(ele).data("slider"));
        });

        this.$sliderContainer.find("[data-paging='wrapper']").find("[data-paging='list']").css({display:"none"});
        $.each(this.childrenArray, (index, value)=>{
            this.$sliderContainer.find("[data-paging='wrapper']").find(`[data-pcon='${value}']`).css({display:"inline-block"});
        });
    };

    classAdd(){
        if(!this.opts.pagination) {
            this.$thumbWrapper.find(`[data-thumb="${this.currentId}"]`).addClass("active");
            return false;
        };
        this.$thumbWrapper.find(`[data-thumb='${this.childrenArray[0]}']`).addClass("active");
        this.$sliderContainer.find("[data-paging='wrapper']").find(`[data-pcon='${this.currentId}']`).addClass("active");
    };

    classRemove(){
        if(!this.opts.pagination) {
            this.$thumbWrapper.find(`[data-thumb="${this.prevId}"]`).removeClass("active");
            return false;
        };
        this.$thumbList.removeClass("active");
        this.$sliderContainer.find("[data-paging='wrapper']").find(`[data-pcon='${this.prevId}']`).removeClass("active");
    };
};

export default Multipleslider;