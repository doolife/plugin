class Bluemarble {
    constructor(opts){
        this.opts = Object.assign({
            el:"#element",
            total:4,
            chtPos:[
                {"x":0, "y":0},
                {"x":50, "y":0},
                {"x":0, "y":30},
                {"x":50, "y":30}
            ]
        }, opts);

        this.randomArray = [1, 2, 3, 4, 5, 6];
        this.boardArray = [];
        this.chtArray = [];
        this.chtCurrentIdNum = "";
        this.chtCurrentNum = [];
        this.chtCurrentPos = [];
        this.stopChk = true;
        this.startChk = true;

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
            this.boardAction();
        });
    }

    boardSet(){
        Array.prototype.forEach.call(this.elBoardList, (value, index)=> {
            value.setAttribute("data-list", "board"+index+"");
            this.boardArray.push("board"+index);
        });
    }

    characterSet(){
        for ( let i=0 ; i<this.opts.total ; i++ ){
            this.chtArray.push("character"+i);
        }
        this.characterReset();
    }

    characterReset(){
        Array.prototype.forEach.call(this.chtArray, (value, index)=> {
            if(this.startChk){
                let chtList = "<li data-cht='"+value+"'>"+index+"</li>";
                this.elChtWrap.innerHTML += chtList;
                this.chtCurrentNum.push(0);
            }else{
                this.chtCurrentNum[index] = 0;
            }
            this.chtCurrentPos[index] = {
                "x":0,
                "y":0
            };
            this.elChtWrap.querySelector("[data-cht="+value+"]").style.left = this.opts.chtPos[index].x+"px";
            this.elChtWrap.querySelector("[data-cht="+value+"]").style.top = this.opts.chtPos[index].y+"px";
        });
        this.chtCurrentIdNum = 0;
    }

    boardAction(){
        if(!this.stopChk) return false;

        let ranNumber = this.random(0, this.randomArray.length);

        this.moving(ranNumber);
        this.currentNumSet();

    }

    random(min, max){
        let randomIndex = Math.random()*(max - min) + min;
        let cutIndex = Math.floor(randomIndex);
        return cutIndex;
    }

    moving(ranNumber){
        this.chtCurrentNum[this.chtCurrentIdNum] = (this.chtCurrentNum[this.chtCurrentIdNum]+this.randomArray[ranNumber]);

        this.$elBoardList = this.elBoardWrap.querySelector("[data-list=board"+this.chtCurrentNum[this.chtCurrentIdNum]+"]");
        this.$elchtList = this.elChtWrap.querySelector("[data-cht=character"+this.chtCurrentIdNum+"]");

        if (this.chtCurrentNum[this.chtCurrentIdNum] >= this.elBoardList.length){
            this.chtCurrentPos[this.chtCurrentIdNum].x = 0;
            this.chtCurrentPos[this.chtCurrentIdNum].y = 0;
            this.stopChk = false;
        }else{
            this.chtCurrentPos[this.chtCurrentIdNum].x = this.$elBoardList.offsetLeft;
            this.chtCurrentPos[this.chtCurrentIdNum].y = this.$elBoardList.offsetTop;
            this.elResult.innerHTML = "cht"+this.chtCurrentIdNum+" | 주사위="+this.randomArray[ranNumber];
        }

        this.$elchtList.style.left = this.chtCurrentPos[this.chtCurrentIdNum].x+this.opts.chtPos[this.chtCurrentIdNum].x+"px";
        this.$elchtList.style.top = this.chtCurrentPos[this.chtCurrentIdNum].y+this.opts.chtPos[this.chtCurrentIdNum].y+"px";
    }

    currentNumSet(){
        this.chtCurrentIdNum = this.chtCurrentIdNum+1;

        if(this.chtCurrentIdNum===this.opts.total){
            this.chtCurrentIdNum = 0;
        }
        if(!this.stopChk) this.result();

    }

    result(){
        this.elResult.innerHTML = "cht"+(this.chtCurrentIdNum-1)+" 승!";
        setTimeout( ()=> {
            alert("다시 시작 합니다.");
            this.elResult.innerHTML = "";
            this.startChk = false;
            this.stopChk = true;
            this.characterReset();
        }, 0);
    }
}

export default Bluemarble;