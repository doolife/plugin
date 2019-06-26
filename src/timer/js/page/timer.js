class Timer {
    constructor(opts){
        this.opts = $.extend({
            el:"#timer",
            minutes:5,
            start:true
        }, opts);

        this.$el = $(this.opts.el);
        this.$count = this.$el.find("[data-time='count']");

        this.state = {
            timeChk:true
        };

        this.init();
    }

    init(){
        if(!this.opts.start) return false;
        this.countdown(this.opts.minutes);
    }
    countdown(time){
        if(this.state.timeChk){
            $("#timer").css({opacity:1});
            this.state.time = time*60*1000;
            this.state.timeChk = false;
        }

        this.state.timerId = setTimeout(()=>{
            this.state.time -= 1000;

            this.state.min = Math.floor(this.state.time / (60 * 1000));
            this.state.sec = Math.floor((this.state.time - (this.state.min * 60 * 1000)) / 1000);

            this.state.min = this.state.min < 10 ? "0" + this.state.min : this.state.min;
            this.state.sec = this.state.sec < 10 ? "0" + this.state.sec : this.state.sec;

            this.$count.html(this.state.min + " : " + this.state.sec);

            this.countdown();

            if (this.state.time <= 0) {
                this.cleartimer(true);
                this.$count.trigger("end");
            }

        }, 1000);
    }
    cleartimer(str){
        clearTimeout(this.state.timerId);
        this.state.timeChk = true;
        if(!str){
            $("#timer").css({opacity:0});
            this.$count.html("");
        }else{
            this.$count.html("00 : 00");
        }
    }
    on(event, func){
        return this.$count.on(event, func);
    }
}

export default Timer;