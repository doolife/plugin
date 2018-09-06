var PlaceHolder = (function(){

    var $label = $("[data-label='check']"),
        $input = $("[data-input='check']");

    function Person(opts){
        this.opts = opts;
        this.init();
    }

    Person.prototype = {
        init : function(){
            var context = this;
            $.each($(this.opts.element), function(i, item){
                context.controls(item);
            });
        },
        controls : function(element){
            var context = this;

            if(!$(element).find($input).is(":disabled")){
                $(element).find($label).on("click", function(){
                    context.label(element);
                });
            }else{
                if($(element).find($input).val().length>0){
                    this.label(element);
                }
            }

            $(element).find($input).on("focusout", function(){
                context.input(element);
            });
        },
        label : function(element){
            $(element).find($label).css({display:"none"});
        },
        input : function(element){
            if ($(element).find($input).val().length==0) {
                $(element).find($label).css({display:"block"});
            }
        }
    }

    return Person;

})();

new PlaceHolder({
    element:["#placeHolder1", "#placeHolder2", "#placeHolder3"]
});