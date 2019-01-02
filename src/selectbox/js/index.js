import '../sass/index.scss';

var Selectbox = (function(){

    function Constructor(opts){
        this.opts = $.extend({
            el:"#select1",
            scHeight:300
        }, opts);

        this.$title = "[data-select='title']",
        this.$listWrap = "[data-select='listWrap']",
        this.$list = "[data-select='list']",
        this.$noData = "[data-list='no']";

        this.init();
    }

    Constructor.prototype = {
        init : function(){
            this.controls();
        },
        controls : function(){
            var context = this;

            $(this.opts.el).on("click", this.$title, function(e){
                e.stopPropagation();
                context.display();
            });

            $(this.opts.el).on("click", this.$list, function(){
                context.select($(this).index());
            });

            $(document).on("click", function(){
                context.remove();
            });
        },
        display : function(){
            if($(this.opts.el).find(this.$title).attr("disabled")!="disabled"){
                if(!$(this.opts.el).find(this.$title).hasClass("active")){
                    this.remove();
                    this.active();
                    if ($(this.opts.el).find(this.$listWrap).height()>=this.opts.scHeight) {
                        $(this.opts.el).find(this.$listWrap).css({height:this.opts.scHeight, overflowY:"auto"});
                    }
                }else{
                    this.remove();
                }
            }
        },
        select : function(thisNum){
            var tagClone = $(this.opts.el).find(this.$list).eq(thisNum).contents().clone();
            $(this.opts.el).find(this.$title).empty().append(tagClone);
            this.remove();
            if(!$(this.opts.el).find(this.$title).hasClass("on")){
                $(this.opts.el).find(this.$title).addClass("on");
            }
        },
        active : function(){
            $(this.opts.el).find(this.$title).addClass("active");
            $(this.opts.el).find(this.$listWrap).addClass("active");
        },
        remove : function(){
            this.nodataremove();
            $(this.$title).removeClass("active");
            $(this.$listWrap).removeClass("active").css({height:"", overflowY:""});
        },
        nodataadd : function(str){
            $(this.opts.el).append("<div class='no_data active' data-list='no'>"+str+"</div>");
        },
        nodataremove : function(){
            $(this.$noData).remove();
        }
    }

    return Constructor;
})();

var selectbox1 = new Selectbox({
    el:"#select1",
    scHeight:400
});

var selectbox2 = new Selectbox({
    el:"#select2",
    scHeight:300
});

var selectbox3 = new Selectbox({
    el:"#select3",
    scHeight:200
});

console.log(selectbox1)
console.log(selectbox2)
console.log(selectbox3)

// selectbox.nodataadd("#select1", "이벤트 참여 가능 캐릭터가 없습니다.")

for (var i = 1; i < 9; i++) {
    $(".s1 .select_list").append("<li  data-select='list'><div><span>서버</span><span>캐릭터</span>1_"+i+"</div></li>");
}