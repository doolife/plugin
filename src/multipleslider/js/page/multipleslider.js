class Multipleslider {
    constructor(opts){
        this.opts = $.extend({
            el:"#multipleslider",
            auto:false,
            depth1:0,
            depth2:0,
            pagination:true,
            type:"fade",
            interval:3000
        }, opts);

        this.$el = $(this.opts.el);
        this.$sliderContainer = this.$el.find("[data-slider='container']");
        this.$sliderWrapper = this.$sliderContainer.find("[data-slider='wrapper']");
        this.$sliderList = this.$sliderContainer.find("[data-list]");
        this.$thumbWrapper = this.$el.find("[data-thumb='wrapper']");
        this.$thumbList = this.$thumbWrapper.find("[data-thumb]");
        this.$prev = this.$el.find("[data-btn='prev']");
        this.$next = this.$el.find("[data-btn='next']");

        this.parentArray = [];
        this.childrenArray = [];
        this.depth2first = [];
        this.listArray = [];
        this.listLengthArray = [];

        this.current = {
            depth1Id:"",
            depth2Id:"",
            depth1posX:"",
            depth2posX:"",
        };

        this.previous = {
            depth1Id:"",
            depth2Id:"",
        };

        this.endStr = false;
        this.autoState;

        this.init();
    }

    init(){
        this.basicSettings();
        this.typeSettings();
        this.prevDepth();
        this.controls();
        if(this.opts.pagination) this.paginationSet();
        if(this.opts.auto) this.autoPlay();
        this.display();
    };

    controls(){
        this.$prev.on("click", (e)=>{
            this.prev();
        });

        this.$next.on("click", (e)=>{
            this.next();
        });

        this.$thumbList.on("click", (e)=>{
            this.currentMove(e, "thumb");
        });

        this.$el.on("click", "[data-pthumb]", (e)=>{
            this.currentMove(e, "paging");
        });

        if(this.opts.auto) {
            this.$el.on("mouseenter", ()=>{
                clearTimeout(this.autoState);
                this.autoState = undefined;
            });

            this.$el.on("mouseleave", ()=>{
                if(this.autoState!=undefined) return;
                this.autoPlay();
            });
        };
    };

    basicSettings(){
        this.$sliderContainer.attr("data-type", ""+this.opts.type+"");

        this.$sliderWrapper.each((index1, ele1)=> {
            this.childrenArray[index1] = [];
            this.parentArray[index1] = $(ele1).data("wrapper");
            this.listLengthArray.push($(ele1).find(this.$sliderList).length);
            if(index1==this.opts.depth1){
                this.current.depth1Id = this.parentArray[index1];
            }
            $(ele1).find(this.$sliderList).each((index2, ele2)=> {
                this.listArray.push($(ele2).data("slider"));
                this.childrenArray[index1][index2] = $(ele2).data("slider");
                if(index1==this.opts.depth1){
                    if(index2==this.opts.depth2){
                        this.current.depth2Id = this.childrenArray[index1][index2];
                    }
                }
            });
            this.depth2first[index1] = this.childrenArray[index1][0];
        });
    };

    typeSettings(){
        if(this.opts.type=="fade"){
            this.$sliderWrapper.css({opacity:"0", zIndex:""});
            this.$sliderList.css({opacity:"0", zIndex:""});
            $(`[data-wrapper="${this.current.depth1Id}"]`).css({opacity:"1", zIndex:"1"});
            $(`[data-wrapper="${this.current.depth1Id}"]`).find(`[data-slider="${this.current.depth2Id}"]`).css({opacity:"1", zIndex:"1"});
        };

        if(this.opts.type=="slide"){
            this.$sliderWrapper.each((index1, ele1)=> {
                $(ele1).css({width:this.$sliderContainer.width()*this.listLengthArray[index1]});
                $(ele1).find(this.$sliderList).each((index2, ele2)=> {
                    $(ele2).css({width:this.$sliderContainer.width()});
                });
            });
        };
    }

    autoPlay(){
        this.autoState = setTimeout(()=>{
            this.autoPlay();
            this.next();
        }, this.opts.interval);
    };

    display(){
        this.classRemove();
        this.classAdd();

        switch(this.opts.type){
            case "fade":
                this.fadeType();
                break;
            case "slide":
                this.slideType();
                break;
        };

        this.prevDepth();
    };

    fadeType(){
        this.hide();
        this.show();
    };

    slideType(){
        this.current.depth1posX = $(`[data-wrapper="${this.current.depth1Id}"]`).position().left;
        this.current.depth2posX = $(`[data-wrapper="${this.current.depth1Id}"]`).find(`[data-slider="${this.current.depth2Id}"]`).position().left;

        this.$sliderContainer.stop().animate({left:-(this.current.depth1posX+this.current.depth2posX)});
    };

    currentMove(e, str){
        switch (str) {
            case "thumb":
                this.current.depth1Id = $(e.currentTarget).data("thumb");
                this.current.depth2Id = this.depth2first[$(e.currentTarget).index()];
                if(this.current.depth1Id==this.previous.depth1Id) return false;
            break;
            case "paging":
                this.current.depth1Id = $(e.currentTarget).parent(`[data-paging="${this.current.depth1Id}"]`).data("paging");
                this.current.depth2Id = $(e.currentTarget).data("pthumb");
                if(this.current.depth2Id==this.previous.depth2Id) return false;
            break;

        }
        this.display();
    }

    prev(){
        this.current1Num = this.parentArray.indexOf(this.current.depth1Id);
        this.current2Num = this.childrenArray[this.current1Num].indexOf(this.current.depth2Id)-1;

        if(this.childrenArray[this.current1Num][this.current2Num]==undefined){
            if(this.parentArray.indexOf(this.current.depth1Id)==0){
                return this.endStr = true;
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
                clearTimeout(this.autoState);
                this.autoState = undefined;
                return this.endStr = true;
            }else{
                this.current1Num = this.parentArray.indexOf(this.current.depth1Id)+1;
                this.current2Num = this.childrenArray[this.current1Num].indexOf(this.childrenArray[this.current1Num][0]);
            }
        };

        this.current.depth1Id = this.parentArray[this.current1Num];
        this.current.depth2Id = this.childrenArray[this.current1Num][this.current2Num];

        this.display();
    };

    show(){
        $(`[data-wrapper="${this.current.depth1Id}"]`).stop().animate({opacity:"1", zIndex:"1"}, 600);
        $(`[data-wrapper="${this.current.depth1Id}"]`).find(`[data-slider="${this.current.depth2Id}"]`).stop().animate({opacity:"1", zIndex:"1"}, 600);
    };

    hide(){
        $(`[data-wrapper="${this.previous.depth1Id}"]`).stop().animate({opacity:"0", zIndex:"0"}, 600);
        $(`[data-wrapper="${this.previous.depth1Id}"]`).find(`[data-slider="${this.previous.depth2Id}"]`).stop().animate({opacity:"0", zIndex:"0"}, 600);
    };

    paginationSet(){
        $.each(this.parentArray, (index1, value1)=>{
            this.$el.append(
                "<ul data-paging='"+value1+"'></ul>"
            );
            $.each(this.childrenArray[index1],(index2, value2)=> {
                $("[data-paging='"+value1+"']").append(
                    "<li data-pthumb='"+value2+"'><button type='button'></button></li>"
                );
            });
        });
        this.$el.find(`[data-paging]`).css({display:"none"});
    };

    classAdd(){
        this.$thumbWrapper.find(`[data-thumb="${this.current.depth1Id}"]`).addClass("active");
        this.$el.find(`[data-paging="${this.current.depth1Id}"]`).css({display:"block"});
        this.$el.find(`[data-paging="${this.current.depth1Id}"]`).find(`[data-pthumb='${this.current.depth2Id}']`).addClass("active");
    };

    classRemove(){
        this.$thumbWrapper.find(`[data-thumb="${this.previous.depth1Id}"]`).removeClass("active");
        this.$el.find(`[data-paging="${this.previous.depth1Id}"]`).css({display:"none"});
        this.$el.find(`[data-paging="${this.previous.depth1Id}"]`).find(`[data-pthumb='${this.previous.depth2Id}']`).removeClass("active");
    };

    prevDepth(){
        this.previous.depth1Id = this.current.depth1Id;
        this.previous.depth2Id = this.current.depth2Id;
    }
};

export default Multipleslider;