import { gsap } from 'gsap';

class ChtSelect {
    constructor(opts) {
        this.opts = {
            el: "#cht-select",
            scale: 1.2,
            leftMove: -50,
            rightMove: 50,
            ...opts,        // 기본값을 덮어씀
        };

        this.$el = document.querySelector(this.opts.el);
        this.$list = Array.from(this.$el.children);

        this.currEl = null;
        this.prevEl = null;
        this.callCurrIdx = null;
        this.callPrevIdx = null;
        this.events = {};

        this.init();
    }

    init() {
        this.addEventListeners();
    }

    addEventListeners() {
        this.$list.forEach((el, index) => {
            el.addEventListener('mouseenter', (evt) => this.handleEvent(evt, index));
        });

        this.$el.addEventListener('mouseleave', () => this.resetAnimate());

        this.$list.forEach((el, index) => {
            el.addEventListener('click', (evt) => this.handleClick(evt, index));
        });
    }

    handleEvent(evt, currIdx) {
        this.currEl = evt.target.children;

        const animationOptions = {
            duration: 0.65,
            ease: 'power2.out',
        };

        this.$list.forEach((el, index) => {
            const xValue = index < currIdx ? this.opts.leftMove : (index > currIdx ? this.opts.rightMove : 0);
            const scaleValue = index === currIdx ? this.opts.scale : 1;

            gsap.to(el.children, { ...animationOptions, x: xValue, scale: scaleValue });
        });

        this.prevEl = this.currEl;
    }

    resetAnimate() {
        this.$list.forEach((el) => {
            gsap.to(el.children, { duration: 0.8, scale: 1, x: 0 });
        });
    }

    handleClick(evt, currIdx) {
        this.callCurrIdx = currIdx;
        this.emitEvent("click", { currentIdx: this.callCurrIdx, previousIdx: this.callPrevIdx });
        this.callPrevIdx = this.callCurrIdx;
    }

    on(eventName, callback) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
    }

    emitEvent(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(data);
            });
        }
    }
}

export default ChtSelect;