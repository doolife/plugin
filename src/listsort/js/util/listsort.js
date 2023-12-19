class Listsort {
    constructor(options) {
        this.opts = {
            el: '#element',
            width: 150,
            height: 150,
            padding: 100,
            delay: 50,
            speed: 300,
            customized: false,
            length: 50,
            modifier: 'color__list',
            ...options,
        };

        this.$wrap = document.querySelector(this.opts.el);
        this.$list = [];
        this.$timeId = null;

        this.init();
    }

    init() {
        window.addEventListener('resize', () => {
            clearTimeout(this.$timeId);
            this.$timeId = setTimeout(() => this.resizeList(), 300);
        });

        window.addEventListener('DOMContentLoaded', () => {
            this.generateList();
            this.resizeList();
        });

        this.$wrap.addEventListener('click', (event) => this.handleItemClick(event));
    }

    handleItemClick(event) {
        const current = parseInt(event.target.dataset.index, 10);
        if (!isNaN(current)) {
            const previous = parseInt(this.$wrap.dataset.lastClickedIndex, 10) || null;
            this.emitEvent('click', current, previous);
            this.$wrap.dataset.lastClickedIndex = current;
        }
    }

    generateList() {
        if (!this.opts.customized) {
            this.$list = Array.from(this.$wrap.children);
            this.$list.forEach((el, idx)=>{ el.dataset.index = idx+1 });
            return;
        }

        for (let i = 1; i <= this.opts.length; i++) {
            const listItem = document.createElement('div');
            listItem.classList.add(this.opts.modifier);
            listItem.textContent = i;
            listItem.dataset.index = i;
            listItem.style.width = `${this.opts.width}px`;
            listItem.style.height = `${this.opts.height}px`;
            this.$list.push(listItem);
            this.$wrap.appendChild(listItem);
        }
    }

    resizeList() {
        const winWidth = window.innerWidth;
        const listWidth = this.$list[0].offsetWidth;
        const listHeight = this.$list[0].offsetHeight;
        const listLength = Math.floor((winWidth - this.opts.padding) / listWidth);
        const wrapWidth = listLength * listWidth;
        let heightLength;

        this.$list.forEach((el, i) => {
            const numTop = Math.floor(i / listLength) * listWidth;
            const numLeft = (i % listLength) * listWidth;
            heightLength = Math.floor(i / listLength);
            el.style.transition = `top ${this.opts.speed}ms, left ${this.opts.speed}ms`;
            el.style.transitionDelay = `${i * this.opts.delay}ms`;
            el.style.top = `${numTop}px`;
            el.style.left = `${numLeft}px`;
        });

        this.$wrap.style.width = `${wrapWidth}px`;
        this.$wrap.style.height = `${(heightLength + 1) * listHeight}px`;
    }

    on(eventName, callback) {
        this.events = this.events || {};
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
    }

    emitEvent(eventName, ...index) {
        if (this.events && this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(...index);
            });
        }
    }
}

export default Listsort;