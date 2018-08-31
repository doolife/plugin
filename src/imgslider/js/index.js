var sliderModule = (function (window, document, $, undefined) {

    var $btn = $("[data-btn]"),
        $wrap = $("[data-gallery='wrap']"),
        $cover = $("[data-gallery='cover']"),
        $list = $("[data-slider='list']"),
        $paging = $("[data-list='paging']"),
        _pagingWrap = "data-paging='wrap'",
        _paging = "data-paging='list'";


    var init = function(opts){
        $.each(opts.element, function(i, item) {
            var obj     = {};
            obj.element  = item;
            obj.idx = opts.idx[i];
            obj.len = $(item).find($list).length;
            obj.width = $(item).find($cover).width();
            obj.height = $(item).find($cover).height();
            obj.paging = opts.paging[i];
            if(opts.pelement != undefined){
                obj.pelement = opts.pelement[i];
            }
            obj.setChk = true;

            var first = $(obj.element).find($list).first($list).clone();
            var last = $(obj.element).find($list).last($list).clone();
            $(obj.element).find($wrap).append(first);
            $(obj.element).find($wrap).prepend(last);

            sliderAnimation(obj);
            controls(obj);
        });
    };

    function controls(obj){
        $(obj.element).find($btn).off().on("click", function(e){
            var target = $(this).data("btn");
            prevnext(obj, target);
        });

        $(obj.element).find("["+_paging+"]").on("click", function(e){
            var thisNum = $(this).index();
            obj.idx = thisNum+1;
            sliderAnimation(obj);
        });

        $(obj.pelement).find($paging).on("click", function(e){
            var thisNum = $(this).index();
            obj.idx = thisNum+1;
            sliderAnimation(obj);
        });
    };

    function prevnext(obj, target){
        if($(obj.element).find($wrap).is(":not(:animated)")){
            if(target=="next"){
                obj.idx = obj.idx+1;
                sliderAnimation(obj);
            }else if(target=="prev"){
                obj.idx = obj.idx-1;
                sliderAnimation(obj);
            }
        }
    };

    function sliderAnimation(obj){
        if(obj.setChk==true){
            obj.idx = (obj.idx>obj.len || obj.idx<=0) ? 1 : obj.idx;
            $(obj.element).find($wrap).css({width:obj.width*(obj.len+2), height:obj.height, left:-obj.width*obj.idx});
            if(obj.paging==true){
                pagingSet(obj);
                sliderPaging(obj);
            }
            obj.setChk = false;
        }else{
            $(obj.element).find($wrap).stop().animate({left:-obj.width*obj.idx}, function(){
                var cycle = (0===obj.idx || obj.len+1===obj.idx);
                if(cycle){
                    obj.idx = (obj.idx === 0)? obj.len : 1;
                    $(obj.element).find($wrap).css({left:-obj.width*obj.idx});
                }
                if(obj.paging==true){
                    sliderPaging(obj);
                }
            });
        }
    }

    function sliderPaging(obj){
        $(obj.element).find($("["+_paging+"]")).removeClass("on");
        $(obj.element).find($("["+_paging+"]")).eq(obj.idx-1).addClass("on");
    }

    function pagingSet(obj){
        $(obj.element).find($wrap).after("<ul "+_pagingWrap+">");
        for ( var i=1 ; i<obj.len+1 ; i++ ){
            $(obj.element).find($("["+_pagingWrap+"]")).append("<li "+_paging+"><button type='button'>"+i+"");
        }
    }

    return{
        option:init
    };
})(window, document, $);

new sliderModule.option({
    element:["#slider1", "#slider2", "#slider3"],
    idx:[1, 5, 3],
    paging:[true, false, true],
    pelement:["", "#paging2", ""],
});