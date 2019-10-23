class ScrollMove {
    constructor(opts){
        this.opts = $.extend({
            el:"#element"
        }, opts);

        this.$el = $(this.opts.el);
    };

    move(){
        let offsetY = this.$el.offset().top;
        $("html, body").stop().animate({scrollTop:offsetY}, 600, ()=>{
            this.$el.trigger("end");
        });
    };

    on(event, fn){
        this.$el.on(event, fn);
    };
};

export default ScrollMove;