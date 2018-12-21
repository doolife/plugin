import '../sass/index.scss';

var Conformance = (function(){

    var $el, $btnChoice, $btnAgain, $btnStart, $btnReturn;
    var classScore = {};
    var state = {
        idx:""
    };

    function Person(opts){
        $el = $(opts.element), $btnChoice = $(opts.element).find(".btn_choice"), $btnAgain = $(".btn_again"), $btnStart = $(".btn_start"), $btnReturn = $(".btn_return");
        state.idx = opts.idx;
        this.init();
    }

    Person.prototype = {
        init : function(){
            this.answer();
            this.settings();
            this.controls();
        },
        settings : function(){
            classScore["su"] = 0;
            classScore["gum"] = 0;
            classScore["ho"] = 0;
            classScore["chi"] = 0;
            classScore["sal"] = 0;
            classScore["gung"] = 0;
            classScore["ma"] = 0;
            classScore["jung"] = 0;
            classScore["sa"] = 0;
            classScore["gi"] = 0;
            classScore["um"] = 0;
        },
        answer : function(){
            // 1번 문제
            $el.eq(0).find($btnChoice).eq(0).data("obj", "su-gum-ho-sal-gi");                   // 1-1
            $el.eq(0).find($btnChoice).eq(1).data("obj", "chi-gung-ma-jung-sa-um");             // 1-2
            // 2번 문제
            $el.eq(1).find($btnChoice).eq(0).data("obj", "gum-sal-gung-ma-sa");                 // 2-1
            $el.eq(1).find($btnChoice).eq(1).data("obj", "su-gum-gi");                          // 2-2
            $el.eq(1).find($btnChoice).eq(2).data("obj", "ho-chi-jung-um");                     // 2-3
            // 3번 문제
            $el.eq(2).find($btnChoice).eq(0).data("obj", "su-gum");                             // 3-1
            $el.eq(2).find($btnChoice).eq(1).data("obj", "ho-chi-gi-um");                       // 3-2
            $el.eq(2).find($btnChoice).eq(2).data("obj", "sal-gung-sa");                        // 3-3
            $el.eq(2).find($btnChoice).eq(3).data("obj", "ma-jung");                            // 3-4
            // 4번 문제
            $el.eq(3).find($btnChoice).eq(0).data("obj", "su-gum-sal");                         // 4-1
            $el.eq(3).find($btnChoice).eq(1).data("obj", "ho-chi-gung-ma-jung-sa-gi-um");       // 4-2
            // 5번 문제
            $el.eq(4).find($btnChoice).eq(0).data("obj", "su-gung-jung-sa-gi-um");              // 5-1
            $el.eq(4).find($btnChoice).eq(1).data("obj", "gum-ho-chi-sal-ma");                  // 5-2
            // 6번 문제
            $el.eq(5).find($btnChoice).eq(0).data("obj", "gum-sal-gung-ma-sa");                 // 6-1
            $el.eq(5).find($btnChoice).eq(1).data("obj", "ho-chi-jung-gi-um");                  // 6-2
            $el.eq(5).find($btnChoice).eq(2).data("obj", "su-chi-ma");                          // 6-3
            $el.eq(5).find($btnChoice).eq(3).data("obj", "su-gum-sal");                         // 6-4
            // 7번 문제
            $el.eq(6).find($btnChoice).eq(0).data("obj", "gum-chi-jung");                       // 7-1
            $el.eq(6).find($btnChoice).eq(1).data("obj", "su-ho-sal-gung-ma-sa-gi-um");         // 7-2
        },
        controls : function(){
            var context = this;
            $btnChoice.on("click", function(){
                var str = $(this).data("obj").split("-");
                if(state.idx<=$el.length-1){
                    state.idx = state.idx+1;
                    context.process(str);
                    if(state.idx==$el.length){
                        context.end();
                    }
                }
            });

            $btnReturn.on("click", function(){
                var str = $(this).data("obj").split("-");
                state.idx = state.idx-1;
                context.return(str);
            });

            $btnAgain.on("click", function(){
                context.reset();
            });

            $btnStart.on("click", function(){
                context.layoutControls("start");
            });
        },
        process : function(str){
            var arr = [];
            this.layoutControls("process");
            $.each(classScore, function(key) {
                for (var i=0, len=str.length ; i<len ; i++){
                    if(key==str[i]){
                        classScore[key] += 1;
                        arr.push(str[i]);
                    }
                }
            });
            var returnData = arr.join("-");
            console.log(state.idx+" | "+returnData)
            $el.eq(state.idx).find($btnReturn).data("obj", ""+returnData+"");
            console.log(classScore)
        },
        return : function(str){
            this.layoutControls("process");
            $.each(classScore, function(key) {
                for (var i=0, len=str.length ; i<len ; i++){
                    if(key==str[i]){
                        classScore[key] -= 1;
                    }
                }
            });
            console.log(classScore)
        },
        layoutControls : function(mat){
            if(mat=="start"){
                $(".start_wrap").css({display:"none"});
                this.layoutControls("process");
            }else if(mat=="process"){
                $el.css({display:"none"});
                $el.eq(state.idx).css({display:"block"});
            }else if(mat=="reset"){
                $(".test_layer").css({display:""});
                $(".start_wrap").css({display:"block"});
                $el.css({display:""});
            }
        },
        end : function(){
            var values = [];
            var getMax = Object.keys(classScore).filter(function(keys){
                console.log(keys+" | "+classScore[keys])
                $.each(classScore, function(key) {
                    values.push(classScore[key]);
                });
                return classScore[keys] == Math.max.apply(null, values);
            });
            this.result(getMax);
        },
        result : function(getMax){
            if(getMax.length!=1){
                console.log(getMax)
                var objId = this.random(getMax);
                console.log(objId)
                $("#"+objId).css({display:"block"});
            }else{
                console.log(getMax)
                var objId = getMax[0];
                console.log(objId)
                $("#"+objId).css({display:"block"});
            }
        },
        random : function(getMax){
            return getMax[Math.floor(Math.random() * getMax.length)];
        },
        reset : function(){
            state.idx = 0;
            $.each(classScore, function(key) {
                delete classScore[key];
            });
            this.settings();
            this.layoutControls("reset");
        }
    };

    return Person;
})();


var test = new Conformance({
    element:".conformance_test",
    idx:0
});

console.log(test)