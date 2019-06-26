class Flipcounter {
    constructor(opts){
        this.opts = $.extend({
            el:"#flipcounter",
            date:new Date(2019, 4, 22, 10),
            currentDate:"",
            parts:"dd-hh-mm-ss"
        }, opts);

        this.$el = $(this.opts.el);
        this.$flipWrap = this.$el.find("[data-flip]");

        this.timer;
        this.prevNum = [];

        this.init();
    }

    init(){
        this.setTimer();
    }

    setTimer(){
        let strArray = [];
        let groups =  this.opts.parts.split('-');

        this.updateDate();
        let distance = this.opts.date.getTime()-this.opts.currentDate.getTime();
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60) / (1000 * 60)));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(distance>0){
            this.timer = setTimeout(()=>{
                this.setTimer();
            }, 1000);
        }else{
            clearTimeout(this.timer);
            this.$flipWrap.each((index, element)=>{
                $(element).find("[data-num]").eq(0).css({zIndex:3});
            });
            return false;
        }

        for (let i = 0; i <  groups.length; i++) {
            if(groups[i] == 'dd'){
                strArray.push(this.numCheck(days));
            };
            if(groups[i] == 'hh'){
                strArray.push(this.numCheck(hours));
            };
            if(groups[i] == 'mm'){
                strArray.push(this.numCheck(minutes));
            };
            if(groups[i] == 'ss'){
                strArray.push(this.numCheck(seconds));
            };
        }

        this.updataAnimate(strArray.join("").split(""));
    }

    updateDate(){
        if(this.opts.currentDate==""){
            this.opts.currentDate = new Date();
        }else{
            this.opts.currentDate = new Date(this.opts.currentDate.getTime()+1000);
        }
    }

    updataAnimate(strSplit){
        this.$flipWrap.each((index, element)=>{
            if(this.prevNum[index]!=strSplit[index]){
                $(element).find("[data-num]").removeClass("active").removeClass("before");
                $(element).find("[data-num='"+this.prevNum[index]+"']").addClass("before");
                $(element).find("[data-num='"+strSplit[index]+"']").addClass("active")
                this.prevNum[index] = strSplit[index];
            }
        });
    }

    numCheck(num){
        let reNum = num;
        reNum < 10 ? reNum = "0"+reNum : reNum;
        return reNum;
    }
}

export default Flipcounter;