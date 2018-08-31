var Spriteimg = (function(){

    var $wrap = $(".sprite"), timer;

    function Person(opts){
        this.opts = opts;
        this.state = {
            isPlay:false
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
        play : function(num){
            var context = this;
            if(this.state.isPlay) return;
            this.state.isPlay = true;
            if(num==undefined) num = 0;
            timer = setTimeout( function(){
                context.state.isPlay = false;
                num = num+1;
                context.callback(num);
                context.play(num);
                $(context.opts.el).find($wrap).css({"background-position-x":-$(context.opts.el).width()*num});
                if(num>=context.opts.frame){
                    context.pause();
                }
            }, context.opts.fps);
        },
        pause : function(){
            this.state.isPlay = false;
            clearTimeout(timer);
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
    fps:60,
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

$("#btn2").children(".btn_play").on("click", function(){
    sequence2.play();
});

$("#btn2").children(".btn_stop").on("click", function(){

});