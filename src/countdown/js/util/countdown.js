export const initializeCountdown = ({ el, startDate = null, endDate, onEndCallback }) => {
    // startDate가 없으면 현재 시간을 사용
    const startDateToUse = startDate ? startDate : new Date().toISOString();
    // 서버 시간과 클라이언트 시간 차이 계산
    const diff = calculateServerTimeDiff(startDateToUse);
    // 기본 동작을 빈 콜백으로 설정
    const count = {
        onEndCallback: onEndCallback || (() => {}), // 기본 콜백
        setOnEndCallback: function(callback) {
            if (callback && typeof callback === 'function') {
                this.onEndCallback = callback; // 콜백 설정
            }
        }
    };
    // 시간 설정
    timeSetting(el, endDate, diff, () => {
        count.onEndCallback(); // 타이머 종료 시에만 콜백 실행
    });
    return count; // count 객체 반환
};

const calculateServerTimeDiff = (startDate) => {
    const serverTime = Date.parse(startDate); // 서버 시작 시간
    const clientTime = Date.parse(new Date()); // 클라이언트 현재 시간
    return serverTime - clientTime; // 시간의 차이 계산
};

const timeSetting = (el, endDate, diff, onEndCallback) => {
    const clock = document.querySelector(el);
    const $elDays = clock.querySelector(`[data-count="days"]`);
    const $elHours = clock.querySelector(`[data-count="hours"]`);
    const $elMinutes = clock.querySelector(`[data-count="minutes"]`);
    const $elSeconds = clock.querySelector(`[data-count="seconds"]`);

    const timeUpdate = () => {
        const t = getTimeRemaining(endDate, diff);
        if (t.total <= 0) {
            // 시간이 끝났을 때 값을 0으로 설정
            $elDays.innerHTML = 0;
            $elHours.innerHTML = '00';
            $elMinutes.innerHTML = '00';
            $elSeconds.innerHTML = '00';

            onEndCallback(); // 종료 시 콜백 호출
            clearInterval(timeinterval); // 타이머 멈춤
        } else {
            $elDays.innerHTML = t.days;
            $elHours.innerHTML = ('0' + t.hours).slice(-2);
            $elMinutes.innerHTML = ('0' + t.minutes).slice(-2);
            $elSeconds.innerHTML = ('0' + t.seconds).slice(-2);
        }
    };

    timeUpdate(); // 즉시 한 번 실행
    const timeinterval = setInterval(timeUpdate, 1000);
};

const getTimeRemaining = (endtime, diff) => {
    const total = Date.parse(endtime) - (Date.parse(new Date()) + diff);
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
