class splitexpand {
    constructor(opts){
        this.opts = $.extend(true, {
            el:"element",
            resetArr:["33%", "34%", "33%"],
            over:"50%",
            down:"25%"
        }, opts);

        this.setStr = true;
        this.$ele = $(this.opts.el).find(".split-expand__list");

        this.init();
    };


    init(){
        this.controls();
        this.resetWidth();
    };

    controls(){
        this.$ele.on({
            mouseenter:(e)=>{
                this.$ele.stop().animate({width:this.opts.down});
                $(e.target).stop().animate({width:this.opts.over});
            },
            mouseleave:()=>{
                this.resetWidth();
            }
        });
    };

    resetWidth(){
        $.each(this.$ele, (index, element)=>{
            if(this.setStr){
                $(element).css({width:this.opts.resetArr[index]});
                return;
            }
            $(element).stop().animate({width:this.opts.resetArr[index]});
        });
        this.setStr = false;
    };
};

export default splitexpand;