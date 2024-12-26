class Datacontrols {
    constructor(opts) {
        this.opts = Object.assign({
            el: "#element",
            url: "https://www.kobis.or.kr",
            key: "e93cc391a8b9c32da9cc474c7fc85149",
            totalData: 63,
            itemPerPage: 10,
            pageList: 10,
            currPage: 1,
            prevPage: ""
        }, opts);

        this.$el = document.querySelector(this.opts.el);
        this.$elTit = this.$el.querySelector("[data-board-tit]");
        this.$elWrap = this.$el.querySelector("[data-board-wrap]");
        this.$elPaging = this.$el.querySelector("[data-paging-wrap]");

        this.setStr = false;
        this.totalPage = 0;
        this.groupPage = 0;
        this.firstPage = 0;
        this.lastPage = 0;
        this.totalBlock = 0;
        this.setItemPerPage = this.opts.itemPerPage;

        this.init();
    }

    init() {
        this.controls();
        this.resultData();
    }

    paginationFormula() {
        this.opts.itemPerPage = this.setItemPerPage;
        this.totalPage = Math.ceil(this.opts.totalData / this.opts.itemPerPage);
        this.lastTotalPage = this.opts.totalData % this.opts.itemPerPage;
        this.groupPage = Math.ceil(this.opts.currPage / this.opts.pageList);
        this.firstPage = (this.groupPage - 1) * this.opts.pageList + 1;
        this.lastPage = this.firstPage + this.opts.pageList - 1;
        this.totalBlock = Math.ceil(this.totalPage / this.opts.pageList);

        if (this.totalPage < this.opts.currPage) {
            this.opts.currPage = this.totalPage;
        }
        if (this.lastPage >= this.totalPage) {
            this.lastPage = this.totalPage;
            if (this.opts.currPage >= this.lastPage) {
                if (this.lastTotalPage === 0) return;
                this.opts.itemPerPage = this.lastTotalPage;
            }
        }
    }

    buttonAppend() {
        // 버튼을 추가하기 전에 항상 초기화
        this.$elPaging.innerHTML = ''; // 기존 버튼 제거

        // 마지막 버튼
        if (this.opts.currPage >= this.totalPage) {
            this.$elPaging.insertAdjacentHTML("beforeend", `<button type='button' class='board__btn board__btn--last board__btn--none' data-btn='none'>마지막</button>`);
        } else {
            this.$elPaging.insertAdjacentHTML("beforeend", `<button type='button' class='board__btn board__btn--last' data-btn='last'>마지막</button>`);
        }

        // 다음 버튼
        if (this.groupPage >= this.totalBlock) {
            this.$elPaging.insertAdjacentHTML("beforeend", `<button type='button' class='board__btn board__btn--next board__btn--none' data-btn='none'>다음</button>`);
        } else {
            this.$elPaging.insertAdjacentHTML("beforeend", `<button type='button' class='board__btn board__btn--next' data-btn='next'>다음</button>`);
        }

        // 이전 버튼
        if (this.groupPage <= 1) {
            this.$elPaging.insertAdjacentHTML("beforeend", `<button type='button' class='board__btn board__btn--prev board__btn--none' data-btn='none'>이전</button>`);
        } else {
            this.$elPaging.insertAdjacentHTML("beforeend", `<button type='button' class='board__btn board__btn--prev' data-btn='prev'>이전</button>`);
        }

        // 처음 버튼
        if (this.opts.currPage <= 1) {
            this.$elPaging.insertAdjacentHTML("beforeend", `<button type='button' class='board__btn board__btn--first board__btn--none' data-btn='none'>처음</button>`);
        } else {
            this.$elPaging.insertAdjacentHTML("beforeend", `<button type='button' class='board__btn board__btn--first' data-btn='first'>처음</button>`);
        }
    }

    pagingAppend() {
        let pagingList = this.$elPaging.querySelector("[data-paging-list]");
        if (!pagingList) {
            // 페이징 리스트가 없으면 새로 생성
            this.$elPaging.insertAdjacentHTML("beforeend", `<div data-paging-list></div>`);
            pagingList = this.$elPaging.querySelector("[data-paging-list]");
        }

        let tagAppend = '';
        for (let i = this.firstPage; i <= this.lastPage; i++) {
            tagAppend += `<button type="button" class="board__p-btn" data-btn="paging" data-num="${i}">${i}</button>`;
        }
        pagingList.innerHTML = tagAppend;
    }

    controls() {
        document.addEventListener("click", (evt) => this.display(evt));
    }

    display(evt) {
        const btnType = evt.target.dataset.btn;
        if (!btnType) return;

        if (btnType === "last") this.opts.currPage = this.totalPage;
        if (btnType === "next") this.opts.currPage = this.lastPage + 1;
        if (btnType === "prev") this.opts.currPage = this.firstPage - 1;
        if (btnType === "first") this.opts.currPage = 1;
        if (btnType === "paging") this.opts.currPage = Number(evt.target.dataset.num);

        if (this.opts.currPage === this.opts.prevPage) return;
        if (this.opts.currPage < 1) this.opts.currPage = 1;
        if (this.opts.totalData < this.opts.currPage) this.opts.currPage = this.opts.totalData;

        this.resultData();
        this.opts.prevPage = this.opts.currPage;
    }

    async resultData() {
        this.paginationFormula();
        this.buttonAppend();
        try {
            const data = await this.getData();
            if (data) {
                this.insertGetData(data.movieListResult);
                this.pagingAppend();
                this.activeInactive();
                this.setStr = true;
            }
        } catch (error) {
            console.error("실패라구욧!", error);
        }
    }

    async getData() {
        try {
            const response = await fetch(`${this.opts.url}/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${this.opts.key}&curPage=${this.opts.currPage}&itemPerPage=${this.opts.itemPerPage}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Data fetch error:", error);
            return null;
        }
    }

    insertGetData(data) {
        if (!this.setStr) {
            if (this.$elTit) this.$elTit.innerHTML = `${data.source}`;
        }
        if (this.$elWrap) {
            this.$elWrap.innerHTML = ''; // 기존 데이터 제거
            data.movieList.forEach((key) => {
                this.$elWrap.insertAdjacentHTML("beforeend",
                    `<li class="board__list" data-list="${key.movieCd}">
                        국가 : ${key.repNationNm},<br/> 장르 : ${key.genreAlt},<br/> 제목 : ${key.movieNm}
                    </li>`
                );
            });
        }
    }

    activeInactive() {
        document.querySelectorAll("[data-num]").forEach(el => el.classList.remove("board__p-btn--on"));
        const currentPageButton = document.querySelector(`[data-num='${this.opts.currPage}']`);
        if (currentPageButton) currentPageButton.classList.add("board__p-btn--on");
    }
}

export default Datacontrols;