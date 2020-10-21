class Draggable{
    constructor(opts){
        this.opts = $.extend(true, {
            el:"#draggable",
            pos:"center"
        }, opts);

        this.$el = $(this.opts.el);
        this.$drag = this.$el.find("[data-draggable]");

        this.clicking = false;
        this.previousX;
        this.previousY;

        this.init();
    };

    init(){
        this.setting();
        this.constrols();
    };

    setting(){
        let elX, elY;
        switch (this.opts.pos) {
            case "center":
                elX = (this.$drag.width() - this.$el.width()) / 2;
                elY = (this.$drag.height() - this.$el.height()) / 2;
                break;
            case "leftTop":
                elX = 0;
                elY = 0;
                break;
            case "rightTop":
                elX = this.$drag.width()-this.$el.width();
                elY = 0;
                break;
            case "leftBottom":
                elX = 0;
                elY = this.$drag.height()-this.$el.height();
                break;
            case "rightBottom":
                elX = this.$drag.width()-this.$el.width();
                elY = this.$drag.height()-this.$el.height();
                break;
        }
        this.$el.scrollLeft(elX);
        this.$el.scrollTop(elY);
    }

    constrols(){
        this.$el.on("mousedown", evt=> this.mousedown(evt));
        this.$el.on("mouseup", ()=> this.clicking = false);
        this.$el.on("mousemove", evt=> this.mousemove(evt));
        this.$el.on("mouseleave", ()=> this.clicking = false);
    };

    mousedown(evt){
        evt.preventDefault();
        this.previousX = evt.clientX;
        this.previousY = evt.clientY;
        this.clicking = true;
    }

    mousemove(evt){
        if (this.clicking) {
            evt.preventDefault();
            this.$el.scrollLeft(this.$el.scrollLeft() + (this.previousX - evt.clientX));
            this.$el.scrollTop(this.$el.scrollTop() + (this.previousY - evt.clientY));
            this.previousX = evt.clientX;
            this.previousY = evt.clientY;
        }
    }

    methodDepth(funcValue){
        if (typeof this.opts[`${funcValue}`] == "function") this.opts[`${funcValue}`].call(this);
    }

    set reset(num){

    }
};

export default Draggable;