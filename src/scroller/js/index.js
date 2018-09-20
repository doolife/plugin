var Scroller = (function(){

    function Person(opts){
        this.opts = opts;
        this.selector = {
            stwrap:"[data-sc='stwrap']",
            acwrap:"[data-sc='acwrap']",
            stcon:"[data-sc='section']",
            accon:"[data-sc='article']",
            gnb:"[data-sc='gnb']",
            snb:"[data-sc='snb']"
        };
        this.state = {
            x:[],
            y:[],
            resizeTimer:null,
            isScrolling:false,
            hashChk:true
        };
        this.init();
    };

    Person.prototype = {
        init:function(){
            // this.hashset();
            this.resize();
            this.mousewheel();
            this.controls();
        },
        controls:function(){
            var context = this;
            $(this.opts.el).find($(this.selector.gnb).find("li")).on("click", function(e){
                e.preventDefault();
                context.state.gnbnum = $(this).index();
                context.gnb();
            });
            $(this.opts.el).find($(this.selector.snb)).find("li").on("click", function(e){
                e.preventDefault();
                context.state.snbnum = $(this).index();
                console.log(context.state.snbnum)
                context.snb();
            });
        },
        layout:function(){
            var context = this;
            $.each($(this.opts.el).find($(this.selector.stcon)), function(i, el){
                TweenMax.to([$(el)], 0, {top:i*100+"%"});
                context.state.y[i] = $(el).position().top;
                $.each($(el).find($(context.selector.accon)), function(i, el){
                    TweenMax.to([$(el)], 0, {left:i*100+"%"});
                    context.state.x[i] = $(el).position().left;
                });
            });
            this.scrollmove();
            this.state.hashChk = false;
        },
        resize:function(){
            var context = this;
            $(window).resize(function (){
                if (context.state.resizeTimer) {
                    clearTimeout(context.state.resizeTimer);
                }
                context.state.resizeTimer = setTimeout(function() {
                    context.state.resizeTimer = null;
                    context.layout();
                }, 0);
            }).resize();
        },
        mousewheel:function(){
            var context = this;
            $(this.opts.el).on("mousewheel", function(e){
                if(!context.state.isScrolling){
                    context.state.isScrolling = true;
                    context.wheeldelta(e);
                    setTimeout(function(){
                        context.state.isScrolling = false;
                    }, context.opts.wheelsp);
                }
                return false;
            });
        },
        wheeldelta:function(e){
            if(e.originalEvent.wheelDelta < 0) {
                this.scrolldown();
            }else {
                this.scrollup();
            }
        },
        scrolldown:function(){
            if (this.opts.depth1 < $(this.opts.el).find($(this.selector.stcon)).length-1) {
                if ($(this.opts.el).find($(this.selector.stcon).eq(this.opts.depth1)).find($(this.selector.accon)).length==0) {
                    this.opts.depth1 = this.opts.depth1+1;
                    this.articleset();
                }else{
                    if (this.opts.depth2 < $(this.opts.el).find($(this.selector.stcon).eq(this.opts.depth1)).find($(this.selector.accon)).length-1) {
                        this.opts.depth2 = this.opts.depth2+1;
                    }
                    else{
                        this.opts.depth1 = this.opts.depth1+1;
                        this.opts.depth2 = 0;
                        this.articleset();
                    }
                }
            }
            else if (this.opts.depth1==$(this.opts.el).find($(this.selector.stcon)).length-1) {
                if (this.opts.depth2 < $(this.opts.el).find($(this.selector.stcon).eq(this.opts.depth1)).find($(this.selector.accon)).length-1) {
                    this.opts.depth2 = this.opts.depth2+1;
                }
            }
            this.scrollmove();
            // console.log(this.opts.depth1+" | "+this.opts.depth2+" | DOWN")
        },
        scrollup:function(){
            if (this.opts.depth1 > 0) {
                if ($(this.opts.el).find($(this.selector.stcon).eq(this.opts.depth1)).find($(this.selector.accon)).length==0) {
                    this.opts.depth1 = this.opts.depth1-1;
                    if ($(this.opts.el).find($(this.selector.stcon).eq(this.opts.depth1)).find($(this.selector.accon)).length != 0) {
                        this.opts.depth2 = $(this.opts.el).find($(this.selector.stcon).eq(this.opts.depth1)).find($(this.selector.accon)).length-1;
                        this.articleset();
                    }
                }else{
                    if (this.opts.depth2 > 0) {
                        this.opts.depth2 = this.opts.depth2-1;
                    }else{
                        this.opts.depth1 = this.opts.depth1-1;
                        if ($(this.opts.el).find($(this.selector.stcon).eq(this.opts.depth1)).find($(this.selector.accon)).length != 0) {
                            this.opts.depth2 = $(this.opts.el).find($(this.selector.stcon).eq(this.opts.depth1)).find($(this.selector.accon)).length-1;
                            this.articleset();
                        }
                    }
                }
            }
            else if (this.opts.depth1==0) {
                if (this.opts.depth2 > 0) {
                    this.opts.depth2 = this.opts.depth2-1;
                }
            }
            this.scrollmove();
            // console.log(this.opts.depth1+" | "+this.opts.depth2+" | UP")
        },
        gnb:function(){
            if (this.opts.depth1!=this.state.gnbnum) {
                this.opts.depth1 = this.state.gnbnum;
                this.opts.depth2 = 0;
                this.scrollmove();
                this.articleset();
            };
        },
        snb:function(){
            this.opts.depth2 = this.state.snbnum;
            this.scrollmove();
        },
        anchor:function(){
            console.log(this.opts.depth1+" | "+this.opts.depth2)
            $(this.opts.el).find($(this.selector.gnb)).children("li").removeClass("on");
            $(this.opts.el).find($(this.selector.gnb)).children("li").eq(this.opts.depth1).addClass("on");
            $(this.opts.el).find($(this.selector.stcon)).find($(this.selector.snb)).children("li").removeClass("on");
            $(this.opts.el).find($(this.selector.stcon)).eq(this.opts.depth1).find($(this.selector.snb)).children("li").eq(this.opts.depth2).addClass("on");
        },
        hashset:function(){
            var context = this;
            this.state.hash = window.location.hash.split("#/");
            this.state.hashId = $("#"+this.state.hash[1]).attr("id");
            $.each($(this.opts.el).find($(this.selector.stcon)), function(i, el){
                if($(el).attr("id")==context.state.hashId){
                    context.opts.depth1 = i;
                }
            });
        },
        scrollmove:function(){
            (this.state.hashChk)? this.state.rsp = 0 : this.state.rsp = 0.8;
            TweenMax.to([$(this.opts.el).find($(this.selector.stwrap))], this.state.rsp, {y:-this.state.y[this.opts.depth1], ease:Cubic.easeOut});
            TweenMax.to([$(this.opts.el).find($(this.selector.stcon)).eq(this.opts.depth1).find($(this.selector.acwrap))], this.state.rsp, {x:-this.state.x[this.opts.depth2], ease:Cubic.easeOut});
            this.anchor();
        },
        articleset:function(){
            TweenMax.to([$(this.opts.el).find($(this.selector.stcon).eq(this.opts.depth1)).find($(this.selector.acwrap))], 0, {x:-this.state.x[this.opts.depth2]});
        }
    };

    return Person;

})();

var scroller = new Scroller({
    el:"#scroller",
    depth1:0,
    depth2:0,
    wheelsp:700
});