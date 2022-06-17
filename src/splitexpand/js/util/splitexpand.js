class splitexpand {
    constructor(opts){
        this.opts = $.extend(true, {
            el:"element",
            resetArr:["33%", "34%", "33%"],
            over:"50%",
            down:"25%",
            maxOver:"60%",
            minDown:"20%",
            enterCallback(){
                // console.log(this.currIdx, "currIdx")
                // console.log(this.prevIdx, "prevIdx")
            },
            leaveCallback(){

            },
            clickCallback(){
                // console.log(this.currIdx, "currIdx")
            },
            enterCallbackMax(){
                // console.log(this.currIdx, "currIdx")
            }
        }, opts);

        this.$el = $(this.opts.el);
        this.$list = this.$el.find("[data-split]");
        this.currIdx;
        this.prevIdx;
        this.setStr = null;
        this.overAction = true;
        this.clickAction = null;

        this.init();
    };


    init(){
        this.controls();
        this.resetAct();
    };

    controls(){
        this.$list.on("click", evt=> {
            if(!this.opts.clickEvent) return;
            this.clickAct(evt);
        });
        this.$list.on("mouseenter", evt=> {
            if(!this.clickAction) {
                this.overAct(evt);
            }else{
                this.maxOverAct(evt);
            }
        });
        this.$el.on("mouseleave", ()=> this.resetAct());
    };

    clickAct(evt){
        this.clickAction = true;
        this.commAct(evt, "click");
    };

    overAct(evt){
        if(!this.overAction) return;
        this.commAct(evt, "over");
    };

    maxOverAct(evt){
        $.each(this.$list, (index, element)=>{
            if(element===evt.currentTarget) {
                this.currIdx = index;
                this.$el.trigger("mouseEnterMax");
                this.methodDepth("enterCallbackMax");
                this.prevIdx = this.currIdx;
            }
        });
    };

    commAct(evt, str){
        let strOver, strDown, strMethod, strTrigger;
        if(str==="click"){
            strOver = this.opts.maxOver;
            strDown = this.opts.minDown
            strTrigger = "mouseClick";
            strMethod = "clickCallback";
        }else{
            strOver = this.opts.over;
            strDown = this.opts.down
            strTrigger = "mouseEnter";
            strMethod = "enterCallback";
        }
        $.each(this.$list, (index, element)=>{
            if(element===evt.currentTarget) {
                $(element).stop().animate({width:strOver}, this.opts.speed);
                this.currIdx = index;
                this.$el.trigger(strTrigger);
                this.methodDepth(strMethod);
                this.prevIdx = this.currIdx;
            }else{
                $(element).stop().animate({width:strDown}, this.opts.speed);
            };
        });
    };

    resetAct(){
        if(!this.overAction) return;
        this.clickAction = null;
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