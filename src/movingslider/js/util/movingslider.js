export const useDynamicSlider = (options) => {
    const {
        sliderSelector = "#slider",             // 전체 요소 셀렉터
        slideItemClass = ".slide__list",        // 리스트 요소 셀렉터
        initialCenterIndex = 0,					// 가운데 보이게할 슬라이드 인덱스
        centerWidth = 715,						// 가운데 슬라이드 가로 크기
        centerHeight = 400,						// 가운데 슬라이드 세로 크기
        sideWidth = 458,						// 양옆 나머지 슬라이드 가로 크기
        sideHeight = 277,						// 양옆 나머지 슬라이드 세로 크기
        centerGap = 120,						// 가운데 슬라이드 양옆 간격
        sideGap = 40,							// 사이드 슬라이드 양옆 간격
        visibleSlides = 5,						// 화면에 보여질 슬라이드 개수
        transitionDuration = 0.5,				// 슬라이드 애니메이션 시간
        useNavButtons = false,					// 좌우 버튼 사용 여부
        usePagination = false,					// 페이지네이션 버튼 사용 여부
        autoEnableControls = true				// 좌우 및 페이징 버튼 활성화 여부(기본 true이며 false일 경우 slider.enableControls() 호출로 활성화 가능)
    } = options;

    let currentIndex = initialCenterIndex;
    let previousIndex = null;
    let isAnimating = false;
    let slideChangeCallback = null;

    const sliderElement = document.querySelector(sliderSelector);
    if (!sliderElement) {
        console.error(`Slider element not found for selector: ${sliderSelector}`);
        return;
    }

    const slides = Array.from(sliderElement.querySelectorAll(slideItemClass));
    const totalSlides = slides.length;

    let paginationElement, prevButton, nextButton;

    if (usePagination) {
        paginationElement = document.createElement("div");
        paginationElement.id = "pagination";
        paginationElement.classList.add("pagination");
        sliderElement.appendChild(paginationElement);
    }

    if (useNavButtons) {
        prevButton = document.createElement("button");
        prevButton.id = "prevButton";
        prevButton.classList.add("slide-btn", "slide-btn__prev");
        prevButton.textContent = "Prev";
        prevButton.disabled = true;
        sliderElement.appendChild(prevButton);

        nextButton = document.createElement("button");
        nextButton.id = "nextButton";
        nextButton.classList.add("slide-btn", "slide-btn__next");
        nextButton.textContent = "Next";
        nextButton.disabled = true;
        sliderElement.appendChild(nextButton);
    }

    const goToSlide = (index) => {
        if (isAnimating) return;
        isAnimating = true;

        previousIndex = currentIndex;
        currentIndex = index;

        updateSlider();

        setTimeout(() => {
            isAnimating = false;
        }, transitionDuration * 1000);

        slideChangeCallback?.(currentIndex, previousIndex);
    };

    const goToNext = () => goToSlide((currentIndex + 1) % totalSlides);
    const goToPrev = () => goToSlide((currentIndex - 1 + totalSlides) % totalSlides);

    const addEventListeners = () => {
        prevButton?.addEventListener("click", goToPrev);
        nextButton?.addEventListener("click", goToNext);
    };

    const updateSlider = () => {
        const totalVisible = Math.min(visibleSlides, totalSlides);

        slides.forEach((slide, index) => {
            const offset = (index - currentIndex + totalSlides) % totalSlides;
            const adjustedOffset = offset > Math.floor(totalSlides / 2) ? offset - totalSlides : offset;

            let translateX = 0;
            if (adjustedOffset !== 0) {
                const absOffset = Math.abs(adjustedOffset);
                const isLeft = adjustedOffset < 0;

                translateX = (isLeft ? -1 : 1) * (
                    (centerWidth + centerGap) / 2 +
                    sideWidth / 2 +
                    (absOffset - 1) * (sideWidth + sideGap)
                );
            }

            slide.style.transition = `all ${transitionDuration}s ease`;
            slide.style.transform = `translateX(${translateX}px)`;
            slide.style.opacity = Math.abs(adjustedOffset) < totalVisible / 2 ? 1 : 0;
            slide.style.zIndex = 10 - Math.abs(adjustedOffset);
            slide.classList.toggle("active", adjustedOffset === 0);

            slide.style.width = adjustedOffset === 0 ? `${centerWidth}px` : `${sideWidth}px`;
            slide.style.height = adjustedOffset === 0 ? `${centerHeight}px` : `${sideHeight}px`;
        });

        if (usePagination) updatePagination();
    };

    const updateSliderContainerSize = () => {
        const sliderContainer = document.querySelector(".slider-container");
        if (!sliderContainer) {
            console.error("slider-container not found");
            return;
        }

        sliderContainer.style.width = `${centerWidth}px`;
        sliderContainer.style.height = `${centerHeight}px`;
    };

    const updatePagination = () => {
        paginationElement.innerHTML = "";
        for (let i = 0; i < totalSlides; i++) {
            const pageButton = document.createElement("button");
            pageButton.classList.add("pagination__btn");
            pageButton.disabled = true;
            if (i === currentIndex) pageButton.classList.add("active");
            pageButton.addEventListener("click", () => goToSlide(i));
            paginationElement.appendChild(pageButton);
        }
    };

    const enableControls = () => {
        prevButton && (prevButton.disabled = false);
        nextButton && (nextButton.disabled = false);
        if (usePagination) {
            const pageButtons = paginationElement.querySelectorAll(".pagination__btn");
            pageButtons.forEach(button => (button.disabled = false));
        }
    };

    if (useNavButtons) addEventListeners();
    updateSlider();
    updateSliderContainerSize();

    if (autoEnableControls) {
        enableControls();
    }

    return {
        goToNext,
        goToPrev,
        goToSlide,
        onSlideChange: (callback) => (slideChangeCallback = callback),
        enableControls
    };
};
