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

var NCNS = (function(NCNS, $, undefined){

    var $sectionWrap = $("#sectionWrap")
        $section = $sectionWrap.children(".section"),
        $articleWrap = $section.children(".article_wrap"),
        $article = $articleWrap.children("article"),
        $gnb = $(".gnb").children("li"),
        $snb = $(".sub_nav").children("li"),
        hashUrl = window.location.hash.split("#/"),
        setId = $("#"+hashUrl[1]).attr("id"),
        objDepth = {
            depth1 : 0,
            depth2 : 0,
        },
        x = [],
        y = [],
        resizeTimer = null,
        isScrolling = false;

    NCNS.init = function(){
        // url
        NCNS.hashSet();
        // gnb
        $gnb.children("a").on("click", gnbHandler);
        $snb.children("a").on("click", snbHandler);
        // resize
        $(window).resize(function (){
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout(function() {
                resizeTimer = null;
				onResizeSet();
            }, 0);
        }).resize();
        // mousewheel
        $("html, body").on("mousewheel", function(e){
            if(!isScrolling){
		        isScrolling = true;
                scroller(e);
                sectionAnchor();
                setTimeout(function(){
					isScrolling = false;
				}, 700);
            }
            return false;
        });
    }

    NCNS.hashSet = function(){
        for (var i = 0; i < $section.length; i++) {
            if ($section.eq(i).attr("id")==setId) {
                objDepth.depth1 = i;
            }
        }
    }

    function gnbHandler(e){
        e.preventDefault();
		var target = $gnb.children("a").index(this);
		switch (e.type){
			case "mouseenter" :

			break;
			case "mouseleave" :

			break;
			case "click" :
                gnbControler(target);
			break;
		}
    }

    function snbHandler(e){
        e.preventDefault();
		var target = $section.eq(objDepth.depth1).find($snb).children("a").index(this);
		switch (e.type){
			case "mouseenter" :

			break;
			case "mouseleave" :

			break;
			case "click" :
                snbControler(target);
			break;
		}
    }

    function gnbControler(thisNum){
        if (objDepth.depth1!=thisNum) {
            // console.log(objDepth.depth1+"|"+thisNum)
            objDepth.depth1 = thisNum;
            objDepth.depth2 = 0;
            scrollMove();
            subScrollMoveReset();
            sectionAnchor();
        }
    }

    function snbControler(thisNum){
        objDepth.depth2 = thisNum;
        subScrollMove();
        subNavAnchor();
    }

    function sectionAnchor(){
		for (var i = 0; i < $section.length; i++) {
			if (i==objDepth.depth1) {
                window.location.hash = $gnb.eq(i).children("a").attr("href");
                $gnb.find("li").children("a").removeClass("on");
                $gnb.eq(i).children("a").addClass("on");
                subNavAnchor();
			}else{
                $gnb.eq(i).children("a").removeClass("on");
			}
		}
	}

    function subNavAnchor(){
        $section.eq(objDepth.depth1).find($snb).children("a").removeClass("on");
        $section.eq(objDepth.depth1).find($snb).children("a").eq(objDepth.depth2).addClass("on");
    }

    function scroller(e){
        if(e.originalEvent.wheelDelta < 0) {
            // scroll down
			scrollDown();
        }else {
            // scroll up
			scrollUp();
        }
    }

    function scrollDown(){
		if (objDepth.depth1 < $section.length-1) {
			if ($section.eq(objDepth.depth1).find($articleWrap).children($article).length==0) {
				objDepth.depth1 = objDepth.depth1+1;
				// console.log("next세션넘어감"+"|"+objDepth.depth1+"|"+objDepth.depth2)
				scrollMove();
				subScrollMoveReset();
			}else{
				if (objDepth.depth2 < $section.eq(objDepth.depth1).find($articleWrap).children($article).length-1) {
					objDepth.depth2 = objDepth.depth2+1;
					// console.log("nextSub넘어감"+"|"+objDepth.depth1+"|"+objDepth.depth2)
					subScrollMove();
				}else{
					objDepth.depth1 = objDepth.depth1+1;
					objDepth.depth2 = 0;
					// console.log("next넘어감"+"|"+objDepth.depth1+"|"+objDepth.depth2)
					scrollMove();
					subScrollMoveReset();
				}
			}
		}else if (objDepth.depth1==$section.length-1) {
			if (objDepth.depth2 < $section.eq(objDepth.depth1).find($articleWrap).children($article).length-1) {
				objDepth.depth2 = objDepth.depth2+1;
				// console.log("nextEnd넘어감"+"|"+objDepth.depth1+"|"+objDepth.depth2)
				subScrollMove();
			}
		}
	}

    function scrollUp(){
		if (objDepth.depth1 > 0) {
			if ($section.eq(objDepth.depth1).find($articleWrap).children($article).length==0) {
				objDepth.depth1 = objDepth.depth1-1;
				if ($section.eq(objDepth.depth1).find($articleWrap).children($article).length != 0) {
					objDepth.depth2 = $section.eq(objDepth.depth1).find($articleWrap).children($article).length-1;
					subScrollMoveReset();
					// console.log("prevReset")
				}
				// console.log("prev세션넘어감"+"|"+objDepth.depth1+"|"+objDepth.depth2)
				scrollMove();
			}else{
				if (objDepth.depth2 > 0) {
					objDepth.depth2 = objDepth.depth2-1;
					// console.log("prevSub넘어감"+"|"+objDepth.depth1+"|"+objDepth.depth2)
					subScrollMove();
				}else{
					objDepth.depth1 = objDepth.depth1-1;
					if ($section.eq(objDepth.depth1).find($articleWrap).children($article).length != 0) {
						objDepth.depth2 = $section.eq(objDepth.depth1).find($articleWrap).children($article).length-1;
						subScrollMoveReset();
						// console.log("prevReset")
					}
					// console.log("prev넘어감"+"|"+objDepth.depth1+"|"+objDepth.depth2)
					scrollMove();
				}
			}
		}else if (objDepth.depth1==0) {
			if (objDepth.depth2 > 0) {
				objDepth.depth2 = objDepth.depth2-1;
				// console.log("prevEnd넘어감"+"|"+objDepth.depth1+"|"+objDepth.depth2)
				subScrollMove();
			}
		}
	}

    // 1depth sectionWrap move
    function scrollMove(){
        TweenMax.to([$sectionWrap], 0.8, {y:-y[objDepth.depth1], ease:Cubic.easeOut});
    }

    // 2depth article_wrap move
    function subScrollMove(){
		TweenMax.to([$section.eq(objDepth.depth1).find($articleWrap)], 0.8, {x:-x[objDepth.depth2], ease:Cubic.easeOut});
    }

    // 2depth article_wrap reset
	function subScrollMoveReset(){
		TweenMax.to([$section.eq(objDepth.depth1).find($articleWrap)], 0, {x:-x[objDepth.depth2]});
	}

	function onResizeSet(){
		for (var i = 0; i < $section.length; i++) {
			TweenMax.to([$section.eq(i)], 0, {top:i*100+"%"});
			y[i] = $section.eq(i).position().top;
			for (var j=0; j<$section.eq(i).find($articleWrap).children($article).length; j++){
				if ($section.eq(i).find($articleWrap).children($article).length!=0) {
					TweenMax.to([$section.eq(i).find($articleWrap).children($article).eq(j)], 0, {left:j*100+"%"});
					x[j] = $section.eq(i).find($articleWrap).children($article).eq(j).position().left;
				}
			}
		}
        sectionAnchor();
        TweenMax.to([$sectionWrap], 0, {y:-y[objDepth.depth1]});
        TweenMax.to([$section.eq(objDepth.depth1).find($articleWrap)], 0, {x:-x[objDepth.depth2], ease:Expo.easeOut});
	}

    return NCNS;

})(window.NCNS || {},jQuery);
NCNS.init();
