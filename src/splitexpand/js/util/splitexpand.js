class splitexpand {
    constructor(opts){
        this.opts = $.extend(true, {
            el:"element",
            resetArr:["33%", "34%", "33%"],
            over:"50%",
            down:"25%"
        }, opts);

        this.setStr = null;
        this.$ele = $(this.opts.el).find(".split-expand__list");

        this.init();
    };


    init(){
        this.controls();
        this.resetWidth();
    };

    controls(){
        let context = this;
        this.$ele.on({
            mouseenter:function(){
                context.$ele.stop().animate({width:context.opts.down});
                $(this).stop().animate({width:context.opts.over});
            },
            mouseleave:function(){
                context.resetWidth();
            }
        });
    };

    resetWidth(){
        $.each(this.$ele, (index, element)=>{
            this.setStr && $(element).stop().animate({width:this.opts.resetArr[index]});    // this.setStr === true 일 경우 뒤의 값을 반환
            this.setStr || $(element).css({width:this.opts.resetArr[index]});    // this.setStr === false 일 경우 뒤의 값을 반환
        });
        this.setStr = true;
    };
};

export default splitexpand;