import '../sass/index.scss';
import DynamicSlider from './util/movingslider'

const slider = new DynamicSlider({
    sliderSelector: '#slider',
    initialCenterIndex: 0,
    totalSlides: 7,
    centerWidth: 500,
    centerHeight: 400,
    sideWidth: 300,
    sideHeight: 200,
    centerGap: 0,
    sideGap: 0,
    visibleSlides: 5,
    usePagination: true,
    useNavButtons: true,
});

// slider.to(3);
slider.onSlideChange((currentIndex, previousIndex) => {
    console.log('Current Index:', currentIndex);
    console.log('Previous Index:', previousIndex);
});
