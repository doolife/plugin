class Movingslider{
    constructor(opts){
        this.opts = $.extend(true, {
            el:"#slider1",
            idx:0,
            total:4,
            smallWidth:100,
            smallHeight:100,
            largeWidth:300,
            largeHeight:300,
            expand:2,
            speed:500,
            endCallback(){

            }
        }, opts);

        this.$el = $(this.opts.el);
        this.$btn = this.$el.find("[data-btn]");
        this.$cover = this.$el.find("[data-cover]");
        this.$wrap = this.$el.find("[data-wrap]");
        this.$list = this.$wrap.find("[data-list]");
        this.$listCon;
        this.$slideList;

        this.stCurrId;
        this.stPrevId;
        this.endCurrId;
        this.endPrevId;
        this.stCurrNum;
        this.stPrevNum;
        this.endCurrNum;
        this.realCurrNum;
        this.realPrevNum;
        this.endPrevNum;
        this.inPrevNum;
        this.isAni = true;
        this.lenght;
        this.realLength = this.$list.lenght;

        this.init();
    };

    init(){
        this.clones();
        this.settings();
        this.constrols();
        this.moving();
    };

    settings(){
        this.inCurrNum = this.opts.idx+this.opts.total;
        this.$slideList = this.$wrap.find("[data-list]");
        this.$listCon = this.$slideList.find("[data-con]");
        this.lenght = this.$slideList.length;
    };

    clones(){
        let firstClone = [];
        let lastClone = [];
        for(let i=0, len=this.opts.total ; i<len ; i++ ){
            firstClone = this.$list.eq(i).clone();
            this.$wrap.append(firstClone);
        };
        for(let i=1, len=this.opts.total+1 ; i<len ; i++ ){
            lastClone = this.$list.eq(this.$list.length-i).clone();
            this.$wrap.prepend(lastClone);
        };
    };

    constrols(){
        this.$btn.on("click", evt=> this.separately(evt));
        this.$wrap.on("click", "[data-list]", evt=> this.separately(evt));
    };

    separately(evt){
        if(!this.isAni) return;
        if($(evt.target).data("btn")==="prev") this.inCurrNum = this.inCurrNum-1;
        if($(evt.target).data("btn")==="next") this.inCurrNum = this.inCurrNum+1;
        if($(evt.currentTarget).data("list")) this.inCurrNum = $(evt.currentTarget).index();
        if(this.inPrevNum===this.inCurrNum) return;
        this.moving();
    };

    moving(){
        this.isAni = false;
        this.realCurrNum = this.inCurrNum;
        this.endCall("start");
        this.slideSet(true);

        this.$wrap.stop().animate({left:-(this.inCurrNum-this.opts.expand)*this.opts.smallWidth}, this.opts.speed, ()=>{
            this.endCall("end");
            this.slideSet(false);
            this.isAni = true;
        });

        this.inPrevNum = this.inCurrNum;
        this.realPrevNum = this.inPrevNum;
    };

    endCall(str){
        let cycle = (
            this.inCurrNum===(this.opts.total-1) ||
            this.inCurrNum===(this.opts.total-2) ||
            this.inCurrNum===this.lenght-this.opts.total ||
            this.inCurrNum===this.lenght-this.opts.total+1
        );

        if(cycle){
            switch(this.inCurrNum){
                case (this.opts.total-1) :
                    if(str==="start") this.realCurrNum = this.lenght-(this.opts.total+1);
                    if(str==="end") this.inCurrNum = this.lenght-(this.opts.total+1);
                    break;
                case (this.opts.total-2) :
                    if(str==="start") this.realCurrNum = this.lenght-(this.opts.total+2);
                    if(str==="end") this.inCurrNum = this.lenght-(this.opts.total+2);
                    break;
                case this.lenght-this.opts.total :
                    if(str==="start") this.realCurrNum = this.opts.total;
                    if(str==="end") this.inCurrNum = this.opts.total;
                    break;
                case this.lenght-this.opts.total+1 :
                    if(str==="start") this.realCurrNum = this.opts.total+1;
                    if(str==="end") this.inCurrNum = this.opts.total+1;
                    break;
            }
            if(str==="end") this.$wrap.css({left:-(this.inCurrNum-this.opts.expand)*this.opts.smallWidth});
        }
    }

    slideSet(str){
        let aniObjsmall = {marginTop:-this.opts.smallHeight/2, marginLeft:-this.opts.smallWidth/2, width:this.opts.smallWidth, height:this.opts.smallHeight};
        let aniObjLarge = {marginTop:-this.opts.largeHeight/2, marginLeft:-this.opts.largeWidth/2, width:this.opts.largeWidth, height:this.opts.largeHeight};
        if(str){
            this.$slideList.stop().animate({width:this.opts.smallWidth}, this.opts.speed);
            this.$slideList.eq(this.inCurrNum).stop().animate({width:this.opts.largeWidth}, this.opts.speed);
            this.$slideList.find(this.$listCon).stop().animate(aniObjsmall, this.opts.speed);
            this.$slideList.eq(this.inCurrNum).find(this.$listCon).stop().animate(aniObjLarge, this.opts.speed);
            this.startStatus(true);
            this.methodDepth("startCallback");
            this.startStatus(false);
        }else{
            this.$slideList.css({width:this.opts.smallWidth});
            this.$slideList.eq(this.inCurrNum).css({width:this.opts.largeWidth});
            this.$slideList.find(this.$listCon).css(aniObjsmall);
            this.$slideList.eq(this.inCurrNum).find(this.$listCon).css(aniObjLarge);
            this.endStatus(true);
            this.methodDepth("endCallback");
            this.endStatus(false);
        }
        this.addRemove();
    }

    startStatus(str){
        if(str){
            this.stCurrNum = this.realCurrNum-this.opts.total;
            this.stCurrId = this.$slideList.eq(this.stCurrNum+this.opts.total).data("list");
        }else{
            this.stPrevNum = this.stCurrNum;
            this.stPrevId = this.$slideList.eq(this.stPrevNum+this.opts.total).data("list");
        }
    }

    endStatus(str){
        if(str){
            this.endCurrNum = this.inCurrNum-this.opts.total;
            this.endCurrId = this.$slideList.eq(this.endCurrNum+this.opts.total).data("list");
        }else{
            this.endPrevNum = this.endCurrNum;
            this.endPrevId = this.$slideList.eq(this.endPrevNum+this.opts.total).data("list");
        }
    }

    addRemove(){
        this.$slideList.removeClass("moving-slider__list--on");
        this.$slideList.eq(this.inCurrNum).addClass("moving-slider__list--on");
    }

    methodDepth(funcValue){
        if (typeof this.opts[`${funcValue}`] == "function") this.opts[`${funcValue}`].call(this);
    }

    set reset(num){
        this.inCurrNum = num+this.opts.total;
        this.moving();
    }
};

export default Movingslider;