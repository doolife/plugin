class Bluemarble {
    constructor(opts){
        this.opts = Object.assign({
            el:"#element",
            total:4
        }, opts);

        this.randomArray = [1, 2, 3, 4, 5, 6];
        this.listArray = [];
        this.chtArray = [];
        this.chtCurrentIdNum = "";
        this.chtCurrentNum = [];
        this.chtCurrentPos = [];
        this.stopChk = true;

        this.elBoardWrap = document.querySelector(this.opts.el);
        this.elBoardList = this.elBoardWrap.querySelectorAll("li");
        this.elChtWrap = this.elBoardWrap.querySelector("#characters");
        this.elResult = this.elBoardWrap.querySelector("#result");
        this.elBtnDice = this.elBoardWrap.querySelector(".btn_dice");
        this.$elBoardList;
        this.$elChtList;

        this.init();
    }

    init(){
        this.controls();
        this.boardSet();
        this.characterSet();
    }

    controls(){
        this.elBtnDice.addEventListener("click", (event) => {
            this.random();
        });
    }

    boardSet(){
        Array.prototype.forEach.call(this.elBoardList, (value, index)=> {
            value.setAttribute("data-list", "board"+index+"");
            this.listArray.push("board"+index);
        });
    }

    characterSet(){
        for ( let i=0 ; i<this.opts.total ; i++ ){
            this.chtArray.push("character"+i);
        }

        Array.prototype.forEach.call(this.chtArray, (value, index)=> {
            let chtList = "<li data-cht='"+value+"'>"+index+"</li>";
            this.elChtWrap.innerHTML += chtList;
            this.chtCurrentNum.push(0);
            this.chtCurrentPos[index] = {
                "x":0,
                "y":0
            };
        });

        this.chtCurrentIdNum = 0;
    }

    random(){
        if(!this.stopChk) return false;
        let randomIndex = Math.random()*this.randomArray.length;
        let cutIndex = Math.floor(randomIndex);

        this.elResult.innerHTML = "주사위="+this.randomArray[cutIndex]+" | cht"+this.chtCurrentIdNum;
        this.chtCurrentNum[this.chtCurrentIdNum] = (this.chtCurrentNum[this.chtCurrentIdNum]+this.randomArray[cutIndex]);

        this.$elBoardList = this.elBoardWrap.querySelector("[data-list=board"+this.chtCurrentNum[this.chtCurrentIdNum]+"]");
        this.$elchtList = this.elChtWrap.querySelector("[data-cht=character"+this.chtCurrentIdNum+"]");

        this.moving();
        this.currentNumSet();

    }

    moving(){
        if (this.chtCurrentNum[this.chtCurrentIdNum] >= this.elBoardList.length){
            this.chtCurrentPos[this.chtCurrentIdNum].x = 0;
            this.chtCurrentPos[this.chtCurrentIdNum].y = 0;
            this.stopChk = false;
        }else{
            this.chtCurrentPos[this.chtCurrentIdNum].x = this.$elBoardList.offsetLeft;
            this.chtCurrentPos[this.chtCurrentIdNum].y = this.$elBoardList.offsetTop;
        }

        this.$elchtList.style.left = this.chtCurrentPos[this.chtCurrentIdNum].x+"px";
        this.$elchtList.style.top = this.chtCurrentPos[this.chtCurrentIdNum].y+"px";
    }

    currentNumSet(){
        this.chtCurrentIdNum = this.chtCurrentIdNum+1;

        if(this.chtCurrentIdNum===this.opts.total){
            this.chtCurrentIdNum = 0;
        }
    }
}

export default Bluemarble;