class Imgslider{
    constructor(opts){
        this.opts = $.extend({
            el:"#slider1",
            idx:0,
            page:false
        }, opts);

        this.$el = $(this.opts.el);
        this.$btnPrev = $(this.opts.el).find("[data-btn='prev']");
        this.$btnNext = $(this.opts.el).find("[data-btn='next']");
        this.$container = $(this.opts.el).find("[data-gallery='cover']");
        this.$wrap = $(this.opts.el).find("[data-gallery='wrap']");
        this.$list = this.$wrap.find("[data-slider]");
        this.$pagingWrap = $(this.opts.el).find("[data-paging='wrap']");
        this.$pagingList = this.$pagingWrap.find("[data-paging]");

        this.listArray = [];
        this.currentId;
        this.currentNum;
        this.prevNum;
        this.listLength;
        this.ingAnimate = true;

        this.init();
    };

    init(){
        this.settings();
        this.clones();
        this.constrols();
        if(this.opts.page) this.pagination();;
        this.display();
    };

    settings(){
        this.$wrap.find("[data-slider]").each((index, element)=>{
            this.listArray.push($(element).data("slider"));
            if(index==this.opts.idx){
                this.currentId = this.listArray[index];
                this.currentNum = this.listArray.indexOf(this.currentId);
            }
        });
    };

    clones(){
        let firstClone = this.$list.first().clone().removeAttr("data-slider");
        let lastClone = this.$list.last().clone().removeAttr("data-slider");
        this.$wrap.append(firstClone);
        this.$wrap.prepend(lastClone);
        this.listLength = this.$wrap.find("li").length;
    };

    constrols(){
        this.$btnPrev.on("click", ()=>{
            if(!this.ingAnimate) return false;
            this.movePrev();
        });

        this.$btnNext.on("click", ()=>{
            if(!this.ingAnimate) return false;
            this.moveNext();
        });

        this.$el.on("click", "[data-page]", (e)=>{
            if(!this.ingAnimate) return false;
            this.currentNum = $(e.currentTarget).index()+1;
            this.display();
        });
    };

    movePrev(){
        this.currentNum = this.currentNum-1;
        this.display();
    };

    moveNext(){
        this.currentNum = this.currentNum+1;
        this.display();
    };

    display(){
        if(this.prevNum==this.currentNum) return false;
        this.ingAnimate = false;
        this.moveSlide();
    };

    classAdd(){
        this.$el.find("[data-paging='wrap']").find("li").eq(this.currentNum-1).addClass("on");
    };

    classRemove(){
        this.$el.find("[data-paging='wrap']").find("li").removeClass("on");
    };

    moveSlide(){
        this.$wrap.stop().animate({left:-this.$container.width()*this.currentNum}, 500, ()=>{
            this.endCall();
        });
        this.prevNum = this.currentNum;
    };

    endCall(){
        this.ingAnimate = true;

        let cycle = (this.currentNum==0 || this.currentNum==this.listLength-1);
        if(cycle) this.currentNum = (this.currentNum === 0) ? this.listLength-2 : 1;

        this.$wrap.css({left:-this.$container.width()*this.currentNum});

        if(this.opts.page){
            this.classRemove();
            this.classAdd();
        };
    };

    pagination(){
        let pageWrap = "<ul data-paging='wrap'></ul>";
        this.$el.append(pageWrap);
        $.each(this.listArray, (index, value)=>{
            this.$el.find("[data-paging='wrap']").append("" +
                "<li data-page='"+value+"'><button type='button'>"+(index+1)+"</button></li>" +
                "");
        });

    }
};

export default Imgslider;