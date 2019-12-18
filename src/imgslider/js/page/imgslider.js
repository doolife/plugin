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
        this.$el.find("[data-paging='wrap']").find("[data-page]").eq(this.prevNum).removeClass("on");
        this.$el.find("[data-paging='wrap']").find("[data-page]").eq(this.currNum).addClass("on");
    };

    slideMove(){
        let currPosX, prevPosX;
        if(this.currNum>this.prevNum){
            currPosX = this.conWidth;
            prevPosX = -this.conWidth;
        }
        else{
            currPosX = -this.conWidth;
            prevPosX = this.conWidth;
        }

        if(this.currNum>=this.listLen){
            this.currNum = 0;
        }
        else if(this.currNum==-1){
            this.currNum = this.listLen-1;
        }

        if(this.opts.page) this.activation();
        this.$list.eq(this.prevNum).stop().animate({left:prevPosX}, 500);
        this.$list.eq(this.currNum).css({left:currPosX}).stop().animate({left:0}, 500, ()=>{
            this.ingAni = true;
        });
        this.prevNum = this.currNum;
    };

    pagination(){
        let pageWrap = "<ul data-paging='wrap'></ul>";
        this.$el.append(pageWrap);
        $.each(this.listArr, (idx, value)=>{
            this.$el.find("[data-paging='wrap']").append("" +
                "<li data-page='"+value+"'><button type='button'>"+(idx+1)+"</button></li>" +
                "");
        });
    }

    btnPrevNext(){
        let pnBtn = "<button type='button' data-btn='prev'>prev</button>"+"<button type='button' data-btn='next'>next</button>";
        this.$el.prepend(pnBtn);
    }
};

export default Imgslider;