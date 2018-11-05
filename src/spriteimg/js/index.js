var Spriteimg = (function(){

    function Person(opts){

        this.opts = $.extend({
            el:"#sprite",
            frame:9,
            autoPlay:false,
            horizontal:true,
            fps:120,
            ratio:false,
            framCallback:function(num){

            },
            end:function(){

            }
        }, opts);

        this.el = {
            wrap:".sprite"
        };

        this.state = {
            isPlay:false,
            nowFrame:0,
            timer:""
        };

        this.init();
    }

    Person.prototype = {
        init:function() {
            var context = this;

            if(this.opts.ratio){
                $(window).on("resize", function(){
                    context.resize();
                }).resize();
            }else{
                if(this.opts.horizontal){
                    $(this.opts.el).find($(this.el.wrap)).css({width:$(this.opts.el).width()*this.opts.frame, height:$(this.opts.el).height()});
                }else{
                    $(this.opts.el).find($(this.el.wrap)).css({width:$(this.opts.el).width(), height:$(this.opts.el).height()*this.opts.frame});
                }

            }

            if(this.opts.autoPlay==true){
                this.play();
            }
        },
        resize:function(){
            this.state.setWidth = this.opts.retioWidth;
            this.state.setHeight = this.opts.retioHeight;

            this.state.ratio = this.state.setHeight/this.state.setWidth;

            this.state.windowWidth = $(window).width();
            this.state.windowHeight = $(window).height();

            if ((this.state.windowHeight/this.state.windowWidth) > this.state.ratio) {
                $(this.opts.el).css({width:this.state.windowHeight / this.state.ratio, height:this.state.windowHeight});
            }else{
                $(this.opts.el).css({width:this.state.windowWidth / this.state.ratio, height:this.state.windowWidth});
            }

            this.state.conWidth = $(this.opts.el).width();
            this.state.conHeight = $(this.opts.el).height();

            $(this.opts.el).css({left:(this.state.windowWidth - this.state.conWidth)/2, top:(this.state.windowHeight - this.state.conHeight)/2});

            if(this.opts.horizontal){
                $(this.opts.el).find($(this.el.wrap)).css({width:this.state.conWidth*this.opts.frame, height:this.state.conHeight});
            }else{
                $(this.opts.el).find($(this.el.wrap)).css({width:this.state.conWidth, height:this.state.conHeight*this.opts.frame});
            }
        },
        callback:function(num){
            if (typeof this.opts.framCallback == "function"){    // frame 값 콜백
                this.opts.framCallback(num);
            }
        },
        render:function(){
            if(this.opts.horizontal){
                $(this.opts.el).find($(this.el.wrap)).css({"background-position-x":-$(this.opts.el).width()*this.state.nowFrame});
            }else{
                // console.log(this.state.conHeight+" | "+this.state.nowFrame)
                $(this.opts.el).find($(this.el.wrap)).css({"background-position-y":-$(this.opts.el).height()*this.state.nowFrame});
            }

        },
        play:function(){
            var context = this;
            if(this.state.isPlay) return;
            this.state.isPlay = true;
            this.state.timer = setTimeout( function(){
                context.state.isPlay = false;
                context.state.nowFrame = context.state.nowFrame+1;
                context.callback(context.state.nowFrame);
                context.render();
                context.play();
                if(context.state.nowFrame>=context.opts.frame){
                    context.stop();
                    $(context.opts.el).trigger("end");
                }
            }, context.opts.fps);
        },
        seek:function(num){
            this.state.isPlay = false;
            this.state.nowFrame = num;
            clearTimeout(this.state.timer);
            this.render();
            this.play();
        },
        pause:function(){
            this.state.isPlay = false;
            clearTimeout(this.state.timer);
        },
        stop:function(){
            this.state.isPlay = false;
            this.state.nowFrame = 0;
            clearTimeout(this.state.timer);
            this.render();
            this.opts.end();
        },
        on:function(event, func){
            console.log(event)
            console.log(func)
            console.log($(this.opts.el))
            $(this.opts.el).on(event, func);
        }
    }

    return Person;

})();

var smoke = new Spriteimg({
    el:"#smoke",
    frame:22,
    autoPlay:false,
    horizontal:false,
    fps:120,
    ratio:true,
    retioWidth:600,
    retioHeight:344,
    framCallback:function(num){
        // console.log(num)
    },
    end:function(){
        // endNone();
    }
});

smoke.on("end", function(){
    console.log("end!!!!!!!!!!!!!!!!!");
    endNone();
})

var sequence1 = new Spriteimg({
    el:"#sprite1",
    frame:9,
    autoPlay:false,
    horizontal:true,
    fps:120,
    ratio:false,
    framCallback:function(num){
        // console.log(num)
    }
});

var sequence2 = new Spriteimg({
    el:"#sprite2",
    frame:9,
    autoPlay:false,
    horizontal:true,
    fps:60,
    framCallback:function(num){
        // console.log(num+" : he")
    }
});

function endNone(){
    console.log("yes!!!")
    $("#smoke").css({display:"none"});
}

$("#smoke").on("click", function(){
    smoke.play();
});

$("#btn1").find(".btn_play").on("click", function(){
    sequence1.play();
});

$("#btn1").find(".btn_pause").on("click", function(){
    sequence1.pause();
});

$("#btn1").find(".btn_stop").on("click", function(){
    sequence1.stop();
});

$("#btn1").find(".btn_seek").on("click", function(){
    sequence1.seek(2);
});

$("#btn2").find(".btn_play").on("click", function(){
    sequence2.play();
});

$("#btn2").find(".btn_pause").on("click", function(){
    sequence2.pause();
});

$("#btn2").find(".btn_stop").on("click", function(){
    sequence2.stop();
});

$("#btn2").find(".btn_seek").on("click", function(){
    sequence2.seek(5);
});