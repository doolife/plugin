import '../sass/index.scss';
import {useDynamicSlider} from './util/movingslider'

const slider = useDynamicSlider({
    sliderSelector: '#slider',
    slideItemClass: ".slide__list",
    initialCenterIndex: 0,
    centerWidth: 715,
    centerHeight: 400,
    sideWidth: 458,
    sideHeight: 277,
    centerGap: 120,
    sideGap: 40,
    visibleSlides: 5,
    transitionDuration: 0.5,
    useNavButtons: true,
    usePagination: false,
    autoEnableControls: true
});
// slider.enableControls();
// slider.to(3);
slider.onSlideChange((currentIndex, previousIndex) => {
    console.log('Current Index:', currentIndex);
    console.log('Previous Index:', previousIndex);
});
