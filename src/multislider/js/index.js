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

            // $.each($(this.opts.el).find($(this.selector.list)), function(index, item){
            //     $(item).attr("idx", ""+index+"");
            // });

            this.clones();
            // this.move();

            this.state.lastLength = $(this.opts.el).find(this.selector.list).length-1;

            TweenMax.to([$(this.opts.el).find(this.selector.wrap)], 0, {transform:"translateX(-"+(Number(this.opts.idx)+5)*100+"%)"});
        },
        clones:function(){
            this.clone.firstClone1 = $(this.opts.el).find(this.selector.list).first(this.selector.list).clone();
            this.clone.firstClone2 = $(this.opts.el).find(this.selector.list).eq(1).clone();
            this.clone.firstClone3 = $(this.opts.el).find(this.selector.list).eq(2).clone();
            this.clone.firstClone4 = $(this.opts.el).find(this.selector.list).eq(3).clone();
            this.clone.firstClone5 = $(this.opts.el).find(this.selector.list).eq(4).clone();
            this.clone.lastClone1 = $(this.opts.el).find(this.selector.list).last(this.selector.list).clone();
            this.clone.lastClone2 = $(this.opts.el).find(this.selector.list).eq($().length-2).clone();
            this.clone.lastClone3 = $(this.opts.el).find(this.selector.list).eq($().length-3).clone();
            this.clone.lastClone4 = $(this.opts.el).find(this.selector.list).eq($().length-4).clone();
            this.clone.lastClone5 = $(this.opts.el).find(this.selector.list).eq($().length-5).clone();

            $(this.opts.el).find(this.selector.wrap).append(this.clone.firstClone1).append(this.clone.firstClone2).append(this.clone.firstClone3).append(this.clone.firstClone4).append(this.clone.firstClone5);
            $(this.opts.el).find(this.selector.wrap).prepend(this.clone.lastClone1).prepend(this.clone.lastClone2).prepend(this.clone.lastClone3).prepend(this.clone.lastClone4).prepend(this.clone.lastClone5);
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
            multislider.state.cycle = (5>multislider.opts.idx || multislider.state.length-1<=multislider.opts.idx);
            if(multislider.state.cycle){
                if(multislider.opts.idx==0){
                    multislider.opts.idx = 8;
                }
                else if(multislider.opts.idx==1){
                    multislider.opts.idx = 9;
                }
                else if(multislider.opts.idx==2){
                    multislider.opts.idx = 10;
                }
                else if(multislider.opts.idx==3){
                    multislider.opts.idx = 11;
                }
                else if(multislider.opts.idx==4){
                    multislider.opts.idx = 12;
                }
                else if(multislider.opts.idx==multislider.state.lastLength-6){
                    console.log("??")
                    multislider.opts.idx = 3;
                }
                else if(multislider.opts.idx==multislider.state.lastLength-5){
                    multislider.opts.idx = 4;
                }
                else if(multislider.opts.idx==multislider.state.lastLength-4){
                    multislider.opts.idx = 5;
                }
                else if(multislider.opts.idx==multislider.state.lastLength-3){
                    multislider.opts.idx = 6;
                }
                else if(multislider.opts.idx==multislider.state.lastLength-2){
                    multislider.opts.idx = 7;
                }
                else if(multislider.opts.idx==multislider.state.lastLength-1){
                    multislider.opts.idx = 8;
                }
                else if(multislider.opts.idx==multislider.state.lastLength){
                    multislider.opts.idx = 9;
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