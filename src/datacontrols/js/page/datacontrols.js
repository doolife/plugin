class Datacontrols {
    constructor(opts){
        this.opts = Object.assign({
            el:"#element"
        }, opts);

        // Datacontrols.siteUrl = "https://www.cheil.com";

        this.$elBoardWrap = $("[data-board='wrap']");

        this.init();
    };

    static get siteUrl(){
        return "https://www.cheil.com";
    };

    init(){
        console.dir(Datacontrols)
        this.getDataResult();
    };

    getDataResult(){
        this.getData().then((boardData)=>{
            this.insertGetData(boardData);
        }).catch((error)=>{
            console.log(error, "실패라구욧!")
        });
    };

    getData(){
        const url = "https://www.cheil.com";
        return new Promise(function (resolve, reject) {
            $.get(`${Datacontrols.siteUrl}/hq/addportfolio?page=0&pname=portfolio&title=&latest=&office=KORE&lang=ko&slatest=&atoz=latest&pageSize=12&pageBlockSize=10`, function (response) {
                if(response){
                    resolve(response);
                    return false;
                }
                reject(Error("실패라구욧!"));
            });
        });
    };

    insertGetData(boardData){
        const url = "https://www.cheil.com";
        boardData.list.forEach((key, index)=>{
            this.$elBoardWrap.append(
                "<li data-list='"+index+"'>" +
                    "<img src='"+Datacontrols.siteUrl+key.fi_path+"' alt=''>" +
                    "<span>"+key.pf_title+"</span>"+
                "</li>"
            );
        });
    }
};

export default Datacontrols;