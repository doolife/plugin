class Imgslider{
    constructor(opts){
        this.opts = $.extend({
            el:"#slider1",
            idx:1,
            btn:true,
            page:true
        }, opts);

        this.$el = $(this.opts.el);
        this.$container = $(this.opts.el).find("[data-gallery='cover']");
        this.$wrap = $(this.opts.el).find("[data-gallery='wrap']");
        this.$list = this.$wrap.find("[data-slider]");

        this.listArr = [];
        this.currId;
        this.currNum;
        this.prevNum;
        this.ingAni = true;
        this.listLen = this.$wrap.find("li").length;
        this.conWidth = this.$container.width();

        this.init();
    };

    init(){
        this.settingsBasic();
        this.settingsPosition();
        this.constrols();
        if(this.opts.btn) this.btnPrevNext();
        if(this.opts.page) this.pagination(); this.activation();

    };

    settingsBasic(){
        this.$wrap.find("[data-slider]").each((idx, ele)=>{
            this.listArr.push($(ele).data("slider"));
            if(idx==this.opts.idx){
                this.currId = this.listArr[idx];
                this.currNum = this.listArr.indexOf(this.currId);
            }
        });
    };

    settingsPosition(){
        let posX;
        for( let i=0; i<this.listLen ; i++){
            if(this.currNum==i){
                posX = 0;
            }else if(this.currNum<i){
                posX = this.conWidth;
            }else if(this.currNum>i){
                posX = -this.conWidth;
            }
            this.$list.eq(i).css({left:posX}, 500);
        }
        this.prevNum = this.currNum;
    };

    constrols(){
        this.$el.on("click", "[data-btn]", (evt)=>{
            this.separately(evt);
        });

        this.$el.on("click", "[data-page]", (evt)=>{
            this.separately(evt);
        });
    };

    separately(evt){
        if(!this.ingAni) return;
        if($(evt.target).data("btn")=="prev") this.currNum = this.currNum-1;
        if($(evt.target).data("btn")=="next") this.currNum = this.currNum+1;
        if($(evt.currentTarget).data("page")) this.currNum = $(evt.currentTarget).index();
        if(this.prevNum==this.currNum) return;
        this.ingAni = false;
        this.slideMove();
    };

    activation(){
        this.$el.find("[data-paging='wrap']").find("[data-page]").eq(this.prevNum).removeClass("paging__list--on");
        this.$el.find("[data-paging='wrap']").find("[data-page]").eq(this.currNum).addClass("paging__list--on");
    };

    slideMove(){
        let currPosX = (this.currNum>this.prevNum) ? this.conWidth : -this.conWidth;
        let prevPosX = (this.currNum>this.prevNum) ? -this.conWidth : this.conWidth;

        if(this.currNum>=this.listLen) this.currNum = 0;
        if(this.currNum==-1) this.currNum = this.listLen-1;

        this.$list.eq(this.prevNum).stop().animate({left:prevPosX}, 500);
        this.$list.eq(this.currNum).css({left:currPosX}).stop().animate({left:0}, 500, ()=>{
            this.ingAni = true;
            if(this.opts.page) this.activation();
            this.prevNum = this.currNum;
        });
    };

    pagination(){
        let pageWrap = "<ul class='paging' data-paging='wrap''></ul>";
        this.$el.append(pageWrap);
        $.each(this.listArr, (idx, value)=>{
            this.$el.find("[data-paging='wrap']").append("" +
                "<li class='paging__list' data-page='"+value+"'><button type='button' class='paging__btn'>"+(idx+1)+"</button></li>" +
                "");
        });
    }

    btnPrevNext(){
        let pnBtn = "<button type='button' class='img-slider__btn img-slider__btn--prev' data-btn='prev'>prev</button>" +
            ""+"<button type='button' class='img-slider__btn img-slider__btn--next' data-btn='next'>next</button>";
        this.$el.prepend(pnBtn);
    }
};

export default Imgslider;