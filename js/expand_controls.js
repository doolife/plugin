var alertFallback = true;
if (typeof console === "undefined" || typeof console.log === "undefined") {
    console = {};
    if (alertFallback) {
        console.log = function(msg) {
//            alert(msg);
        };
    } else {
        console.log = function() {};
    }
}

var Expand = (function (window, document, $, undefined) {

    var interval = 100, initNum = 0, isOpen=true, width = [];
    var $lis = $(".expand_wrap").children("li"), $close = $(".layer_close");

    var init = function(){
        for (var i = 0; i < $lis.length; i++) {
            width[i] = $lis.eq(i).width();
        }
        $lis.on("mouseenter", controls.mouseEnter);
        // $lis.on("mouseleave", controls.mouseLeave);
        $lis.on("click", controls.mouseClick);
        $close.on("click", controls.mouseClose);
    };

    var controls = {
        mouseEnter : function(){
            controls.target = $(this).index();
            overAct();
        },
        mouseLeave : function(){
            overAct();
        },
        mouseClick : function(e){
            e.preventDefault();
            clickAct();
        },
        mouseClose : function(){
            closeAct();
        }
    };

    var clickAct = function(){
        if(isOpen==false){
            return;
        }
        TweenMax.to([$lis.eq(controls.target)], 0.5, {x:0, y:0, width:"100%", height:"100%", top:0, right:0, bottom:0, left:0, zIndex:5});
        TweenMax.to([$lis.eq(controls.target).children(".exp_bg")], 0.4, {alpha:0});
        TweenMax.to([$lis.eq(controls.target).children(".contents_layer")], 0.5, {alpha:1});
        if (controls.target==0) {
            TweenMax.to([$lis.eq(1)], 0.5, {x:$(window).width() / 2, right:0});
            TweenMax.to([$lis.eq(2)], 0.5, {x:$(window).width() / 2, right:0});
        }else if (controls.target==1) {
            TweenMax.to([$lis.eq(0)], 0.5, {x:-$(window).width() / 2, left:0});
            TweenMax.to([$lis.eq(2)], 0.5, {x:-$(window).width() / 2, y:$(window).height() / 2, width:$(window).width(), right:0, bottom:0});
        }else if (controls.target==2) {
            TweenMax.to([$lis.eq(0)], 0.5, {x:-$(window).width() / 2, left:0});
            TweenMax.to([$lis.eq(1)], 0.5, {x:-$(window).width() / 2, y:-$(window).height() / 2, width:$(window).width(), top:0, right:0});
        }
        TweenMax.set([$lis], {zIndex:0});
        isOpen = false;
    };

    var closeAct = function(){
        TweenMax.to([$lis.eq(0)], 0.5, {x:0, width: $(window).width() / 2, left:0});
        TweenMax.to([$lis.eq(1)], 0.5, {x:0, y:0, width:$(window).width() / 2, height:$(window).height() / 2, top:0, right:0, bottom:"50%", left:"50%"});
        TweenMax.to([$lis.eq(2)], 0.5, {x:0, y:0, width:$(window).width() / 2, height:$(window).height() / 2, top:"50%", right:0, bottom:0, left:"50%"});
        TweenMax.to([$lis.eq(controls.target).children(".exp_bg")], 0.4, {alpha:1, scale:1.3});
        TweenMax.to([$lis.eq(controls.target).children(".contents_layer")], 0.5, {alpha:0});
        setTimeout(function(){
            isOpen = true;
            $lis.each(function(i){
                TweenMax.set($(this), {x:0, y:0, width:"", height:"", top:"", right:"", bottom:"", left:""});
            });
        }, 700);
    }

    var overAct = function(){
        if(isOpen==false){
            return;
        }
        if (controls.target==0) {
            TweenMax.to([$lis.eq(0)], 0.5, {x:interval, left:-interval});
            TweenMax.to([$lis.eq(1)], 0.5, {x:interval, y:initNum, top:initNum, right:interval});
            TweenMax.to([$lis.eq(2)], 0.5, {x:interval, y:initNum, right:interval, bottom:initNum});
        }else if (controls.target==1) {
            TweenMax.to([$lis.eq(0)], 0.5, {x:-interval, left:interval});
            TweenMax.to([$lis.eq(1)], 0.5, {x:-interval, y:interval, top:-interval, right:-interval});
            TweenMax.to([$lis.eq(2)], 0.5, {x:-interval, y:interval, right:-interval, bottom:interval});
        }else if (controls.target==2) {
            TweenMax.to([$lis.eq(0)], 0.5, {x:-interval, left:interval});
            TweenMax.to([$lis.eq(1)], 0.5, {x:-interval, y:-interval, top:interval, right:-interval});
            TweenMax.to([$lis.eq(2)], 0.5, {x:-interval, y:-interval, right:-interval, bottom:-interval});
        }
        console.log(controls.target)
        TweenMax.to([$lis.children(".exp_bg")], 0.5, {scale:1.3});
        TweenMax.to([$lis.eq(controls.target).children(".exp_bg")], 0.5, {scale:1});
    };

    return{
        init : init
    };

})(window, document, $);
Expand.init();
