import '../sass/index.scss';
import Tilt from './util/tilt';

const tilt1 = new Tilt({
    el: '.tilt1__image',    // 해당 엘리먼트
    rotationXMax: 0.05,     // 기울기 X값
    rotationYMax: 0.05,     // 기울기 Y값
    duration: 2,            // 애니메이션 지속 시간
    delay: 0.0              // 대기 시간
});

const tilt2 = new Tilt({
    el: '.tilt2__image',
    rotationXMax: 0.05,
    rotationYMax: 0.05,
    duration: 2,
    delay: 0.0
});

tilt1.on("mouseEnter", () => {
    console.log("Mouse entered!");
});

tilt1.on("mouseLeave", () => {
    console.log("Mouse Leave!");
});

tilt2.on("mouseEnter", () => {
    console.log("Mouse entered!222222222");
});

tilt2.on("mouseLeave", () => {
    console.log("Mouse Leave!2222222222222");
});

// Tilt 객체 사용 후, 더 이상 필요하지 않을 때 제거
// tilt1.destroy();