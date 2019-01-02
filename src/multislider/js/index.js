import '../sass/index.scss';

var Multislider = (function(){

    function Person(opts){
        this.opts = opts;
        this.selector = {
            cover:"[data-gallery='cover']",
            wrap:"[data-gallery='wrap']",
            list:"[data-slider='list']",
            children:"[data-slider='children']",
            prev:"[data-btn='prev']",
            next:"[data-btn='next']"
        };
        this.clone = {};
        this.state = {
            aniWidth:[350, 400, 450],
            aniHeight:[425, 486, 547],
            anichk:true
        };
        this.init();
    };

    Person.prototype = {
        init:function(){
            this.opts.idx = this.opts.idx+3;
            this.layout();
            this.controls();
        },
        layout:function(){
            this.state.width = $(this.selector.wrap).width();
            this.state.length = $(this.opts.el).find(this.selector.list).length-1;
            this.clones();
            this.state.sumLength = $(this.opts.el).find(this.selector.list).length-1;
            this.move();
        },
        clones:function(){
            this.clone.firstClone1 = $(this.opts.el).find(this.selector.list).eq(0).clone();
            this.clone.firstClone2 = $(this.opts.el).find(this.selector.list).eq(1).clone();
            this.clone.firstClone3 = $(this.opts.el).find(this.selector.list).eq(2).clone();
            this.clone.lastClone1 = $(this.opts.el).find(this.selector.list).eq(this.state.length).clone();
            this.clone.lastClone2 = $(this.opts.el).find(this.selector.list).eq(this.state.length-1).clone();
            this.clone.lastClone3 = $(this.opts.el).find(this.selector.list).eq(this.state.length-2).clone();
            $(this.opts.el).find(this.selector.wrap).append(this.clone.firstClone1).append(this.clone.firstClone2).append(this.clone.firstClone3);
            $(this.opts.el).find(this.selector.wrap).prepend(this.clone.lastClone1).prepend(this.clone.lastClone2).prepend(this.clone.lastClone3);
        },
        controls:function(){
            var context = this;
            $(this.opts.el).find($(this.selector.wrap).find($(this.selector.list))).on("click", function(e){
                e.preventDefault();
                if(context.opts.idx!=$(this).index()){
                    if(!context.state.anichk) return false;
                    context.opts.idx = $(this).index();
                    context.move();
                    context.state.anichk = false;
                }else{
                    console.log(context.opts.idx+"ok!")
                }
            });
        },
        move:function(){
            var context = this;
            this.state.aniSp = 300;
            this.anianchor();
            $(this.opts.el).find($(this.selector.wrap)).stop().animate({left:-this.state.width*this.opts.idx}, 400, function(){
                context.endcall();
                context.anianchor();
                context.state.anichk = true;
            });
        },
        endcall:function(){
            if(this.opts.idx==0){
                this.opts.idx = this.state.sumLength-5;
            }
            else if(this.opts.idx==1){
                this.opts.idx = this.state.sumLength-4;
            }
            else if(this.opts.idx==2){
                this.opts.idx = this.state.sumLength-3;
            }
            else if(this.opts.idx==this.state.sumLength){
                this.opts.idx = 5;
            }
            else if(this.opts.idx==this.state.sumLength-1){
                this.opts.idx = 4;
            }
            else if(this.opts.idx==this.state.sumLength-2){
                this.opts.idx = 3;
            }

            $(this.opts.el).find($(this.selector.wrap)).css({left:-this.state.width*this.opts.idx});

            this.state.aniSp = 0;
            this.state.anichk = true;
        },
        anianchor:function(){
            $(this.opts.el).find(this.selector.list).find(this.selector.children).stop().animate({width:this.state.aniWidth[0], height:this.state.aniHeight[0], marginLeft:-this.state.aniWidth[0]/2}, this.state.aniSp).removeClass("on");
            $(this.opts.el).find(this.selector.list).eq(this.opts.idx-1).find(this.selector.children).stop().animate({width:this.state.aniWidth[1], height:this.state.aniHeight[1], marginLeft:-this.state.aniWidth[1]/2}, this.state.aniSp);
            $(this.opts.el).find(this.selector.list).eq(this.opts.idx).find(this.selector.children).stop().animate({width:this.state.aniWidth[2], height:this.state.aniHeight[2], marginLeft:-this.state.aniWidth[2]/2}, this.state.aniSp).addClass("on");
            $(this.opts.el).find(this.selector.list).eq(this.opts.idx+1).find(this.selector.children).stop().animate({width:this.state.aniWidth[1], height:this.state.aniHeight[1], marginLeft:-this.state.aniWidth[1]/2}, this.state.aniSp);
        }
    };

    return Person;

})();

var multislider = new Multislider({
    el:"#multislider",
    idx:0
});