class Datacontrols {
    constructor(opts){
        this.opts = Object.assign({
            el:"#element"
        }, opts);

        this.pageNum = 0;
        this.listNum = 12;
        this.$elWrap = $("[data-board='wrap']");

        this.init();
    };

    static get siteUrl(){
        return "https://www.cheil.com";
    };

    init(){
        this.controls();
        this.getDataResult();
    };

    controls(){
        $("[data-btn='prev']").on("click", ()=>{
            this.$elWrap.find("li").remove();
            this.pageNum--;
            this.getDataResult();
        });
        $("[data-btn='next']").on("click", ()=>{
            this.$elWrap.find("li").remove();
            this.pageNum++;
            this.getDataResult();
        });
    }


    getDataResult(){
        this.getData().then((boardData)=>{
            this.insertGetData(boardData);
        }).catch((error)=>{
            console.log(error, "실패라구욧!")
        });
    };

    getData(){
        return new Promise( (resolve, reject)=> {
            $.get(`${Datacontrols.siteUrl}/hq/addportfolio?page=${this.pageNum}&pname=portfolio&title=&latest=&office=KORE&pageSize=${this.listNum}`, (response)=> {
                if(response){
                    resolve(response);
                    return false;
                }
            });
        });
    };

    insertGetData(boardData){
        boardData.list.forEach((key, index)=>{
            this.$elWrap.append(
                `<li class="board__list" data-list="${index}">`+
                    `<img src="${Datacontrols.siteUrl+key.fi_path}" alt="" class="board__img">`+
                    `<p class="board__tit">${key.pf_title}</p>`+
                `</li>`
            );
        });
    }
};

export default Datacontrols;