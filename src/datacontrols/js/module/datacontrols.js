class Datacontrols {
    constructor(opts){
        this.opts = $.extend(true, {
            el:"#element",
            url:"https://www.kobis.or.kr",
            key:"e93cc391a8b9c32da9cc474c7fc85149",
            totalData:63,
            itemPerPage:10,
            pageList:10,
            currPage:1,
            prevPage:""
        }, opts);

        this.$el = $(this.opts.el);
        this.$elTit = this.$el.find("[data-board-tit]");
        this.$elWrap = this.$el.find("[data-board-wrap]");
        this.$elPaging = this.$el.find("[data-paging-wrap]");

        this.setStr = false;
        this.totalPage;
        this.groupPage;
        this.firstPage;
        this.lastPage;
        this.totalBlock;
        this.setItemPerPage = this.opts.itemPerPage;

        this.init();
    };

    init(){
        this.controls();
        this.resultData();
    };

    paginationFormula() {
        this.opts.itemPerPage = this.setItemPerPage;    // 리스트 실제 개수
        this.totalPage = Math.ceil(this.opts.totalData / this.opts.itemPerPage);     // 총 페이지
        this.lastTotalPage = Math.ceil(this.opts.totalData%this.opts.itemPerPage);      // 마지막 리스트 개수
        this.groupPage = Math.ceil(this.opts.currPage / this.opts.pageList);   // 각 페이지 그룹(1 | 2 | 3 | 4 | 5)
        this.firstPage = (this.groupPage - 1) * this.opts.pageList + 1;   // 각 그룹 첫번째
        this.lastPage = this.firstPage + this.opts.pageList - 1;   // 각 그룹 마지막
        this.totalBlock = Math.ceil(this.totalPage/this.opts.pageList);  // 총 페이지 그룹

        if (this.totalPage < this.opts.currPage) {
            this.opts.currPage = this.totalPage;   // 총페이지가 현재 번호 보다 작을 경우
        }
        if (this.lastPage >= this.totalPage) {  // 각그룹 마지막이 총페이지 보다 클 경우
            this.lastPage = this.totalPage;
            if(this.opts.currPage>=this.lastPage) {
                if(this.lastTotalPage===0) return;
                this.opts.itemPerPage = this.lastTotalPage;  // 마지막 페이지 리스트 개수만큼
            }
        }
    }

    buttonAppend(){
        $("[data-btn='none'], [data-btn='last'], [data-btn='next'], [data-btn='prev'], [data-btn='first']").remove();
        if(this.opts.currPage>=this.totalPage) {    // 현재 번호가 총페이지 보다 같거나 클 경우
            this.$elPaging.prepend("<button type='button' class='board__btn board__btn--last board__btn--none' data-btn='none'>마지막</button>");
        }else{
            this.$elPaging.prepend("<button type='button' class='board__btn board__btn--last' data-btn='last'>마지막</button>");
        }

        if(this.groupPage>=this.totalBlock) {    // 각페이지 그룹이 총페이지 그룹보다 클 경우
            this.$elPaging.prepend("<button type='button' class='board__btn board__btn--next board__btn--none' data-btn='none'>다음</button>");
        }else{
            this.$elPaging.prepend("<button type='button' class='board__btn board__btn--next' data-btn='next'>다음</button>");
        }

        if(this.groupPage<=1) {    // 각페이지 그룹이 1보다 같거나 작을 경우
            this.$elPaging.prepend("<button type='button' class='board__btn board__btn--prev board__btn--none' data-btn='none'>이전</button>");
        }else{
            this.$elPaging.prepend("<button type='button' class='board__btn board__btn--prev' data-btn='prev'>이전</button>");
        }

        if(this.opts.currPage<=1) {    // 현재 번호가 1보다 같거나 작을 경우
            this.$elPaging.prepend("<button type='button' class='board__btn board__btn--first board__btn--none' data-btn='none'>처음</button>");
        }else{
            this.$elPaging.prepend("<button type='button' class='board__btn board__btn--first' data-btn='first'>처음</button>");
        }
    }

    pagingAppend(){
        let tagAppend = "";
        if(!this.setStr) this.$elPaging.append("<div data-paging-list></div>");
        for(let i = this.firstPage; i <=this.lastPage; i++){    // 각 그룹 첫번째부터 각 그룹 마지막까지
            tagAppend += `<button type="button" class="board__p-btn" data-btn="paging" data-num="${i}">${i}</button>`;
        }
        this.$elPaging.find("[data-paging-list]").html(tagAppend);
    }

    controls(){
        $(document).on("click", "[data-btn='last']", evt=> this.display(evt));
        $(document).on("click", "[data-btn='next']", evt=> this.display(evt));
        $(document).on("click", "[data-btn='prev']", evt=> this.display(evt));
        $(document).on("click", "[data-btn='first']", evt=> this.display(evt));
        $(document).on("click", "[data-btn='paging']", evt=> this.display(evt));
    };

    display(evt){
        if(evt.currentTarget.dataset.btn==="last") this.opts.currPage = this.totalPage;
        if(evt.currentTarget.dataset.btn==="next") this.opts.currPage = this.lastPage+1;
        if(evt.currentTarget.dataset.btn==="prev") this.opts.currPage = this.firstPage-1;
        if(evt.currentTarget.dataset.btn==="first") this.opts.currPage = 1;
        if(evt.currentTarget.dataset.btn==="paging") this.opts.currPage = Number(evt.currentTarget.dataset.num);

        if(this.opts.currPage===this.opts.prevPage) return;
        if(this.opts.currPage<1) {this.opts.currPage = 1; return;}
        if(this.opts.totalData<this.opts.currPage) {this.opts.currPage = this.opts.totalData; return;}

        this.resultData();

        this.opts.prevPage = this.opts.currPage;
    }

    resultData(){
        this.paginationFormula();
        this.buttonAppend();
        this.getData().then((data)=>{
            this.insertGetData(data.movieListResult);
            this.pagingAppend();
            this.activeInactive();
            this.setStr = true;
        }).catch((error)=>{
            console.log(error, "실패라구욧!")
        });
    };

    getData(){
        return new Promise( (resolve, reject)=> {
            $.get(`${this.opts.url}/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${this.opts.key}&curPage=${this.opts.currPage}&itemPerPage=${this.opts.itemPerPage}`, (response)=> {
                if(response) resolve(response); return false;
            });
        });
    };

    insertGetData(data){
        if(!this.setStr) this.$elTit.append(`${data.source}`);
        this.$elWrap.find("[data-list]").remove();
        data.movieList.forEach((key, index)=>{
            this.$elWrap.append(
                `<li class="board__list" data-list="${key.movieCd}">`+
                    `국가 : ${key.repNationNm},<br/> 장르 : ${key.genreAlt},<br/> 제목 : ${key.movieNm}`+
                `</li>`
            );
        });
    }

    activeInactive(){
        $("[data-num]").removeClass("board__p-btn--on");
        $(`[data-num=${this.opts.currPage}]`).addClass("board__p-btn--on");
    }
};

export default Datacontrols;