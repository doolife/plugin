var Spriteimg = (function(){

    var $wrap = $(".sprite"), timer;

    function Person(opts){
        this.opts = opts;
        this.state = {
            isPlay:false,
            nowFrame:0
        };
        this.init();
    }

    Person.prototype = {
        init : function() {
            console.log(this.opts)
            $(this.opts.el).find($wrap).css({width:$(this.opts.el).width()*this.opts.frame, height:$(this.opts.el).height(), backgroundImage:"url("+this.opts.path+")"});
            if(this.opts.autoPlay==true){
                this.play();
            }
        },
        callback : function(num){
            if (typeof this.opts.framCallback == "function"){    // frame 값 콜백
                this.opts.framCallback(num);
            }
        },
        render : function(){
            $(this.opts.el).find($wrap).css({"background-position-x":-$(this.opts.el).width()*this.state.nowFrame});
        },
        play : function(){
            var context = this;
            if(this.state.isPlay) return;
            this.state.isPlay = true;
            timer = setTimeout( function(){
                context.state.isPlay = false;
                context.state.nowFrame = context.state.nowFrame+1;
                context.callback(context.state.nowFrame);
                context.render();
                context.play();
                if(context.state.nowFrame>=context.opts.frame){
                    context.stop();
                }
            }, context.opts.fps);
        },
        seek : function(num){
            this.state.isPlay = false;
            this.state.nowFrame = num;
            clearTimeout(timer);
            this.render();
            this.play();
        },
        pause : function(){
            this.state.isPlay = false;
            clearTimeout(timer);
        },
        stop : function(){
            this.state.isPlay = false;
            this.state.nowFrame = 0;
            clearTimeout(timer);
            this.render();
        }
    }

    return Person;

})();

var sequence1 = new Spriteimg({
    el:"#sprite1",
    path:"/PLUGIN/dist/spriteimg/img/po.png",
    frame:10,
    autoPlay:false,
    fps:120,
    framCallback:function(num){
        console.log(num+" : ho", 'background: #222; color: #bada55')
    }
});

var sequence2 = new Spriteimg({
    el:"#sprite2",
    path:"/PLUGIN/dist/spriteimg/img/he.png",
    frame:20,
    autoPlay:false,
    fps:120,
    framCallback:function(num){
        console.log(num+" : he")
    }
});

$("#btn1").children(".btn_play").on("click", function(){
    sequence1.play();
});

$("#btn1").children(".btn_pause").on("click", function(){
    sequence1.pause();
});

$("#btn1").children(".btn_stop").on("click", function(){
    sequence1.stop();
});

$("#btn1").children(".btn_seek").on("click", function(){
    sequence1.seek(2);
});

$("#btn2").children(".btn_play").on("click", function(){
    sequence2.play();
});

$("#btn2").children(".btn_pause").on("click", function(){
    sequence2.pause();
});

$("#btn2").children(".btn_stop").on("click", function(){
    sequence2.stop();
});

$("#btn2").children(".btn_seek").on("click", function(){
    sequence2.seek(9);
});