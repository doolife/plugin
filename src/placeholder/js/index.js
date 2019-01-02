import '../sass/index.scss';

var PlaceHolder = (function(){

    function Person(opts){
        this.opts = $.extend({
            el:"#placeHolder"
        }, opts);

        this.el = {
            label:$("[data-label='check']"),
            input:$("[data-input='check']")
        };

        this.init();
    }

    Person.prototype = {
        init : function(){
            this.controls();
        },
        controls : function(){
            var context = this;

            if(!$(this.opts.el).find(this.el.input).is(":disabled")){
                $(this.opts.el).find(this.el.input).on("focus", function(){
                    context.label();
                });
            }else{
                if($(this.opts.el).find(this.el.input).val().length>0){
                    this.label();
                }
            }

            $(this.opts.el).find(this.el.input).on("focusout", function(){
                context.input();
            });
        },
        label : function(){
            $(this.opts.el).find(this.el.label).css({display:"none"});
        },
        input : function(){
            if ($(this.opts.el).find(this.el.input).val().length==0) {
                $(this.opts.el).find(this.el.label).css({display:"block"});
            }
        },
        delete:function(){
            $(this.opts.el).find(this.el.input).val("");
            this.input();
        }
    }

    return Person;

})();

var placeHolder1 = new PlaceHolder({
    el:"#placeHolder1"
});

var placeHolder2 = new PlaceHolder({
    el:"#placeHolder2"
});

var placeHolder3 = new PlaceHolder({
    el:"#placeHolder3"
});