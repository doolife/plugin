class Imgslider{
    constructor(opts){
        this.opts = $.extend({
            el:"#slider1",
            idx:0,
            btn:true,
            page:true,
            type:"slide",
            initCallback(currId, prevId, currNum, prevNum){

            },
            startCallback(currId, prevId, currNum, prevNum){

            },
            endCallback(currId, prevId, currNum, prevNum){

            }
        }, opts);

        this.$el = $(this.opts.el);
        this.$container = $(this.opts.el).find("[data-gallery='cover']");
        this.$wrap = $(this.opts.el).find("[data-gallery='wrap']");
        this.$list = this.$wrap.find("[data-slider]");

        this.listArr = [];
        this.currId;
        this.prevId;
        this.currNum;
        this.prevNum;
        this.conSize;
        this.aniCheck = true;
        this.listLen = this.$wrap.find("li").length;
        this.init();
    };

    init(){
        this.settingsBasic();
        this.settingsResize();
        if(this.opts.type=="fade") this.settingsFade();
        if(this.opts.type=="slide") this.settingsSlide();
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
        this.methodDepth(this.opts.initCallback);
    };

    settingsResize(){
        this.conSize = (this.opts.direction==="y") ? this.$container.height() : this.$container.width();
    }

    settingsSlide(){
        let posValue;
        for( let i=0; i<this.listLen ; i++){
            if(this.opts.direction==="y"){
                posValue = (this.currNum==i) ? {top:0} :
                posValue = (this.currNum<i) ? {top:this.conSize} : {top:-this.conSize};
            }else{
                posValue = (this.currNum==i) ? {left:0} :
                posValue = (this.currNum<i) ? {left:this.conSize} : {left:-this.conSize};
            }
            this.$list.eq(i).css(posValue, 500);
        }

        this.prevId = this.listArr[this.currNum];
        this.prevNum = this.currNum;
    };

    settingsFade(){
        let opa, zix;
        for( let i=0; i<this.listLen ; i++){
            opa = (this.currNum==i) ? 1 : 0 ;
            zix = (this.currNum==i) ? 1 : 0 ;
            this.$list.eq(i).css({opacity:opa, zIndex:zix}, 500);
        }

        this.prevId = this.listArr[this.currNum];
        this.prevNum = this.currNum;
    };

    constrols(){
        this.$el.on("click", "[data-btn]", evt=> this.separately(evt));
        this.$el.on("click", "[data-page]", evt=> this.separately(evt));
    };

    separately(evt){
        if(!this.aniCheck) return;
        if($(evt.target).data("btn")=="prev") this.currNum = this.currNum-1;
        if($(evt.target).data("btn")=="next") this.currNum = this.currNum+1;
        if($(evt.currentTarget).data("page")) this.currNum = $(evt.currentTarget).index();
        this.display();
    };

    display(){
        if(this.prevNum==this.currNum) return;
        this.aniCheck = false;
        if(this.opts.type=="fade") this.fadeMove();
        if(this.opts.type=="slide") this.slideMove();
    }

    activation(){
        this.$el.find("[data-paging='wrap']").find("[data-page]").eq(this.prevNum).removeClass("paging__list--on");
        this.$el.find("[data-paging='wrap']").find("[data-page]").eq(this.currNum).addClass("paging__list--on");
    };

    slideMove(){
        let currPosInit, currPosValue, prevPosValue;
        if(this.opts.direction==="y"){
            currPosInit = {top:0};
            currPosValue = (this.currNum>this.prevNum) ? {top:this.conSize} : {top:-this.conSize};
            prevPosValue = (this.currNum>this.prevNum) ? {top:-this.conSize} : {top:this.conSize};
        }else{
            currPosInit = {left:0};
            currPosValue = (this.currNum>this.prevNum) ? {left:this.conSize} : {left:-this.conSize};
            prevPosValue = (this.currNum>this.prevNum) ? {left:-this.conSize} : {left:this.conSize};
        }

        this.firstEnd();

        this.$list.eq(this.prevNum).stop().animate(prevPosValue, 500);
        this.$list.eq(this.currNum).css(currPosValue).stop().animate(currPosInit, 500, ()=> this.aniComplete());
    };

    fadeMove(){
        this.firstEnd();
        this.$list.eq(this.prevNum).stop().animate({opacity:0, zIndex:0}, 500);
        this.$list.eq(this.currNum).stop().animate({opacity:1, zIndex:1}, 500, ()=> this.aniComplete());
    };

    firstEnd(){
        if(this.currNum>=this.listLen) this.currNum = 0;
        if(this.currNum==-1) this.currNum = this.listLen-1;
        this.currId = this.listArr[this.currNum];
        this.methodDepth(this.opts.startCallback);
    };

    aniComplete(){
        this.aniCheck = true;
        if(this.opts.page) this.activation();
        this.methodDepth(this.opts.endCallback);
        this.prevId = this.listArr[this.currNum];
        this.prevNum = this.currNum;
    };

    methodDepth(funcValue){
        if (typeof funcValue == "function") funcValue(this.currId, this.prevId, this.currNum, this.prevNum);

    };

    pagination(){
        let pageWrap = "<ul class='paging' data-paging='wrap''></ul>";
        this.$el.append(pageWrap);
        $.each(this.listArr, (idx, value)=>{
            this.$el.find("[data-paging='wrap']").append("" +
                "<li class='paging__list' data-page='"+value+"'><button type='button' class='paging__btn'>"+(idx+1)+"</button></li>" +
                "");
        });
    };

    btnPrevNext(){
        let pnBtn = "<button type='button' class='img-slider__btn img-slider__btn--prev' data-btn='prev'>prev</button>" +
            ""+"<button type='button' class='img-slider__btn img-slider__btn--next' data-btn='next'>next</button>";
        this.$el.prepend(pnBtn);
    };
};

export default Imgslider;