var Imgslider = (function () {

    function Person(opts){
        this.opts = opts;
        this.selector = {
            btn:"[data-btn]",
            wrap:"[data-gallery='wrap']",
            cover:"[data-gallery='cover']",
            list:"[data-slider='list']",
            pagingWrap:"[data-paging='wrap']",
            paging:"[data-paging='list']"

        };
        this.state = {
            setChk:true
        };
        this.init();
    };

    Person.prototype = {
        init:function(){
            this.state.width = $(this.opts.element).find(this.selector.cover).width();
            this.state.height = $(this.opts.element).find(this.selector.cover).height();
            this.state.len = $(this.opts.element).find(this.selector.list).length;
            this.clones();
            this.controls();
            this.sliderAnimation();
        },
        clones:function(){
            this.state.first = $(this.opts.element).find(this.selector.list).first(this.selector.list).clone();
            this.state.last = $(this.opts.element).find(this.selector.list).last(this.selector.list).clone();
            $(this.opts.element).find(this.selector.wrap).append(this.state.first);
            $(this.opts.element).find(this.selector.wrap).prepend(this.state.last);
        },
        controls:function(){
            var context = this;

            $(this.opts.element).find(this.selector.btn).on("click", function(){
                context.state.target = $(this).data("btn");
                context.prevnext();
            });

            $(this.opts.element).on("click", "[data-paging='list']", function(){
                context.opts.idx = $(this).index()+1;
                context.sliderAnimation();
            });
        },
        prevnext:function(){
            if($(this.opts.element).find(this.selector.wrap).is(":not(:animated)")){
                if(this.state.target=="next"){
                    this.opts.idx = this.opts.idx+1;
                    this.sliderAnimation();
                }else if(this.state.target=="prev"){
                    this.opts.idx = this.opts.idx-1;
                    this.sliderAnimation();
                }
            }
        },
        sliderAnimation:function(){
            var context = this;
            if(this.state.setChk==true){
                this.opts.idx = (this.opts.idx>this.state.len || this.opts.idx<=0) ? 1 : this.opts.idx;
                $(this.opts.element).find(this.selector.wrap).css({width:this.state.width*(this.state.len+2), height:this.state.height, left:-this.state.width*this.opts.idx});
                if(this.opts.paging==true){
                    this.pagingSet();
                    this.sliderPaging();
                }
                this.state.setChk = false;
            }else{
                $(this.opts.element).find(this.selector.wrap).stop().animate({left:-this.state.width*this.opts.idx}, function(){
                    context.state.cycle = (0===context.opts.idx || context.state.len+1===context.opts.idx);
                    if(context.state.cycle){
                        context.opts.idx = (context.opts.idx === 0)? context.state.len : 1;
                        $(context.opts.element).find(context.selector.wrap).css({left:-context.state.width*context.opts.idx});
                    }
                    if(context.opts.paging==true){
                        context.sliderPaging();
                    }
                });
            }
        },
        sliderPaging:function(){
            $(this.opts.element).find(this.selector.paging).removeClass("on");
            $(this.opts.element).find(this.selector.paging).eq(this.opts.idx-1).addClass("on");
        },
        pagingSet:function(){
            $(this.opts.element).find(this.selector.wrap).after("<ul data-paging='wrap'>");
            for ( var i=1 ; i<this.state.len+1 ; i++ ){
                $(this.opts.element).find(this.selector.pagingWrap).append("<li data-paging='list'><button type='button'>"+i+"");
            }
        }
    };

    return Person;
})();

var imgslider1 = new Imgslider({
    element:"#slider1",
    idx:0,
    paging:false
});

var imgslider2 = new Imgslider({
    element:"#slider2",
    idx:5,
    paging:true
});

var imgslider3 = new Imgslider({
    element:"#slider3",
    idx:3,
    paging:true
});