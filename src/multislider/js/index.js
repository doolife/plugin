var Multislider = (function(){

    function Person(opts){
        this.opts = opts;
        this.selector = {
            cover:"[data-gallery='cover']",
            wrap:"[data-gallery='wrap']",
            list:"[data-slider='list']",
            prev:"[data-btn='prev']",
            next:"[data-btn='next']"
        };
        this.clone = {};
        this.state = {
            anichk:true
        };
        this.init();
    };

    Person.prototype = {
        init:function(){
            this.layout();
            this.controls();
        },
        layout:function(){

            this.state.num = this.opts.idx;
            this.state.length = $(this.opts.el).find(this.selector.list).length-1;

            $.each($(this.opts.el).find($(this.selector.list)), function(index, item){
                $(item).attr("idx", ""+index+"");
            });

            this.clones();
            // this.move();
            TweenMax.to([$(this.opts.el).find(this.selector.wrap)], 0, {transform:"translateX(-"+(Number(this.opts.idx)+4)*100+"%)"});
        },
        clones:function(){
            this.clone.first = $(this.opts.el).find(this.selector.list).first(this.selector.list).clone();
            this.clone.sfirst = $(this.opts.el).find(this.selector.list).eq(1).clone();
            this.clone.ssfirst = $(this.opts.el).find(this.selector.list).eq(2).clone();
            this.clone.sssfirst = $(this.opts.el).find(this.selector.list).eq(3).clone();
            this.clone.last = $(this.opts.el).find(this.selector.list).last(this.selector.list).clone();
            this.clone.slast = $(this.opts.el).find(this.selector.list).eq($().length-2).clone();
            this.clone.sslast = $(this.opts.el).find(this.selector.list).eq($().length-3).clone();
            this.clone.ssslast = $(this.opts.el).find(this.selector.list).eq($().length-4).clone();

            $(this.opts.el).find(this.selector.wrap).append(this.clone.first).append(this.clone.sfirst).append(this.clone.ssfirst).append(this.clone.sssfirst);
            $(this.opts.el).find(this.selector.wrap).prepend(this.clone.last).prepend(this.clone.slast).prepend(this.clone.sslast).prepend(this.clone.ssslast);
        },
        controls:function(){
            var context = this;
            $(this.opts.el).find($(this.selector.wrap).find($(this.selector.list))).on("click", function(e){
                e.preventDefault();
                if(!context.state.anichk) return false;
                context.opts.idx = $(this).index();
                context.move();
                multislider.state.anichk = false;
            });
        },
        move:function(){
            TweenMax.to([$(this.opts.el).find(this.selector.wrap)], 0.4, {transform:"translateX(-"+this.opts.idx*100+"%)", onComplete:this.endcall});
        },
        endcall:function(){
            console.log(multislider.state.length+" | "+multislider.opts.idx)
            multislider.state.cycle = (2>=multislider.opts.idx || multislider.state.length-1<=multislider.opts.idx);
            if(multislider.state.cycle){
                if(multislider.opts.idx==1){
                    multislider.opts.idx = 9;
                }
                else if(multislider.opts.idx==2){
                    multislider.opts.idx = 10;
                }
                else if(multislider.opts.idx==11){
                    multislider.opts.idx = this.state.num-1;
                }
                else if(multislider.opts.idx==12){
                    multislider.opts.idx = this.state.num;
                }
                console.log(multislider.opts.idx)
                TweenMax.to([$(multislider.opts.el).find(multislider.selector.wrap)], 0, {transform:"translateX(-"+multislider.opts.idx*100+"%)"});
            }
            multislider.state.anichk = true;

            // multislider.state.num = $(multislider.selector.list).length-4;
            // console.log(multislider.state.num)
            // multislider.state.cycle = (0==multislider.opts.idx || multislider.state.num==multislider.opts.idx);
            // multislider.state.anichk = true;
            // if(multislider.state.cycle){
            //     multislider.opts.idx = (multislider.opts.idx == 0)? multislider.state.num : 2;
            //     console.log(multislider.opts.idx)
            //     TweenMax.to([$(multislider.opts.el).find(multislider.selector.wrap)], 0, {transform:"translateX(-"+(multislider.opts.idx)*100+"%)"});
            // }
        }
    };

    return Person;

})();

var multislider = new Multislider({
    el:"#multislider",
    idx:0
});

console.log(multislider)