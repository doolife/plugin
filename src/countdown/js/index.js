import '../sass/index.scss';
import {initializeCountdown} from './util/countdown';

const count = initializeCountdown({
    el: "#counter",
    // startDate: "2025-04-10 09:00:00",
    endDate: "2026-04-16 17:42:05"
});

count.setOnEndCallback(() => {
    console.log("end");
});