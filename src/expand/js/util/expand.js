class Expand{
    constructor(opts){
        this.opts = $.extend(false ,{
            el:"#contents",
            interval:100,
            openCallback(){

            },
            closeCallback(){

            }
        }, opts);

        this.$wrap = $(this.opts.el).find("[data-expand='wrap']");
        this.$list = this.$wrap.find("[data-list]");
        this.$close = this.$wrap.find("[data-close]");
        this.$target = "";
        this.$endTarget = "";
        this.initNum = 0;
        this.isOpen = false;
        this.resetStr = true;
        this.widthArr = [];
        this.listhArr = [];

        this._init();
    }

    _init(){
        this._settings();
        this._controls();
        this._listReset();
    }

    _settings(){
        this.$list.each((idx, ele)=>{
            this.widthArr[idx] = $(ele).width();
            this.listhArr[idx] = $(ele).data("list");
        });
    }

    _controls(){
        this.$list.on("mouseenter", (evt)=>{
            this.$target = evt.currentTarget.getAttribute("data-list");
            if(this.isOpen === true) return;
            this.actionOver();
        });
        $(document).on("mouseleave", ()=>{
            if(this.isOpen === true) return;
            this._listReset();
        });
        this.$list.on("click", ()=>{
            if(this.isOpen === true) return;
            this.actionClick();
        });
        this.$close.on("click", ()=>{
            this.actionClose();
        });
    }

    _listReset(){
        let resetNum = (this.resetStr) ? 0 : 0.3 ;
        TweenMax.to(this.$list, resetNum, {x:0, y:0, width:"", height:"", scale:1});
        TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[0]}]`), resetNum, {top:0, right:"50%", bottom:0, left:0});
        TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[1]}]`), resetNum, {top:0, right:0, bottom:"50%", left:"50%"});
        TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[2]}]`), resetNum, {top:"50%", right:0, bottom:0, left:"50%"});
        TweenMax.to(this.$list.find("[data-bg]"), 0.4, {scale:1.3, zIndex:1});
        TweenMax.to(this.$list.find("[data-layer]"), 0.4, {zIndex:0});
        this.resetStr = false;
    }

    actionClick(){
        this.isOpen = true;
        TweenMax.set(this.$list, {zIndex:0});
        TweenMax.to(this.$wrap.find(`[data-list=${this.$target}]`), 0.5, {x:0, y:0, width:"100%", height:"100%", top:0, right:0, bottom:0, left:0, zIndex:1});
        TweenMax.to(this.$wrap.find(`[data-list=${this.$target}]`).find("[data-bg]"), 0.4, {autoAlpha:0});
        TweenMax.to(this.$wrap.find(`[data-list=${this.$target}]`).find("[data-layer]"), 0.5, {autoAlpha:1});

        if (this.$target === this.listhArr[0]) {
            TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[1]}]`), 0.5, {x:$(window).width() / 2, right:0});
            TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[2]}]`), 0.5, {x:$(window).width() / 2, right:0});
        }else if (this.$target === this.listhArr[1]) {
            TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[0]}]`), 0.5, {x:-$(window).width() / 2, left:0});
            TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[2]}]`), 0.5, {x:-$(window).width() / 2, y:$(window).height() / 2, width:$(window).width(), right:0, bottom:0});
        }else if (this.$target === this.listhArr[2]) {
            TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[0]}]`), 0.5, {x:-$(window).width() / 2, left:0});
            TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[1]}]`), 0.5, {x:-$(window).width() / 2, y:-$(window).height() / 2, width:$(window).width(), top:0, right:0});
        };
        this.methodDepth("openCallback");
    }

    actionClose(){
        this.$endTarget = this.$target;
        TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[0]}]`), 0.5, {x:0, width:$(window).width() / 2, left:0});
        TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[1]}]`), 0.5, {x:0, y:0, width:$(window).width() / 2, height:$(window).height() / 2, top:0, right:0, bottom:"50%", left:"50%"});
        TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[2]}]`), 0.5, {x:0, y:0, width:$(window).width() / 2, height:$(window).height() / 2, top:"50%", right:0, bottom:0, left:"50%"});
        TweenMax.to(this.$wrap.find(`[data-list=${this.$target}]`).find("[data-bg]"), 0.4, {autoAlpha:1});
        TweenMax.to(this.$wrap.find(`[data-list=${this.$target}]`).find("[data-layer]"), 0.5, {autoAlpha:0, onComplete:()=>{
                this.isOpen = false;
                this.resetStr = true;
                this.$wrap.trigger("end");
                this._listReset();
            }
        });
        this.methodDepth("closeCallback");
    }

    actionOver(){
        if (this.$target === this.listhArr[0]) {
            TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[0]}]`), 0.5, {x:this.opts.interval, left:-this.opts.interval});
            TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[1]}]`), 0.5, {x:this.opts.interval, y:this.initNum, top:this.initNum, right:this.opts.interval});
            TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[2]}]`), 0.5, {x:this.opts.interval, y:this.initNum, right:this.opts.interval, bottom:this.initNum});
        }else if (this.$target === this.listhArr[1]) {
            TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[0]}]`), 0.5, {x:-this.opts.interval, left:this.opts.interval});
            TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[1]}]`), 0.5, {x:-this.opts.interval, y:this.opts.interval, top:-this.opts.interval, right:-this.opts.interval});
            TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[2]}]`), 0.5, {x:-this.opts.interval, y:this.opts.interval, right:-this.opts.interval, bottom:this.opts.interval});
        }else if (this.$target === this.listhArr[2]) {
            TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[0]}]`), 0.5, {x:-this.opts.interval, left:this.opts.interval});
            TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[1]}]`), 0.5, {x:-this.opts.interval, y:-this.opts.interval, top:this.opts.interval, right:-this.opts.interval});
            TweenMax.to(this.$wrap.find(`[data-list=${this.listhArr[2]}]`), 0.5, {x:-this.opts.interval, y:-this.opts.interval, right:-this.opts.interval, bottom:-this.opts.interval});
        }

        TweenMax.to(this.$list.find("[data-bg]"), 0.5, {scale:1.3});
        TweenMax.to(this.$wrap.find(`[data-list=${this.$target}]`).find("[data-bg]"), 0.5, {scale:1});
    }

    on(event, func){
        this.$wrap.on(event, func);
    };

    methodDepth(funcValue){
        if (typeof this.opts[`${funcValue}`] == "function") this.opts[`${funcValue}`].call(this);
    };
}

export default Expand;