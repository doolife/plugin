var Tweenprogress = (function(){

    function Construct(opts){
        this.opts = $.extend({
            el:"#tweenprogress"
        }, opts);

        this.el = {
            $box:".box"
        };

        this.state = {};

        this.set = {
            ani:new TimelineMax({paused:true})
        }

        this.init();
    };

    Construct.prototype = {
        init:function(){
            this.settings();
            this.mouseWheel();
        },
        mouseWheel:function(){
            var context = this;
            $(window).on("scroll", function(){
                context.progress();
            });
        },
        settings:function(){
            this.set.ani.to($(this.opts.el).find(this.el.$box)[0], 1, {x:-200, y:-200})
            .to($(this.opts.el).find(this.el.$box)[1], 1, {x:200, y:-200}, "-=1.0")
            .to($(this.opts.el).find(this.el.$box)[2], 1, {x:-200, y:200}, "-=1.0")
            .to($(this.opts.el).find(this.el.$box)[3], 1, {x:200, y:200}, "-=1.0")
            .to($(this.opts.el).find(this.el.$box)[0], 1, {x:200})
            .to($(this.opts.el).find(this.el.$box)[1], 1, {y:200}, "-=1.0")
            .to($(this.opts.el).find(this.el.$box)[2], 1, {y:-200}, "-=1.0")
            .to($(this.opts.el).find(this.el.$box)[3], 1, {x:-200}, "-=1.0")
            .to($(this.opts.el).find(this.el.$box)[0], 1, {rotation:720})
            .to($(this.opts.el).find(this.el.$box)[1], 1, {rotation:-720}, "-=1.0")
            .to($(this.opts.el).find(this.el.$box)[2], 1, {rotation:720}, "-=1.0")
            .to($(this.opts.el).find(this.el.$box)[3], 1, {rotation:-720}, "-=1.0")
            .to($(this.opts.el).find(this.el.$box)[0], 1, {x:0, y:0})
            .to($(this.opts.el).find(this.el.$box)[1], 1, {x:0, y:0}, "-=1.0")
            .to($(this.opts.el).find(this.el.$box)[2], 1, {x:0, y:0}, "-=1.0")
            .to($(this.opts.el).find(this.el.$box)[3], 1, {x:0, y:0}, "-=1.0")
            .to($("#progress"), this.set.ani.duration(), {width:"100%"}, 0);
        },
        progress:function(){
            if(this.state.scTop>=1) this.state.scTop = 1;
            this.state.scTop = $(window).scrollTop() / ($(document).height() - $(window).height());
            this.set.ani.progress(this.state.scTop);
        }
    };

    return Construct;

})();

var tweenprogress = new Tweenprogress({
    el:"#tweenprogress"
});