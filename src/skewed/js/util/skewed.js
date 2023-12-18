import {gsap} from 'gsap';

class Skewed {
    // 생성자 함수
    constructor(opts) {
        // 옵션에 대한 엘리먼트와 속성 초기화
        this.$el = document.querySelector(opts.el);
        this.$list = Array.from(this.$el.children);
        this.width = opts.width;
        this.height = opts.height;
        this.gap = opts.gap;
        this.skewAmount = opts.skewAmount;
        this.clicked = opts.clicked;
        this.prevEl = null;
        this.prevLeave = false;
        this.events = {};       // 이벤트 저장할 객체

        this.initialClipPath = `polygon(var(--s) 0, 100% 0, calc(100% - var(--s)) 100%, 0 100%)`;
        this.startClipPath = 'polygon(0 0, 100% 0, calc(100% - var(--s)) 100%, 0 100%)';
        this.endClipPath = `polygon(var(--s) 0, 100% 0, 100% 100%, 0 100%)`;

        this.init();
    }

    // 초기화
    init() {
        this.setInitialSizes();
        this.addEventListeners();
    }

    // 초기 크기 설정
    setInitialSizes() {
        gsap.set(this.$el, {
            '--s': this.skewAmount,
            gap: this.gap,
            width: this.width,
            height: this.height
        });

        this.$list.forEach((el, index) => {
            gsap.set(el, {
                width: 0,
                minWidth: `calc(100% + var(--s))`,
                height: 0,
                minHeight: '100%',
                objectFit: 'cover',
                clipPath: index === 0 ? this.startClipPath : (index === this.$list.length - 1 ? this.endClipPath : this.initialClipPath),
                placeSelf: index === 0 ? 'start' : (index === this.$list.length - 1 ? 'end' : '')
            });

            el.dataset.index = index;
        });
    }

    // 이벤트 등록
    addEventListeners() {
        this.$list.forEach(el => {
            if(!this.clicked){
                el.addEventListener('mouseenter', () => this.animateSkewed(el));
                el.addEventListener('mouseleave', () => this.resetSkewed(el));
            }
            el.addEventListener('click', () => this.handleClick(el));
        });
    }

    // mouseenter
    animateSkewed(el) {
        gsap.to(el, { duration: 0.8, width: '15vw', ease: 'power2.out' });
        if (!this.clicked) this.handleEvent(el,"enter");
    }

    // mouseleave
    resetSkewed(el) {
        gsap.to(el, { duration: 0.8, width: 0, ease: 'power2.out' });
        if (!this.clicked) this.handleEvent(el,"leave");
    }

    // click
    handleClick(el) {
        if (this.clicked) {
            this.animateSkewed(el);
            if(this.prevEl !== null) {
                if(this.prevLeave) this.resetSkewed(this.prevEl);
            }
            this.prevLeave = !(this.prevLeave && this.prevEl === el);
            this.prevEl = el;
        }
        this.handleEvent(el,"click");
    }

    // 이벤트 핸들링
    handleEvent(el, eventType){
        // 현재 인덱스와 이전 인덱스 키 값 생성
        const currentKey = `${eventType}CurrIndex`;
        const prevKey = `${eventType}PrevIndex`;

        // 현재 인덱스 설정 및 이벤트
        this[currentKey] = parseInt(el.dataset.index);
        this.emitEvent(eventType, this[currentKey], this[prevKey]);

        // 이전 인덱스
        this[prevKey] = this[currentKey];
    }

    // 이벤트 등록
    on(eventName, callback) {
        this.events = this.events || {};
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
    }

    // 이벤트 발생
    emitEvent(eventName, ...index) {
        if (this.events && this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(...index);
            });
        }
    }
}

export default Skewed;