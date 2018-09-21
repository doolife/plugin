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

            this.opts.num = this.opts.idx;

            $.each($(this.opts.el).find($(this.selector.list)), function(index, item){
                $(item).attr("idx", ""+index+"");
            });

            this.clones();

            TweenMax.to([$(this.opts.el).find(this.selector.wrap)], 0, {transform:"translateX(-"+this.opts.idx*100+"%)"});
        },
        clones:function(){
            this.clone.first = $(this.opts.el).find(this.selector.list).first(this.selector.list).clone();
            this.clone.sfirst = $(this.opts.el).find(this.selector.list).eq(1).clone();
            this.clone.ssfirst = $(this.opts.el).find(this.selector.list).eq(2).clone();
            this.clone.last = $(this.opts.el).find(this.selector.list).last(this.selector.list).clone();
            this.clone.slast = $(this.opts.el).find(this.selector.list).eq($().length-2).clone();
            this.clone.sslast = $(this.opts.el).find(this.selector.list).eq($().length-3).clone();

            $(this.opts.el).find(this.selector.wrap).append(this.clone.first).append(this.clone.sfirst).append(this.clone.ssfirst);
            $(this.opts.el).find(this.selector.wrap).prepend(this.clone.last).prepend(this.clone.slast).prepend(this.clone.sslast);
        },
        controls:function(){
            var context = this;
            $(this.opts.el).find($(this.selector.wrap).find($(this.selector.list))).on("click", function(e){
                e.preventDefault();
                if(!context.state.anichk) return false;
                context.opts.idx = $(this).attr("idx");
                context.move();
                multislider.state.anichk = false;
            });
        },
        move:function(){
            TweenMax.to([$(this.opts.el).find(this.selector.wrap)], 0.4, {transform:"translateX(-"+(Number(this.opts.idx)+this.opts.num)*100+"%)", onComplete:this.endcall});
        },
        endcall:function(){
            console.log((Number(multislider.opts.idx)+multislider.opts.num)*100)
            TweenMax.to([$(multislider.opts.el).find(multislider.selector.wrap)], 0, {transform:"translateX(-"+(Number(multislider.opts.idx)+multislider.opts.num)*100+"%)"});
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
    idx:3
});

console.log(multislider)