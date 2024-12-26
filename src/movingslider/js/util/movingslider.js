export default class DynamicSlider {
    constructor(options) {
        this.sliderSelector = options.sliderSelector;
        this.initialCenterIndex = options.initialCenterIndex;
        this.totalSlides = options.totalSlides;
        this.centerWidth = options.centerWidth;
        this.sideWidth = options.sideWidth;
        this.centerHeight = options.centerHeight;
        this.sideHeight = options.sideHeight;
        this.centerGap = options.centerGap;
        this.sideGap = options.sideGap;
        this.visibleSlides = options.visibleSlides || 5;

        this.usePagination = options.usePagination || false;
        this.useNavButtons = options.useNavButtons || false;

        this.paginationSelector = options.paginationSelector || '#pagination';
        this.prevButtonSelector = options.prevButtonSelector || '#prevButton';
        this.nextButtonSelector = options.nextButtonSelector || '#nextButton';

        this.currentIndex = this.initialCenterIndex;
        this.previousIndex = null; // 초기에는 이전 인덱스가 없으므로 null로 설정

        // 콜백 초기화
        this.slideChangeCallback = null;

        // DOM 요소들 초기화
        this.sliderElement = document.querySelector(this.sliderSelector);

        if (!this.sliderElement) {
            console.error(`Slider element not found for selector: ${this.sliderSelector}`);
            return;
        }

        if (this.usePagination) {
            this.paginationElement = document.createElement('div');
            this.paginationElement.id = 'pagination';
            this.paginationElement.classList.add('pagination');
            this.sliderElement.appendChild(this.paginationElement);
        }

        if (this.useNavButtons) {
            this.prevButton = document.createElement('button');
            this.prevButton.id = 'prevButton';
            this.prevButton.classList.add('slide-btn', 'slide-btn__prev');
            this.prevButton.textContent = 'Prev';
            this.sliderElement.appendChild(this.prevButton);

            this.nextButton = document.createElement('button');
            this.nextButton.id = 'nextButton';
            this.nextButton.classList.add('slide-btn', 'slide-btn__next');
            this.nextButton.textContent = 'Next';
            this.sliderElement.appendChild(this.nextButton);
        }

        if (this.useNavButtons) {
            this.addEventListeners();
        }

        this.updateSlider();
        this.updateSliderContainerSize();

        // 초기화 후 콜백 호출
        if (this.slideChangeCallback) {
            this.slideChangeCallback(this.currentIndex, this.previousIndex);
        }
    }

    onSlideChange(callback) {
        if (typeof callback === 'function') {
            this.slideChangeCallback = callback;

            // 현재 상태를 즉시 콜백으로 전달
            if (this.currentIndex !== null) {
                this.slideChangeCallback(this.currentIndex, this.previousIndex);
            }
        } else {
            console.error('onSlideChange expects a function as its argument');
        }
    }

    goToSlide(index) {
        this.previousIndex = this.currentIndex;
        this.currentIndex = index;

        this.updateSlider();

        // 콜백 호출
        if (this.slideChangeCallback) {
            this.slideChangeCallback(this.currentIndex, this.previousIndex);
        }
    }

    goToNext() {
        const nextIndex = (this.currentIndex + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    goToPrev() {
        const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    addEventListeners() {
        this.prevButton.addEventListener('click', this.goToPrev.bind(this));
        this.nextButton.addEventListener('click', this.goToNext.bind(this));
    }

    updateSlider() {
        const slides = document.querySelectorAll('.slide__list');
        const totalVisible = Math.min(this.visibleSlides, this.totalSlides);

        slides.forEach((slide, index) => {
            const offset = (index - this.currentIndex + this.totalSlides) % this.totalSlides;
            const adjustedOffset = offset > Math.floor(this.totalSlides / 2) ? offset - this.totalSlides : offset;

            let translateX = 0;

            if (adjustedOffset === 0) {
                translateX = 0;
            } else {
                const absOffset = Math.abs(adjustedOffset);
                const isLeft = adjustedOffset < 0;

                if (absOffset === 1) {
                    translateX = (isLeft ? -1 : 1) * ((this.centerWidth + this.centerGap) / 2 + this.sideWidth / 2);
                } else {
                    translateX = (isLeft ? -1 : 1) * (
                        (this.centerWidth + this.centerGap) / 2 +
                        this.sideWidth / 2 +
                        (absOffset - 1) * (this.sideWidth + this.sideGap)
                    );
                }
            }

            slide.style.transform = `translateX(${translateX}px)`;
            slide.style.opacity = Math.abs(adjustedOffset) < totalVisible / 2 ? 1 : 0;
            slide.style.zIndex = 10 - Math.abs(adjustedOffset);
            slide.classList.toggle('active', adjustedOffset === 0);

            if (adjustedOffset === 0) {
                slide.style.width = `${this.centerWidth}px`;
                slide.style.height = `${this.centerHeight}px`;
            } else {
                slide.style.width = `${this.sideWidth}px`;
                slide.style.height = `${this.sideHeight}px`;
            }
        });

        if (this.usePagination) this.updatePagination();
    }

    updateSliderContainerSize() {
        const sliderContainer = document.querySelector('.slider-container');
        if (!sliderContainer) {
            console.error('slider-container not found');
            return;
        }

        const totalWidth = this.centerWidth + (this.visibleSlides - 1) * (this.sideWidth + this.sideGap) + this.centerGap;
        sliderContainer.style.width = `${this.centerWidth}px`;
        sliderContainer.style.height = `${this.centerHeight}px`;
    }

    updatePagination() {
        this.paginationElement.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const pageButton = document.createElement('button');
            pageButton.classList.add('pagination__btn');
            if (i === this.currentIndex) pageButton.classList.add('active');
            pageButton.addEventListener('click', () => this.goToSlide(i));
            this.paginationElement.appendChild(pageButton);
        }
    }

    to(index) {
        this.goToSlide(index);
    }
}
