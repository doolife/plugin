class Datacontrols {
    constructor(opts){
        let basicOpts = {
            el:"#element",
            url:"https://www.kobis.or.kr"
        }

        this.opts = Object.assign(opts, basicOpts);

        this.$elTit = $("[data-board-tit]");
        this.$elWrap = $("[data-board-wrap]");

        this.init();
    };

    init(){
        this.controls();
        this.resultData();
    };

    controls(){
        $("[data-btn='prev']").on("click", ()=>{

        });
        $("[data-btn='next']").on("click", ()=>{

        });
    }


    resultData(){
        this.getData().then((data)=>{
            this.insertGetData(data.boxOfficeResult);
        }).catch((error)=>{
            console.log(error, "실패라구욧!")
        });
    };

    getData(){
        return new Promise( (resolve, reject)=> {
            $.get(`${this.opts.url}/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${this.opts.key}&targetDt=20191225`, (response)=> {
                if(response) resolve(response); return false;
            });
        });
    };

    insertGetData(data){
        this.$elTit.append(`${data.boxofficeType}`);
        data.weeklyBoxOfficeList.forEach((key, index)=>{
            this.$elWrap.append(
                `<li class="board__list" data-list="${key.rank}">`+
                    `${key.rank}위 : ${key.movieNm}`+
                `</li>`
            );
        });
    }
};

export default Datacontrols;