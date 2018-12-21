import '../sass/index.scss';

var Selectbox = (function(){

    var $title = "[data-select='title']",
        $listWrap = "[data-select='listWrap']",
        $list = "[data-select='list']",
        $noData = "[data-list='no']";

    function Person(opts){
        this.opts = opts;
        this.scrollHeight = opts.scrollHeight;
        this.init();
    }

    Person.prototype = {
        init : function(){
            var context = this;
            $.each(this.opts.element, function(index, value){
                context.controls(value);
            });

            $(document).on("click", function(){
                context.remove();
            });
        },
        controls : function(element){
            var context = this;
            $(element).on("click", $title, function(e){
                e.stopPropagation();
                context.display(element);
            });

            $(element).on("click", $list, function(){
                context.select(element, $(this).index());
            });
        },
        display : function(element){
            if($(element).find($title).attr("disabled")!="disabled"){
                if(!$(element).find($title).hasClass("active")){
                    this.remove();
                    this.active(element);
                    if ($(element).find($listWrap).height()>=this.scrollHeight) {
                        $(element).find($listWrap).css({height:this.scrollHeight, overflowY:"auto"});
                    }
                }else{
                    this.remove();
                }
            }
        },
        select : function(element, thisNum){
            var tagClone = $(element).find($list).eq(thisNum).contents().clone();
            $(element).find($title).empty().append(tagClone);
            this.remove();
            if(!$(element).find($title).hasClass("on")){
                $(element).find($title).addClass("on");
            }
        },
        active : function(element){
            $(element).find($title).addClass("active");
            $(element).find($listWrap).addClass("active");
        },
        remove : function(){
            this.nodataremove();
            $($title).removeClass("active");
            $($listWrap).removeClass("active").css({height:"", overflowY:""});
        },
        nodataadd : function(element, str){
            $(element).append("<div class='no_data active' data-list='no'>"+str+"</div>");
        },
        nodataremove : function(){
            $($noData).remove();
        }
    }

    return Person;

})();

// basic
var selectbox = new Selectbox({
    element:["#select1", "#select2", "#select3"],   // element
    scrollHeight:400                                // scroll height
});

selectbox.scrollHeight = 300;

console.log(selectbox)

// selectbox.nodataadd("#select1", "이벤트 참여 가능 캐릭터가 없습니다.")

for (var i = 1; i < 9; i++) {
    $(".s1 .select_list").append("<li  data-select='list'><div><span>서버</span><span>캐릭터</span>1_"+i+"</div></li>");
}