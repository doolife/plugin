import '../sass/index.scss';

var Scrolleref = (function(){

    function Constructor(opts){
        this.opts = Object.assign({
            el:"#scrolleref",
            dp1:0,
            dp2:0,
            wsp:700,
            hash:false
        }, opts);

        this.el = {
            navWrap:"[data-nav='wrap']",
            gnb:"[data-nav='gnb']",
            snb:"[data-nav='snb']",
            dep1con:"[data-con='dep1con']",
            dep2con:"[data-con='dep2con']"
        };

        this.state = {
            dep1len:"",
            dep2len:[],
            isScrolling:false
        };

        console.log(this.opts)

        this.init();
    };

    Constructor.prototype = {
        init:function(){
            this.hashSet();
            this.settings();
            this.mouseWheel();
            this.controls();
            this.addClass();
        },
        hashSet:function(){
            var context = this;
            this.state.hashUrl = window.location.hash.split("#/");
            if(this.state.hashUrl[1]===undefined) return false;
            $.each($(this.el.dep1con), function(i, el){
                if($(el).attr("id")==context.state.hashUrl[1].replace(/^#+/, "")){
                    context.opts.dp1 = i;
                    context.opts.dp2 = 0;
                    return false;
                }
                $.each($(el).find(context.el.dep2con), function(i, el){
                    if($(el).attr("id")==context.state.hashUrl[1].replace(/^#+/, "")){
                        context.opts.dp2 = i;
                        context.state.parentId = $(el).parent(context.el.dep1con).attr("id");
                    }
                });
                if($(el).attr("id")==context.state.parentId){
                    context.opts.dp1 = i;
                }
            });
        },
        controls:function(){
            var context = this;
            $(this.el.gnb).find("li").on("click", function(e){
                e.preventDefault();
                e.stopPropagation();
                context.gnbAnchor(this);
            });
        },
        mouseWheel:function(){
            var context = this;
            $(this.opts.el).on("mousewheel DOMMouseScroll", function(e){
                context.wheelData(e);
            });
        },
        getwheelDalta:function(e){
            if(e.type == "DOMMouseScroll") return e.originalEvent.detail > 0 ? 1 : -1;
            if(e.originalEvent.wheelDeltaY) return e.originalEvent.wheelDeltaY > 0 ? -1 : 1;
            return e.originalEvent.wheelDelta > 0 ? -1 : 1;
        },
        wheelData:function(e){
            var context = this;
            if(!this.state.isScrolling){
                this.state.isScrolling = true;
                if(this.getwheelDalta(e) > 0) {
                    this.scrollDown();
                }else {
                    this.scrollUp();
                }
                setTimeout(function(){
                    context.state.isScrolling = false;
                }, this.opts.wsp);
            }
            return false;
        },
        settings:function(){
            var context = this;

            TweenMax.to([$(this.opts.el).find(this.el.dep1con)], 0, {autoAlpha:0});
            TweenMax.to([$(this.opts.el).find(this.el.dep2con)], 0, {autoAlpha:0});
            TweenMax.to([$(this.opts.el).find(this.el.dep1con).eq(this.opts.dp1)], 0, {autoAlpha:1});
            TweenMax.to([$(this.opts.el).find(this.el.dep1con).eq(this.opts.dp1).find(this.el.dep2con).eq(this.opts.dp2)], 0, {autoAlpha:1});

            this.state.dep1len = $(this.opts.el).find(this.el.dep1con).length;
            $.each($(this.opts.el).find(this.el.dep1con), function(i, el){
                context.state.dep2len[i] = $(el).find($(context.el.dep2con)).length;
            });
        },
        scrollDown:function(){
            if (this.opts.dp1 < this.state.dep1len-1) {
                if (this.state.dep2len[this.opts.dp1]==0) {
                    this.opts.dp1 = this.opts.dp1+1;
                }else{
                    if (this.opts.dp2 < this.state.dep2len[this.opts.dp1]-1) {
                        this.opts.dp2 = this.opts.dp2+1;
                    }else{
                        this.opts.dp1 = this.opts.dp1+1;
                        this.opts.dp2 = 0;
                    }
                }
            }else if (this.opts.dp1==this.state.dep1len-1) {
                if (this.opts.dp2 < this.state.dep2len[this.opts.dp1]-1) {
                    this.opts.dp2 = this.opts.dp2+1;
                }else{
                    return false;
                }
            }

            this.pageAnchor(this.opts.dp1, this.opts.dp2);
        },
        scrollUp:function(){
            if (this.opts.dp1 > 0) {
                if (this.state.dep2len[this.opts.dp1]==0) {
                    this.opts.dp1 = this.opts.dp1-1;
                    if (this.state.dep2len[this.opts.dp1] != 0) {
                        this.opts.dp2 = this.state.dep2len[this.opts.dp1]-1;
                    }
                }else{
                    if (this.opts.dp2 > 0) {
                        this.opts.dp2 = this.opts.dp2-1;
                    }else{
                        this.opts.dp1 = this.opts.dp1-1;
                        if (this.state.dep2len[this.opts.dp1] != 0) {
                            this.opts.dp2 = this.state.dep2len[this.opts.dp1]-1;
                        }
                    }
                }
            }else if (this.opts.dp1==0) {
                if (this.opts.dp2 > 0) {
                    this.opts.dp2 = this.opts.dp2-1;
                }else{
                    return false;
                }
            }

            this.pageAnchor(this.opts.dp1, this.opts.dp2);
        },
        pageAnchor:function(dp1Num, dp2Num){
            this.opts.dp1 = dp1Num;
            this.opts.dp2 = dp2Num;
            this.locationHash();
            this.layoutAnimation();
            this.addClass();
        },
        gnbAnchor:function(evthis){
            this.state.arr = [];
            this.state.arr.push($(evthis).index());

            if($(evthis).parents("li").length!=0){
                this.state.arr.push($(evthis).parents("li").index());
            }

            if(this.state.arr[1]==undefined){
                this.state.gnbNum = this.state.arr[0];
                this.state.snbNum = 0;
            }else{
                this.state.gnbNum = this.state.arr[1];
                this.state.snbNum = this.state.arr[0];
            }

            if(!(this.state.gnbNum==this.opts.dp1 && this.state.snbNum==this.opts.dp2)){
                this.pageAnchor(this.state.gnbNum, this.state.snbNum);
            }else{
                console.log("노놉!!!")
            }
        },
        layoutAnimation:function(){
            TweenMax.to([$(this.opts.el).find(this.el.dep1con)], 0.9, {autoAlpha:0});
            TweenMax.to([$(this.opts.el).find(this.el.dep2con)], 0.9, {autoAlpha:0});
            TweenMax.to([$(this.opts.el).find($(this.el.dep1con).eq(this.opts.dp1))], 0.9, {autoAlpha:1});
            TweenMax.to([$(this.opts.el).find($(this.el.dep1con).eq(this.opts.dp1)).find(this.el.dep2con).eq(this.opts.dp2)], 0.9, {autoAlpha:1});
        },
        locationHash:function(){
            if(this.opts.hash){
                if($(this.opts.el).find(this.el.gnb).children("li").eq(this.opts.dp1).find("li").eq(this.opts.dp2).find("a").attr("href")==undefined){
                    window.location.hash = $(this.opts.el).find(this.el.gnb).children("li").eq(this.opts.dp1).children("a").attr("href");
                }else{
                    window.location.hash = $(this.opts.el).find(this.el.gnb).children("li").eq(this.opts.dp1).find("li").eq(this.opts.dp2).find("a").attr("href");
                }
            }
        },
        addClass:function(){
            $(this.el.gnb).find("li").removeClass("on");
            $(this.el.gnb).children("li").eq(this.opts.dp1).addClass("on");
            $(this.el.gnb).children("li").eq(this.opts.dp1).find("li").eq(this.opts.dp2).addClass("on");
        }
    };

    return Constructor;

})();

var scrolleref = new Scrolleref({
    el:"#scrolleref",
    dp1:0,
    dp2:0,
    wsp:700,
    hash:true
});