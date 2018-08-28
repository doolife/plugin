var Draggable = (function(){

    function Person(opts){
        this.opts = opts;
        this.init();
    }

    Person.prototype = {
        init : function(){
            var context = this;
            $.each($(this.opts.children), function(i, item){
                context.resizable(item);
            });
        },
        resizable : function(element){
            var wrapWidth = $(element).closest($(this.opts.parent)).width();
            $(element).resizable({
                handles:'e',
                minWidth:0,
                maxWidth:wrapWidth
            });
        }
    }

    return Person;

})();

// basic
var draggable = new Draggable({
    parent:"[data-drag='wrap']",
    children:"[data-drag='select']"
});

console.log(draggable)