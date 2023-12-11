class Spriteimg {
    constructor(opts) {
        this.opts = Object.assign({
            el: "#sprite",
            frame: 9,
            autoPlay: false,
            horizontal: true,
            fps: 120,
            ratio: false,
        }, opts);

        this.$el = document.querySelector(this.opts.el);

        this.state = {
            isPlay: false,
            nowFrame: 0,
            timer: null
        };

        this.init();
    }

    init() {
        if (this.opts.ratio) {
            window.addEventListener("resize", () => this.resize());
            this.resize();
        } else {
            if (!this.$el) {
                console.error(`Spriteimg: Element '${this.opts.el}' not found.`);
                return;
            }

            this.$el.style.width = `${this.$el.offsetWidth}px`;
            this.$el.style.height = `${this.$el.offsetHeight}px`;
        }

        if (this.opts.autoPlay === true) {
            this.play();
        }
    }

    resize() {
        this.state.ratio = this.opts.ratioHeight / this.opts.ratioWidth;
        this.state.windowWidth = window.innerWidth;
        this.state.windowHeight = window.innerHeight;

        if (this.state.windowHeight / this.state.windowWidth > this.state.ratio) {
            this.state.conHeight = this.state.windowHeight / this.state.ratio;
            this.$el.style.width = `${this.state.conHeight}px`;
            this.$el.style.height = `${this.state.windowHeight}px`;
        } else {
            this.state.conWidth = this.state.windowHeight / this.state.ratio;
            this.state.mWidth = this.state.windowWidth - this.state.conWidth;
            this.$el.style.width = `${this.state.conWidth + this.state.mWidth}px`;
            this.$el.style.height = `${this.state.windowHeight + this.state.mWidth}px`;
        }

        this.state.wrapWidth = this.$el.offsetWidth;
        this.state.wrapHeight = this.$el.offsetHeight;

        this.$el.style.left = `${(this.state.windowWidth - this.state.wrapWidth) / 2}px`;
        this.$el.style.top = `${(this.state.windowHeight - this.state.wrapHeight) / 2}px`;

        if (this.opts.horizontal) {
            this.$el.style.width = `${this.state.wrapWidth}px`;
        } else {
            this.$el.style.height = `${this.state.wrapHeight}px`;
        }
    }

    render() {
        if (this.opts.horizontal) {
            this.$el.style.backgroundPositionX = `-${this.$el.offsetWidth * this.state.nowFrame}px`;
        } else {
            this.$el.style.backgroundPositionY = `-${this.$el.offsetHeight * this.state.nowFrame}px`;
        }
    }

    play() {
        if (this.state.isPlay) return;
        this.state.isPlay = true;
        this.state.timer = setTimeout(() => {
            this.state.isPlay = false;
            this.state.nowFrame = this.state.nowFrame + 1;
            this.render();
            this.play();
            if (this.state.nowFrame >= this.opts.frame) {
                this.stop();
                this.$el.dispatchEvent(new Event("end"));
            }
        }, this.opts.fps);
    }

    seek(num) {
        this.state.isPlay = false;
        this.state.nowFrame = num;
        clearTimeout(this.state.timer);
        this.render();
        this.play();
    }

    pause() {
        this.state.isPlay = false;
        clearTimeout(this.state.timer);
    }

    stop() {
        this.state.isPlay = false;
        this.state.nowFrame = 0;
        clearTimeout(this.state.timer);
        this.render();
    }

    on(event, func) {
        if (this.$el) {
            this.$el.addEventListener(event, func);
        } else {
            console.error(`Spriteimg: Element '${this.opts.el}' not found.`);
        }
    }
}

export default Spriteimg;