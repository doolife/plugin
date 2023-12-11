class Tilt {
    constructor(options) {
        this.$el = document.querySelector(options.el);
        this.mouseMoveHandler = this.handlerMouseMove.bind(this);
        this.mouseEnterHandler = this.handlerMouseEnter.bind(this);
        this.mouseLeaveHandler = this.resetTilt.bind(this);

        this.mouseEntered = false;
        this.rotationXMax = options.rotationXMax || 0.03;
        this.rotationYMax = options.rotationYMax || 0.03;
        this.duration = options.duration || 2;
        this.delay = options.delay || 0.0;

        this.events = {
            mouseEnter:null,
            mouseLeave:null
        };

        this.$el.addEventListener("mousemove", this.mouseMoveHandler);
        this.$el.addEventListener("mouseenter", this.mouseEnterHandler);
        this.$el.addEventListener("mouseleave", this.mouseLeaveHandler);
    }

    handlerMouseMove(e) {
        if (this.mouseEntered) {
            const { offsetX, offsetY } = e;
            const cx = offsetX - this.$el.offsetLeft;
            const cy = offsetY - this.$el.offsetTop;
            this.handleTilt(cx, cy);
        }
    }

    handleTilt(cx, cy) {
        const sxPos = ((cx / this.$el.offsetWidth) * 100 - 50) * 2;
        const syPos = ((cy / this.$el.offsetHeight) * 100 - 50) * 2;

        const rotationX = this.rotationXMax * syPos;
        const rotationY = this.rotationYMax * sxPos;

        gsap.to(this.$el, {
            duration: this.duration,
            rotationY: -rotationY,
            rotationX: rotationX,
            transformPerspective: 500,
            transformOrigin: "center center -200",
            ease: "Expo.easeOut",
            delay: this.delay
        });
    }

    handlerMouseEnter() {
        if (!this.mouseEntered) {
            this.mouseEntered = true;
            gsap.set(this.$el, {
                rotationY: 0,
                rotationX: 0,
                transformPerspective: 500,
                transformOrigin: "center center -200",
            });
            this.triggerEvent("mouseEnter");
        }
    }

    resetTilt() {
        this.mouseEntered = false;
        gsap.to(this.$el, {
            duration: this.duration,
            rotationY: 0,
            rotationX: 0,
            transformPerspective: 500,
            transformOrigin: "center center -200",
            ease: "Expo.easeOut"
        });
        this.triggerEvent("mouseLeave");
    }

    on(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName].push(callback);
        }
    }

    triggerEvent(eventName) {
        const callbacks = this.events[eventName];
        if (callbacks) {
            callbacks.forEach((callback) => {
                callback();
            });
        }
    }

    destroy() {
        this.$el.removeEventListener("mousemove", this.mouseMoveHandler);
        this.$el.removeEventListener("mouseenter", this.mouseEnterHandler);
        this.$el.removeEventListener("mouseleave", this.mouseLeaveHandler);
    }
}

export default Tilt;