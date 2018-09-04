var Resizable = (function(){

    function Person(opts){
        this.opts = opts;
        this.init();
    }

    Person.prototype = {
        init : function(){
            var context = this;
            $.each($(this.opts.element).find($(this.opts.children)), function(i, item){
                context.opts.wrapWidth = $(item).closest($(context.opts.parent)).width();
                $(item).css({width:context.opts.halfWidth});
                context.resizable(item);
            });
        },
        resizable : function(element){
            var context = this;
            $(element).resizable({
                handles:'e',
                minWidth:0,
                maxWidth:this.opts.wrapWidth,
                start:function (event, ui) {
                    context.start(event, ui);
                },
                stop:function (event, ui) {
                    context.stop(event, ui);
                },
                resize:function (event, ui) {
                    context.resize(event, ui);
                }
            });
        },
        reset : function(element){
            $(element).css({width:this.opts.halfWidth});
        },
        start : function(event, ui){
            if (typeof this.opts.start != "function") return;
            this.opts.start(event, ui);
        },
        stop : function(event, ui){
            if (typeof this.opts.stop != "function") return;
            this.opts.stop(event, ui);
        },
        resize : function(event, ui){
            if (typeof this.opts.resize != "function") return;
            this.opts.resize(event, ui);
        }
    }

    return Person;

})();

// basic
var resizable1 = new Resizable({
    element:"#resizeable1",
    parent:"[data-drag='wrap']",
    children:"[data-drag='select']",
    halfWidth:"50%",
    start:function(event, ui){
        console.log("start callback resizable1")
    },
    stop:function(event, ui){
        console.log("stop callback resizable1")
    },
    resize:function(event, ui){
        console.log("resize callback resizable1")
    }
});

var resizable2 = new Resizable({
    element:"#resizeable2",
    parent:"[data-drag='wrap']",
    children:"[data-drag='select']",
    halfWidth:"30%"
});

$(".reset1").on("click", function(){
    resizable1.reset("#select1");
});

$(".reset2").on("click", function(){
    resizable2.reset("#select2");
});