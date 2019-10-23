let header = document.querySelector("[data-fix='header']");
let contents = document.querySelector("[data-fix='contents']");

const resizeResult = (height)=>{
    header.style.height = window.innerHeight+"px";
    contents.style.marginTop = window.innerHeight+"px";
    return height;
};

export default resizeResult;