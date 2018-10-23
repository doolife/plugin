var Imgslider = (function () {

    function Person(opts){
        this.opts = opts;
        this.el = {
            btn:"[data-btn]",
            wrap:"[data-gallery='wrap']",
            cover:"[data-gallery='cover']",
            list:"[data-slider='list']",
            pagingWrap:"[data-paging='wrap']",
            paging:"[data-paging='list']"

        };
        this.clone = {};
        this.state = {
            num:3,
            setChk:true,
            aniChk:true
        };
        this.init();
    };

    Person.prototype = {
        init:function(){
            this.settings();
            this.clones();
            this.controls();
            this.move();
        },
        settings:function(){
            this.opts.idx = this.opts.idx+this.opts.view;
            this.state.listWidth = $(this.opts.element).find(this.el.cover).find(this.el.list).width();
            this.state.listHeight = $(this.opts.element).find(this.el.cover).find(this.el.list).height();
            this.state.length = $(this.opts.element).find(this.el.list).length;
        },
        clones:function(){
            this.clone.firstClone1 = $(this.opts.element).find(this.el.list).eq(0).clone();
            this.clone.firstClone2 = $(this.opts.element).find(this.el.list).eq(1).clone();
            this.clone.firstClone3 = $(this.opts.element).find(this.el.list).eq(2).clone();
            this.clone.firstClone4 = $(this.opts.element).find(this.el.list).eq(3).clone();
            this.clone.firstClone5 = $(this.opts.element).find(this.el.list).eq(4).clone();
            this.clone.lastClone1 = $(this.opts.element).find(this.el.list).eq(this.state.length-1).clone();
            this.clone.lastClone2 = $(this.opts.element).find(this.el.list).eq(this.state.length-2).clone();
            this.clone.lastClone3 = $(this.opts.element).find(this.el.list).eq(this.state.length-3).clone();
            this.clone.lastClone4 = $(this.opts.element).find(this.el.list).eq(this.state.length-4).clone();
            this.clone.lastClone5 = $(this.opts.element).find(this.el.list).eq(this.state.length-5).clone();
            if(this.opts.view==1){
                $(this.opts.element).find(this.el.wrap).append(this.clone.firstClone1);
                $(this.opts.element).find(this.el.wrap).prepend(this.clone.lastClone1);
            }else if(this.opts.view==2){
                $(this.opts.element).find(this.el.wrap).append(this.clone.firstClone1).append(this.clone.firstClone2);
                $(this.opts.element).find(this.el.wrap).prepend(this.clone.lastClone1).prepend(this.clone.lastClone2);
            }else if(this.opts.view==3){
                $(this.opts.element).find(this.el.wrap).append(this.clone.firstClone1).append(this.clone.firstClone2).append(this.clone.firstClone3);
                $(this.opts.element).find(this.el.wrap).prepend(this.clone.lastClone1).prepend(this.clone.lastClone2).prepend(this.clone.lastClone3);
            }else if(this.opts.view==4){
                $(this.opts.element).find(this.el.wrap).append(this.clone.firstClone1).append(this.clone.firstClone2).append(this.clone.firstClone3).append(this.clone.firstClone4);
                $(this.opts.element).find(this.el.wrap).prepend(this.clone.lastClone1).prepend(this.clone.lastClone2).prepend(this.clone.lastClone3).prepend(this.clone.lastClone4);
            }else if(this.opts.view==5){
                $(this.opts.element).find(this.el.wrap).append(this.clone.firstClone1).append(this.clone.firstClone2).append(this.clone.firstClone3).append(this.clone.firstClone4).append(this.clone.firstClone5);
                $(this.opts.element).find(this.el.wrap).prepend(this.clone.lastClone1).prepend(this.clone.lastClone2).prepend(this.clone.lastClone3).prepend(this.clone.lastClone4).prepend(this.clone.lastClone5);
            }
        },
        controls:function(){
            var context = this;

            $(this.opts.element).find(this.el.btn).on("click", function(){
                context.state.target = $(this).data("btn");
                context.prevnext();
            });

            $(this.opts.element).on("click", "[data-paging='list']", function(){
                if(context.opts.idx!=($(this).index()+context.opts.view)){
                    if(!context.state.anichk) return false;
                    context.opts.idx = $(this).index()+context.opts.view;
                    context.move();
                    context.state.anichk = false;
                }else{
                    console.log("this")
                }
            });
        },
        prevnext:function(){
            if(!this.state.anichk) return false;
            if(this.state.target=="next"){
                this.opts.idx = this.opts.idx+1;
                this.move();
            }else if(this.state.target=="prev"){
                this.opts.idx = this.opts.idx-1;
                this.move();
            }
            this.state.anichk = false;
        },
        move:function(){
            var context = this;
            if(this.state.setChk==true){
                // this.opts.idx = (this.opts.idx>this.state.length || this.opts.idx<=0) ? 1 : this.opts.idx;
                $(this.opts.element).css({width:this.state.listWidth*this.opts.view, height:this.state.listHeight})
                $(this.opts.element).find(this.el.wrap).css({left:-this.state.listWidth*this.opts.idx});
                this.setEndcall();
                this.listAnchor();
            }else{
                $(this.opts.element).find(this.el.wrap).stop().animate({left:-this.state.listWidth*this.opts.idx}, function(){
                    context.moveEndcall();
                    context.listAnchor();
                });
            }
        },
        setEndcall:function(){
            if(this.opts.paging==true){
                this.pagingSet();
                this.pagingAnchor();
            }
            this.state.setChk = false;
            this.state.anichk = true;
        },
        moveEndcall:function(){
            this.state.cycle = (0===this.opts.idx || this.state.length+this.opts.view===this.opts.idx);
            if(this.state.cycle){
                this.opts.idx = (this.opts.idx === 0)? this.state.length : this.opts.view;
                $(this.opts.element).find(this.el.wrap).css({left:-this.state.listWidth*this.opts.idx});
            }
            if(this.opts.paging==true){
                this.pagingAnchor();
            }
            this.state.anichk = true;
        },
        listAnchor:function(){
            $(this.opts.element).find(this.el.list).removeClass("on");
            $(this.opts.element).find(this.el.list).eq(this.opts.idx).addClass("on");
        },
        pagingAnchor:function(){
            $(this.opts.element).find(this.el.paging).removeClass("on");
            $(this.opts.element).find(this.el.paging).eq(this.opts.idx-this.opts.view).addClass("on");
        },
        pagingSet:function(){
            $(this.opts.element).find(this.el.wrap).after("<ul data-paging='wrap'>");
            for ( var i=1 ; i<this.state.length+1 ; i++ ){
                $(this.opts.element).find(this.el.pagingWrap).append("<li data-paging='list'><button type='button'>"+i+"");
            }
        }
    };

    return Person;
})();

var imgslider1 = new Imgslider({
    element:"#slider1",
    idx:0,
    view:3,
    paging:true
});

var imgslider2 = new Imgslider({
    element:"#slider2",
    idx:1,
    view:2,
    paging:true
});

var imgslider3 = new Imgslider({
    element:"#slider3",
    idx:2,
    view:1,
    paging:true
});

var imgslider4 = new Imgslider({
    element:"#slider4",
    idx:3,
    view:5,
    paging:true
});