var Timer = (function(){
    function Person(opts){

        this.opts = $.extend({
            minutes:5,
            start:true
        }, opts);

        this.el = {
            $count:".count"
        };

        this.state = {
            timeChk:true
        };

        this.init();
    }

    Person.prototype = {
        init:function() {
            if(!this.opts.start) return false;
            this.countdown(this.opts.minutes);
        },
        countdown:function(time){
            var context = this;

            if(this.state.timeChk){
                $("#timer").css({opacity:1});
                this.state.time = time*60*1000;
                this.state.timeChk = false;
            }

            this.state.timerId = setTimeout(function(){
                context.state.time -= 1000;

                context.state.min = Math.floor(context.state.time / (60 * 1000));
                context.state.sec = Math.floor((context.state.time - (context.state.min * 60 * 1000)) / 1000);

                context.state.min = context.state.min < 10 ? "0" + context.state.min : context.state.min;
                context.state.sec = context.state.sec < 10 ? "0" + context.state.sec : context.state.sec;

                $(context.el.$count).html(context.state.min + " : " + context.state.sec);

                context.countdown();

                if (context.state.time <= 0) {
                    context.cleartimer(true);
                    $(context.el.$count).trigger("end");
                }

            }, 1000);
        },
        cleartimer:function(str){
            clearTimeout(this.state.timerId);
            this.state.timeChk = true;
            if(!str){
                $("#timer").css({opacity:0});
                $(this.el.$count).html("");
            }else{
                $(this.el.$count).html("00 : 00");
            }
        },
        on:function(event, func){
            return $(this.el.$count).on(event, func);
        }
    }

    return Person;

})();

var timer = new Timer({
    minutes:5,
    start:false
});

$(".btn_start").on("click", function(){
    timer.countdown(0.2);
});

$(".btn_stop").on("click", function(){
    timer.cleartimer(false);
});

timer.on("end", function(){
    console.log("end!!!!!!!!!!!!!!!!!");
})
