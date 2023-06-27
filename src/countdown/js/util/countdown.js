class Countdown {
    constructor(opts){
        this.opts = $.extend(true, {
            el:"#counter",
            startDate:Date.parse("2022-07-11T16:12:00+09:00"),
            endDate:new Date(Date.parse(`2022-08-19T23:59:59+09:00`))
        }, opts);
        this.init();
    };

    init(){
        this.diff = this.opts.startDate - Date.parse(new Date());   // 서버시간과 클라이언트 시간과의 차이 Date.parse("2022-07-11T16:12:00+09:00")
        this.timeSetting(`${this.opts.el}`, this.opts.endDate);   // 서버 END TIME
    };

    getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - (Date.parse(new Date())+this.diff);   // 현재 시간과 서버 시간의 차이를 new Date에 더하기
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    };

    timeSetting(id, endtime) {
        const clock = document.querySelector(id);
        const $elDays = clock.querySelector(`[data-count="days"]`);
        const $elHours = clock.querySelector(`[data-count="hours"]`);
        const $elMinutes = clock.querySelector(`[data-count="minutes"]`);
        const $elSeconds = clock.querySelector(`[data-count="seconds"]`);

        const timeUpdate = ()=> {
            const t = this.getTimeRemaining(endtime);

            $elDays.innerHTML = t.days;
            $elHours.innerHTML = ('0' + t.hours).slice(-2);
            $elMinutes.innerHTML = ('0' + t.minutes).slice(-2);
            $elSeconds.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                console.log("끗")
                clearInterval(timeinterval);
            }
        }

        timeUpdate();
        const timeinterval = setInterval(timeUpdate, 1000);
    };
};

export default Countdown;