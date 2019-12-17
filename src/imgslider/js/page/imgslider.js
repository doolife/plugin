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
        this.listLen;
        this.conWidth = this.$container.width();

        this.init();
    };

    init(){
        this.settings();
        this.clones();
        this.constrols();
        if(this.opts.btn) this.btnPrevNext();
        if(this.opts.page) this.pagination();
        this.display();
    };

    settings(){
        this.$wrap.find("[data-slider]").each((idx, ele)=>{
            this.listArr.push($(ele).data("slider"));
            if(idx==this.opts.idx){
                this.currId = this.listArr[idx];
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
        this.$el.on("click", "[data-btn]", (evt)=>{
            this.moveBtn(evt);
        });

        this.$el.on("click", "[data-page]", (evt)=>{
            this.moveBtn(evt);
        });
    };

    moveBtn(evt){
        if(!this.ingAni) return false;
        if($(evt.target).data("btn")=="prev") this.currNum = this.currNum-1;
        if($(evt.target).data("btn")=="next") this.currNum = this.currNum+1;
        if($(evt.currentTarget).data("page")) this.currNum = $(evt.currentTarget).index()+1;
        this.display();
    }

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
        this.$wrap.stop().animate({left:-this.conWidth*this.currNum}, 500, ()=>{
            this.endCall();
        });
        this.prevNum = this.currNum;
    };

    endCall(){
        this.ingAni = true;

        let cycle = (this.currNum==0 || this.currNum==this.listLen-1);
        if(cycle) this.currNum = (this.currNum === 0) ? this.listLen-2 : 1;

        this.$wrap.css({left:-this.conWidth*this.currNum});

        if(this.opts.page){
            this.classRemove();
            this.classAdd();
        };
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