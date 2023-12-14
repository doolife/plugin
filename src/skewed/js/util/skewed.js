import {gsap} from 'gsap';

class Skewed {
    constructor(opts) {
        this.skewed = document.querySelector(opts.el);
        this.images = this.skewed.querySelectorAll('.skewed__img');
        this.width = opts.width;
        this.height = opts.height;
        this.gap = opts.gap;
        this.skewAmount = opts.skewAmount;
        this.clicked = opts.clicked;
        this.prevEl = null;
        this.prevLeave = false;

        this.initialClipPath = `polygon(var(--s) 0, 100% 0, calc(100% - var(--s)) 100%, 0 100%)`;
        this.startClipPath = 'polygon(0 0, 100% 0, calc(100% - var(--s)) 100%, 0 100%)';
        this.endClipPath = `polygon(var(--s) 0, 100% 0, 100% 100%, 0 100%)`;

        this.init();
    }

    init() {
        this.setInitialSizes();
        this.addEventListeners();
    }

    setInitialSizes() {
        gsap.set(this.skewed, {
            '--s': this.skewAmount,
            gap: this.gap,
            width: this.width,
            height: this.height
        });

        this.images.forEach((el, index) => {
            gsap.set(el, {
                width: 0,
                minWidth: `calc(100% + var(--s))`,
                height: 0,
                minHeight: '100%',
                objectFit: 'cover',
                clipPath: index === 0 ? this.startClipPath : (index === this.images.length - 1 ? this.endClipPath : this.initialClipPath),
                placeSelf: index === 0 ? 'start' : (index === this.images.length - 1 ? 'end' : '')
            });

            el.dataset.index = index;
        });
    }

    addEventListeners() {
        if (!this.clicked) {
            this.images.forEach(el => {
                el.addEventListener('mouseenter', () => this.animateImage(el));
                el.addEventListener('mouseleave', () => this.resetImage(el));
            });
        }
        this.images.forEach(el => {
            el.addEventListener('click', () => this.handleClick(el));
        });
    }

    animateImage(el) {
        gsap.to(el, { duration: 0.8, width: '15vw', ease: 'power2.out' });
        this.emitEvent('enter', parseInt(el.dataset.index));
    }

    resetImage(el) {
        gsap.to(el, { duration: 0.8, width: 0, ease: 'power2.out' });
        this.emitEvent('leave', parseInt(el.dataset.index));
    }

    handleClick(el) {
        if (this.clicked) {
            this.animateImage(el);
            if(this.prevEl !== null) {
                if(this.prevLeave) this.resetImage(this.prevEl);
            }
            this.prevLeave = !(this.prevLeave && this.prevEl === el);
            this.prevEl = el;
        }
        this.emitEvent('click', parseInt(el.dataset.index));
    }

    on(eventName, callback) {
        this.events = this.events || {};
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
    }

    emitEvent(eventName, index) {
        if (this.events && this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(index);
            });
        }
    }
}

export default Skewed;