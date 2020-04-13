class splitexpand {
    constructor(opts){
        this.opts = $.extend(true, {
            el:"element",
            resetArr:["33%", "34%", "33%"],
            over:"50%",
            down:"25%",
            speed:500
        }, opts);

        this.$el = $(this.opts.el);
        this.$list = this.$el.find(".split-expand__list");
        this.setStr = null;

        this.init();
    };


    init(){
        this.controls();
        this.resetAct();
    };

    controls(){
        this.$list.on({
            mouseenter:(evt)=>{
                this.overAct(evt);
            },
            mouseleave:()=>{
                this.resetAct();
            }
        });
    };

    overAct(evt){
        $.each(this.$list, (index, element)=>{
            if(element===evt.currentTarget) {
                $(element).stop().animate({width:this.opts.over}, this.opts.speed);
            }else{
                $(element).stop().animate({width:this.opts.down}, this.opts.speed);
            };
        });
    }

    resetAct(){
        $.each(this.$list, (index, element)=>{
            this.setStr && $(element).stop().animate({width:this.opts.resetArr[index]}, this.opts.speed);    // this.setStr === true 일 경우 뒤의 값을 반환
            this.setStr || $(element).css({width:this.opts.resetArr[index]});    // this.setStr === false 일 경우 뒤의 값을 반환
        });
        this.setStr = true;
    };
};

export default splitexpand;