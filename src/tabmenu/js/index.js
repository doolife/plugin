var Tabmenu = (function(){
    var $tabMenu = $("[data-tab='menu']");
    var $tabContents = $("[data-tab='contents']");

    function Person(opts){
        this.opts = opts;
        this.init();
    }

    Person.prototype = {
        init : function(){
            var context = this;
            $.each($(this.opts.element), function(i, item){
                context.controls(item);
                context.action(item, context.opts.idx[i]);
            });
        },
        controls : function(element){
            var context = this;
            $(element).find($tabMenu).on("click", function(e){
                var num = $(this).parent($tabMenu).index();
                context.action(element, num);
            });
        },
        action : function(element, num){
            $(element).find($tabContents).css({display:"none"}).eq(num).css({display:"block"});
            $(element).find($tabMenu).removeClass("on").eq(num).addClass("on");
            console.log(element+"|"+num)
        }
    };

    return Person;
})();


var tabmenu = new Tabmenu({
    element:["#tab1", "#tab2", "#tab3"],
    idx:[2, 3, 1]
});

tabmenu.action("#tab2", 0);