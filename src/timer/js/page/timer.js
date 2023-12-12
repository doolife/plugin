class Timer {
    constructor(options) {
        const { el, time, start } = Object.assign({
            el: "#timer",
            time: "00:00:05",
            start: false
        }, options);

        this.el = document.querySelector(el);
        this.count = this.el.querySelector("[data-time='count']");
        this.state = {
            time: this.parseTimeToSeconds(time),
            initialTime: this.parseTimeToSeconds(time),
            timerId: null,
            timeChk: false
        };

        this.updateDisplay();

        if (start) {
            this.start();
        }
    }

    start() {
        if (!this.state.timeChk && this.state.time > 0) {
            const update = () => {
                this.updateDisplay();
                this.state.time--;

                if (this.state.time < 0) {
                    this.pause();
                    this.triggerEndEvent();
                } else {
                    this.state.timerId = setTimeout(update, 1000);
                }
            };

            update();
            this.state.timeChk = true;
        }
    }

    stop() {
        this.pause();
        this.state.time = 0;
        this.updateDisplay();
    }

    pause() {
        clearInterval(this.state.timerId);
        this.state.timeChk = false;
    }

    reset() {
        this.state.time = this.state.initialTime;
        this.updateDisplay();
    }

    restart() {
        this.stop();
        this.reset();
        this.start();
    }

    updateDisplay() {
        const hours = Math.floor(this.state.time / 3600);
        const minutes = Math.floor((this.state.time % 3600) / 60);
        const seconds = this.state.time % 60;

        this.count.textContent = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    parseTimeToSeconds(timeString) {
        const [hours, minutes, seconds] = timeString.split(":").map(part => parseInt(part, 10));
        return hours * 3600 + minutes * 60 + seconds;
    }

    triggerEndEvent() {
        const endEvent = new Event('end');
        this.count.dispatchEvent(endEvent);
    }

    on(event, func) {
        return this.count.addEventListener(event, func);
    }
}

export default Timer;