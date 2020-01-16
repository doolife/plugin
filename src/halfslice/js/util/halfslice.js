class Halfslice {
    constructor(opts){
        this.opts = $.extend({
            el:"#contents"
        }, opts);

        this.$el = $(this.opts.el);
        this.$slice = this.$el.find("[data-half='slice']");
        this.$layout = this.$el.find("[data-half='layout']");

        this.isAnimation = true;
        this.winWidth = "";
        this.winHeight = "";

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
        if(!this.isAnimation) return;
        this.isAnimation = false;
        this.$slice.css({width:50+"%"}).addClass("slice__left");
        this.$slice.clone().appendTo(this.$el).removeClass("slice__left").addClass("slice__right");
        this.$el.find(".slice__left").stop().animate({right:50+"%"}, 1000, ()=>{
            this.$el.find(".slice__right").remove();
            this.$slice.removeClass("slice__left").css({width:"", right:""});
            this.isAnimation = true;
        });
        this.$el.find(".slice__right").stop().animate({left:50+"%"}, 1000);
    }
}

export default Halfslice;