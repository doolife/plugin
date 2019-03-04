class Bluemarble {
    constructor(opts){
        this.opts = Object.assign({
            el:"#element",
            total:4
        }, opts);

        this.randomArray = [1, 2, 3, 4, 5, 6];
        this.listArray = [];
        this.chtArray = [];
        this.chtCurrentNum = [];

        this.elBoardWrap = document.querySelector(this.opts.el);
        this.elBoardList = this.elBoardWrap.querySelectorAll("li");
        this.elChtWrap = this.elBoardWrap.querySelector("#characters");
        this.elResult = this.elBoardWrap.querySelector("#result");
        this.btnDice = this.elBoardWrap.querySelector(".btn_dice");

        this.init();
    }

    init(){
        this.controls();
        this.board();
        this.characterSet();
        // this.random();
    }

    controls(){
        this.btnDice.addEventListener("click", (event) => {
            console.log(event)
            this.random();
        });
    }

    board(){
        Array.prototype.forEach.call(this.elBoardList, (value, index)=> {
            // value.dataset.list = "list"+index+"";    ie 11 미만 미지원
            value.setAttribute("data-list", "list"+index+"");
            this.listArray.push("list"+index);
            // console.log(this.elBoardList[index].getAttribute("data-list"))
        });
    }

    characterSet(){
        for ( let i=0 ; i<this.opts.total ; i++ ){
            this.chtArray.push("character"+i);
        }

        Array.prototype.forEach.call(this.chtArray, (value, index)=> {
            let chtList = "<li data-cht='"+value+"'>"+index+"</li>";
            this.elChtWrap.innerHTML += chtList;
            this.chtCurrentNum[index] = 0;
        });
    }

    random(){
        let randomIndex = Math.random()*this.randomArray.length;
        let cutIndex = Math.floor(randomIndex);
        this.elResult.innerHTML = this.randomArray[cutIndex];
        console.log(this.randomArray.length+" | 배열 길이");
        console.log(cutIndex)
        console.log(this.randomArray, this.randomArray[cutIndex])
    }
}

export default Bluemarble;