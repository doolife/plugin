var Draggable = (function(){

    var $drag = $("[data-drag='select']"), $wrap = $(".draggable_wrap");

    function Person(opts){
        this.opts = opts;
        this.init();
    }

    Person.prototype = {
        init : function(){
            var context = this;
            $.each($drag, function(i, item){
                context.resizable(item);
            });
        },
        resizable : function(element){
            var wrapWidth = $(element).parent($wrap).width();
            $(element).resizable({
                handles:'e',
                minWidth:0,
                maxWidth:wrapWidth
            });
        }
    }

    return Person;

})();

new Draggable();

// basic
// var Draggable = new Draggable({
//     element:["[data-drag='select']"]
// });