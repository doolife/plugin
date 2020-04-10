let $element;
const move = (thisId)=>{
    $element = $(thisId);
    let offsetY = $element.offset().top;
    $("html, body").stop().animate({scrollTop:offsetY}, 600, ()=>{
        $element.trigger("end");
    });
};

export default {
    move
};