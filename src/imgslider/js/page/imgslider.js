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

        this.listArr = [];
        this.currId;
        this.currNum;
        this.prevNum;
        this.listLen;
        this.ingAni = true;

        this.init();
    };

    init(){
        this.settings();
        this.clones();
        this.constrols();
        if(this.opts.page) this.pagination();
        this.display();
    };

    settings(){
        this.$wrap.find("[data-slider]").each((index, element)=>{
            this.listArr.push($(element).data("slider"));
            if(index==this.opts.idx){
                this.currId = this.listArr[index];
                this.currNum = this.listArr.indexOf(this.currId);
            }
        });
    };

    clones(){
        let firstClone = this.$list.first().clone().removeAttr("data-slider");
        let lastClone = this.$list.last().clone().removeAttr("data-slider");
        this.$wrap.append(firstClone);
        this.$wrap.prepend(lastClone);
        this.listLen = this.$wrap.find("li").length;
    };

    constrols(){
        this.$btnPrev.on("click", ()=>{
            if(!this.ingAni) return false;
            this.movePrev();
        });

        this.$btnNext.on("click", ()=>{
            if(!this.ingAni) return false;
            this.moveNext();
        });

        this.$el.on("click", "[data-page]", (e)=>{
            if(!this.ingAni) return false;
            this.currNum = $(e.currentTarget).index()+1;
            this.display();
        });
    };

    movePrev(){
        this.currNum = this.currNum-1;
        this.display();
    };

    moveNext(){
        this.currNum = this.currNum+1;
        this.display();
    };

    display(){
        if(this.prevNum==this.currNum) return false;
        this.ingAni = false;
        this.moveSlide();
    };

    classAdd(){
        this.$el.find("[data-paging='wrap']").find("li").eq(this.currNum-1).addClass("on");
    };

    classRemove(){
        this.$el.find("[data-paging='wrap']").find("li").removeClass("on");
    };

    moveSlide(){
        this.$wrap.stop().animate({left:-this.$container.width()*this.currNum}, 500, ()=>{
            this.endCall();
        });
        this.prevNum = this.currNum;
    };

    endCall(){
        this.ingAni = true;

        let cycle = (this.currNum==0 || this.currNum==this.listLen-1);
        if(cycle) this.currNum = (this.currNum === 0) ? this.listLen-2 : 1;

        this.$wrap.css({left:-this.$container.width()*this.currNum});

        if(this.opts.page){
            this.classRemove();
            this.classAdd();
        };
    };

    pagination(){
        let pageWrap = "<ul data-paging='wrap'></ul>";
        this.$el.append(pageWrap);
        $.each(this.listArr, (index, value)=>{
            this.$el.find("[data-paging='wrap']").append("" +
                "<li data-page='"+value+"'><button type='button'>"+(index+1)+"</button></li>" +
                "");
        });

    }
};

export default Imgslider;