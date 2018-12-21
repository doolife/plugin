import '../sass/index.scss';

var Overflowscrolling = (function(){

    function Person(opt){
        this.opts = opt;
        this.state = {
            startEvent:false,
            moveEvent:false,
            endEvent:false,
            duration:600
        };
        this.init();
    }

    Person.prototype = {
        init : function(){
            this.state.width = ($(this.opts.element).children($(this.opts.children)).length-1)*$(this.opts.element).width();
            this.controls();
        },
        controls : function(){
            var context = this;
            $(this.opts.element).on("mousedown touchstart", function(e){
                e.preventDefault();
                context.state.startEvent = true;
                context.ondown(e);
            });

            $(this.opts.element).on("mousemove touchmove", function(e){
                if(!context.state.startEvent) return;
                context.state.moveEvent = true;
                if(e.type == "touchmove"){
                    context.state.moveX = context.state.startX-e.originalEvent.touches[0].pageX;
                }else{
                    context.state.moveX = context.state.startX-e.pageX;
                }
                context.onmove();
            });

            $(this.opts.element).on("mouseup touchend", function(){
                if(context.state.startEvent&&context.state.moveEvent){
                    context.onend();
                }else{
                    console.log("아님!!")
                }
                context.state.startEvent = false;
                context.state.moveEvent = false;
            });
        },
        ondown : function(e){
            if(!this.state.endEvent){
                if(e.type == "touchstart"){
                    this.state.startX = e.originalEvent.touches[0].pageX;
                }else{
                    this.state.startX = e.pageX;
                }
            }else{
                if(e.type == "touchstart"){
                    this.state.startX = this.state.startX+e.originalEvent.touches[0].pageX;
                }else{
                    this.state.startX = this.state.startX+e.pageX;
                }
            }
        },
        onmove : function(){
            if(this.state.moveX<=0 ) {
                this.state.moveX = 0;
            }else if(this.state.moveX>=this.state.width){
                this.state.moveX = this.state.width;
            }
            $(this.opts.element).css({"transform":"translateX("+(-this.state.moveX)+"px)"});
        },
        onend : function(){
            this.state.convNum = Number($(this.opts.element).css('transform').split(',')[4]);
            this.state.startX = Math.abs(this.state.convNum);
            this.state.endEvent = true;
        }
    }

    return Person;
})();

var overflowscrolling = new Overflowscrolling({
    element:"#scrolling1",
    children:"li"
});