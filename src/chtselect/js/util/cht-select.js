class ChtSelect{
    constructor(opts){
        this.opts = $.extend(false ,{
            el:"#contents",
            scale:1.2,
            leftX:-50,
            rightX:50
        }, opts);

        this.$el = $(this.opts.el);
        this.$wrap = this.$el.find("[data-cht-wrap]");
        this.$cover = this.$el.find("[data-cht-cover]");
        this.$list = this.$cover.find("[data-select]");
        this.$role = this.$wrap.find("[data-role]");
        this.$roleWrap = this.$wrap.find("[data-list-wrap]");
        this.listArr = [];

        this._init();
    }

    _init(){
        this._settings();
        this._controls();
    }

    _settings(){
        $.each(this.$list,(idx, el)=>{
            this.listArr[idx] = $(el).data("select");
        });
    }

    _controls(){
        this.$list.on("mouseenter", evt=> this.select(evt));
        this.$cover.on("mouseleave", evt=> this.reset());
    }

    select(evt){
        let roleCht = [], findCht = [], num = $(evt.currentTarget).index();
        for (let i=0, len=this.$list.length ; i<len ; i++ ){
            if(num===i){
                roleCht[i] = {zIndex:2};
                findCht[i] = {x:0, scale:this.opts.scale};
            }else if(num>i){
                roleCht[i] = {zIndex:1};
                findCht[i] = {x:this.opts.leftX, scale:1};
            }else{
                roleCht[i] = {zIndex:1};
                findCht[i] = {x:this.opts.rightX, scale:1};
            }
            TweenMax.to(this.$wrap.find(`[data-role=${this.listArr[i]}]`), 0.3, roleCht[i]);
            TweenMax.to(this.$wrap.find(`[data-role=${this.listArr[i]}]`).find("[data-list-wrap]"), 0.3, findCht[i]);
        };
    }

    reset(){
        TweenMax.to(this.$role, 0.3, {zIndex:1});
        TweenMax.to(this.$roleWrap, 0.3, {x:0, scale:1});
    }
}

export default ChtSelect;