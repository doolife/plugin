import videoInfo from "./video-info";

let currMovie = {}, prevMovie = null;
const videoControl = (thisId) => {
    if(!currMovie[thisId]){
        console.log(videoInfo[thisId].url)
        currMovie[thisId] = promokit.youtube({
            el:`#${thisId}`,
            youtubeid:`${videoInfo[thisId].url}`,
            loop:true,
            autoplay:true,
        });
    };
    prevMovie && prevMovie.pause();
    currMovie[`${thisId}`].play();
    prevMovie = currMovie[`${thisId}`];
};

export default videoControl;