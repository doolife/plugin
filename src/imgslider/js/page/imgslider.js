class Imgslider{
    constructor(opts){
        this.opts = $.extend(true, {
            el:"#slider1",
            idx:0,
            btn:true,
            page:true,
            type:"slide",
            wheel:false,
            infinity:false,
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

        this.listArr = [];
        this.currId;
        this.prevId;
        this.currNum;
        this.prevNum;
        this.conSize;
        this.infCheck;
        this.listLen;
        this.aniCheck = true;

        this.init();
    };

    init(){
        this.settingsBasic();
        this.settingsResize();
        this.controls();
        if(this.opts.type==="fade") this.settingsFade();
        if(this.opts.type==="slide") this.settingsSlide();
        if(this.opts.btn) this.btnPrevNext();
        if(this.opts.page) this.pagination(); this.activation();
    };

    settingsBasic(){
        this.$wrap.find("[data-slider]").each((idx, ele)=>{
            this.listArr.push($(ele).data("slider"));
            if(idx===this.opts.idx){
                this.currId = this.listArr[idx];
                this.currNum = this.listArr.indexOf(this.currId);
            }
        });
        this.listLen = this.listArr.length;
        this.methodDepth(this.opts.initCallback);
    };

    settingsResize(){
        this.conSize = (this.opts.direction==="y") ? this.$container.height() : this.$container.width();
    }

    settingsSlide(){
        let posValue;
        for( let i=0; i<this.listLen ; i++){
            if(this.opts.direction==="y"){
                posValue = (this.currNum===i) ? {top:0} :
                posValue = (this.currNum<i) ? {top:this.conSize} : {top:-this.conSize};
            }else{
                posValue = (this.currNum===i) ? {left:0} :
                posValue = (this.currNum<i) ? {left:this.conSize} : {left:-this.conSize};
            }
            this.$wrap.find(`[data-slider=${this.listArr[i]}]`).css(posValue, 500);
        }
        this.prevDepth();
    };

    settingsFade(){
        let opa, zix;
        for( let i=0; i<this.listLen ; i++){
            opa = (this.currNum===i) ? 1 : 0;
            zix = (this.currNum===i) ? 1 : 0;
            this.$wrap.find(`[data-slider=${this.listArr[i]}]`).css({opacity:opa, zIndex:zix}, 500);
        }
        this.prevDepth();
    };

    controls(){
        this.$el.on("click", "[data-btn]", evt=> this.separately(evt));
        this.$el.on("click", "[data-page]", evt=> this.separately(evt));
        this.$el.on("mousewheel DOMMouseScroll", evt=> {
            if(!this.opts.wheel) return;
            this.wheelEvent(evt);
            return false;
        });
    };

    wheelEvent(evt){
        if(this.wheelData(evt) > 0) {
            this.separately("down");
        }else {
            this.separately("up");
        }
    }

    wheelData(evt){
        if (evt.type === 'DOMMouseScroll') return evt.detail > 0 ? 1 : -1;
        if (evt.originalEvent.wheelDeltaY) return evt.originalEvent.wheelDeltaY > 0 ? -1 : 1;
        return evt.originalEvent.wheelDelta > 0 ? -1 : 1;
    }

    separately(evt){
        if(!this.aniCheck) return;
        if(this.infCheck!=="leftEnd") if($(evt.target).data("btn")==="prev" || evt==="up") this.currNum = this.currNum-1;
        if(this.infCheck!=="rightEnd") if($(evt.target).data("btn")==="next" || evt==="down") this.currNum = this.currNum+1;
        if($(evt.currentTarget).data("page")) this.currNum = $(evt.currentTarget).index();
        this.display();
    };

    display(){
        if(this.prevNum===this.currNum) return;
        this.aniCheck = false;
        if(this.opts.type==="fade") this.fadeMove();
        if(this.opts.type==="slide") this.slideMove();
    }

    activation(){
        this.$el.find("[data-paging='wrap']").find(`[data-page=${this.prevId}]`).removeClass("paging__list--on");
        this.$el.find("[data-paging='wrap']").find(`[data-page=${this.currId}]`).addClass("paging__list--on");
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
        this.$wrap.find(`[data-slider="${this.prevId}"]`).stop().animate(prevPosValue, 500);
        this.$wrap.find(`[data-slider="${this.currId}"]`).css(currPosValue).stop().animate(currPosInit, 500, ()=> this.aniComplete());
    };

    fadeMove(){
        this.firstEnd();
        this.$wrap.find(`[data-slider="${this.prevId}"]`).stop().animate({opacity:0, zIndex:0}, 500);
        this.$wrap.find(`[data-slider="${this.currId}"]`).stop().animate({opacity:1, zIndex:1}, 500, ()=> this.aniComplete());
    };

    firstEnd(){
        if(this.opts.infinity){
            if(this.currNum>=this.listLen) this.currNum = 0;
            if(this.currNum<=-1) this.currNum = this.listLen-1;
        }else{
            if(this.currNum>=this.listLen-1){
                this.infCheck = "rightEnd";
            }else if(this.currNum<=0){
                this.infCheck = "leftEnd";
            }else{
                this.infCheck = undefined;
            }
            this.methodDepth(this.opts.endPrevNext);
        };
        this.currId = this.listArr[this.currNum];
        this.methodDepth(this.opts.startCallback);
    };

    prevDepth(){
        this.prevId = this.listArr[this.currNum];
        this.prevNum = this.currNum;
    };

    aniComplete(){
        this.aniCheck = true;
        if(this.opts.page) this.activation();
        this.methodDepth(this.opts.endCallback);
        this.prevDepth();
    };

    methodDepth(funcValue){
        if (typeof funcValue == "function") funcValue.call(this);
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