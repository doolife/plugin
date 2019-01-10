import '../sass/index.scss';
import '../media/audio.mp3';

var Equalizer = (function(){

    var $parent, $children, $audio = $("[data-media='audio']"), $btn;
    var state = {
        startSet:true
    }

    function Person(opts){
        this.init(opts);
    }

    Person.prototype = {
        init : function(opts){
            $parent = $(opts.parent), $children = $(opts.children), $btn = $(opts.btn), state.url = opts.url, state.volume = opts.volume;

            this.eqAction(opts.setStr);
            this.controls();
        },
        controls : function(){
            var context = this;
            $btn.on("click", function(){
                var chk = (state.playChk1==true) ? false : true ;
                context.eqAction(chk);
            });
        },
        eqAction : function(str){
            if(str==true){
                $parent.find($children).removeClass("stop");    // equalizer 애니메이션 추가
                this.setAudio();
                $audio[0].play();   // audio 플레이
                $btn.addClass("on");
                state.playChk1 = str;
            }else{
                $parent.find($children).addClass("stop");    // equalizer 애니메이션 삭제
                this.setAudio();
                $audio[0].pause();   // audio 일시정지
                $btn.removeClass("on");
                state.playChk1 = str;
            }
        },
        setAudio : function(){
            if(state.startSet==true){
                $audio.append("<source src='"+state.url+"' type='audio/mpeg' />");
                $audio[0].volume = state.volume;
                state.startSet = false;
            }
        },
        openPlay : function(){
            if(state.playChk1){
                this.eqAction(false);
                state.playChk2 = false;
            }else{
                state.playChk2 = true;
            }
        },
        closePlay : function(){
            if(state.playChk1==false && state.playChk2==false) this.eqAction(true);
        }
    };

    return Person;
})();

var eq = new Equalizer({
    parent:"#equalizer",            // 이퀄라이저 애니메이션 부모 엘리먼트
    children:"span",                // 이퀄라이저 애니메이션 자식 엘리먼트
    btn:".btn_eq",                  // 버튼 클래스
    url:"media/audio.mp3",       // 오디오 url
    volume:0.5,                     // 볼륨
    setStr:false                    // 이퀄라이저 동작여부(true : play / false : pause)  ※ 크롬에서는 크롬 정책으로 인해 자동 재생 불가
});

$(".btn_layer").on("click", function(){
    eq.openPlay();
});

$(".btn_close1").on("click", function(){
    eq.closePlay();
});