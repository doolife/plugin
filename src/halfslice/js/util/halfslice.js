class Halfslice {
    constructor(opts){
        this.opts = $.extend({
            el:"#contents",
            speed:1000,
            endCallback(){

            }
        }, opts);

        this.$el = $(this.opts.el);
        this.$slice = this.$el.find("[data-half='slice']");
        this.$layout = this.$el.find("[data-half='layout']");
        this.winWidth = "";
        this.winHeight = "";
        this.$left = "";
        this.$right = "";
        this.isAnimation = true;
        this.isReset = true;

        this.init();
    }

    init(){
        this.resize();
    }

    resize(){
        $(window).on("resize", ()=>{
            this.winWidth = $(window).width();
            this.winHeight = $(window).height();
            this.$layout.css({width:this.winWidth, height:this.winHeight});
        }).resize();
    }

    slices(){
        if(!this.isAnimation || !this.isReset) return;

        this.isAnimation = false;
        this.isReset = false;
        this.$slice.css({width:"50%"}).addClass("slice__left");
        this.$slice.clone().appendTo(this.$el).removeClass("slice__left").addClass("slice__right");

        this.$left = this.$el.find(".slice__left");
        this.$right = this.$el.find(".slice__right");

        this.$left.stop().animate({right:"50%"}, this.opts.speed, ()=>{
            this.isAnimation = true;
            this.methodDepth("endCallback");
            this.$el.trigger("end");
        });

        this.$right.stop().animate({left:"50%"}, this.opts.speed);
    }

    reset(){
        if(!this.isAnimation || this.isReset) return;
        this.isReset = true;
        this.$right.remove();
        this.$left.removeClass("slice__left").css({width:"", right:""});
    }

    on(event, func){
        this.$el.on(event, func);
    };

    methodDepth(funcValue){
        if (typeof this.opts[`${funcValue}`] == "function") this.opts[`${funcValue}`].call(this);
    };
}

export default Halfslice;