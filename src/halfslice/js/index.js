import '../sass/index.scss';

var Halfslice = (function(){

    function Person(opts){
        this.opts = $.extend({
            el:"#halfSlice"
        }, opts);

        this.el = {
            wrap:"[data-half='wrap']",
            slice:"[data-half='slice']",
            layout:"[data-half='layout']",
            left:".left",
            right:".right"
        }

        this.state = {
            aniChk:true
        }

        this.init();
    };

    Person.prototype = {
        init:function(){
            this.resize();
        },
        resize:function(){
            var context = this;
            $(window).on("resize", function(){
                context.state.winWidth = $(window).width();
                context.state.winHeight = $(window).height();
                $(context.el.layout).css({width:context.state.winWidth, height:context.state.winHeight});
            }).resize();
        },
        slices:function(){
            var context = this;
            if(this.state.aniChk){
                this.state.aniChk = false;
                $(this.opts.el).css({width:50+"%"}).addClass("left");
                $(this.opts.el).clone().appendTo($(this.el.wrap)).removeClass("left").addClass("right");
                $(this.el.left).stop().animate({right:50+"%"}, 1000, function(){
                    $(context.el.right).remove();
                    $(context.opts.el).removeClass("left").css({width:"", right:""});
                    context.state.aniChk = true;
                });
                $(this.el.right).stop().animate({left:50+"%"}, 1000);
            }
        }
    };

    return Person;

})();

var halfslices = new Halfslice();

$(".btn_click").on("click", function(){
    halfslices.opts.el = "#halfSlice1";
    halfslices.slices();
});