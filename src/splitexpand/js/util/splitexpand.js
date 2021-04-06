class splitexpand {
    constructor(opts){
        this.opts = $.extend(true, {
            el:"element",
            resetArr:["33%", "34%", "33%"],
            over:"50%",
            down:"25%",
            speed:500,
            enterCallback(){
                // console.log(this.currIdx, "callback")
            },
            leaveCallback(){

            }
        }, opts);

        this.$el = $(this.opts.el);
        this.$list = this.$el.find(".split-expand__list");
        this.currIdx;
        this.prevIdx;
        this.setStr = null;
        this.overAction = true;

        this.init();
    };


    init(){
        this.controls();
        this.resetAct();
    };

    controls(){
        this.$list.on("mouseenter", evt=> this.overAct(evt));
        this.$el.on("mouseleave", ()=> this.resetAct());
    };

    overAct(evt){
        if(!this.overAction) return;
        $.each(this.$list, (index, element)=>{
            if(element===evt.currentTarget) {
                $(element).stop().animate({width:this.opts.over}, this.opts.speed);
                this.currIdx = index;
                this.$el.trigger("mouseEnter");
                this.methodDepth("enterCallback");
                this.prevIdx = this.currIdx;
            }else{
                $(element).stop().animate({width:this.opts.down}, this.opts.speed);
            };
        });
    };

    resetAct(){
        if(!this.overAction) return;
        $.each(this.$list, (index, element)=>{
            this.setStr && $(element).stop().animate({width:this.opts.resetArr[index]}, this.opts.speed);    // this.setStr === true 일 경우 뒤의 값을 반환
            this.setStr || $(element).css({width:this.opts.resetArr[index]});    // this.setStr === false 일 경우 뒤의 값을 반환
        });
        this.$el.trigger("mouseLeave");
        this.methodDepth("leaveCallback");
        this.setStr = true;
    };

    methodDepth(funcValue){
        if (typeof this.opts[`${funcValue}`] == "function") this.opts[`${funcValue}`].call(this);
    };

    on(event, func){
        this.$el.on(event, func);
    };
};

export default splitexpand;