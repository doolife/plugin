class Choose{
    constructor(opts){
        this.opts = $.extend(false ,{
            el:"#element",
            data:{
                tribe:1,
                job:16,
                gender:0,
            },
            complete:false
        }, opts);

        this.$tabWrap = $(this.opts.el).find("[data-tab-wrap]");
        this.$tribeWrap = $(this.opts.el).find("[data-tribe-wrap]");
        this.$genderWrap = $(this.opts.el).find("[data-gender-wrap]");

        this.$target = "";

        this.curr = {
            tribe:"",
            job:"",
            gender:"",
        };

        this.prev = {
            tribe:"",
            job:"",
            gender:"",
        };

        this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

        this._init();
    }

    _init(){
        this._settings([this.opts.data.tribe, this.opts.data.job, this.opts.data.gender]);
        this._controls();
    }

    _controls(){
        this.$tabWrap.find("[data-tab]").on("click", (evt)=>{
            if(this.opts.complete) return;
            let target = $(evt.currentTarget).data("tab");
            let targetChild = this.$tribeWrap.find(`[data-tribe=${target}]`).find("[data-job]").eq(0).data("job");
            if(this.curr.tribe === target) return;
            this.changeTribe(target);
            this.changeJob(targetChild);
        });

        this.$tribeWrap.find("[data-job-menu]").on("click", (evt)=>{
            if(this.opts.complete) return;
            let target = $(evt.currentTarget).data("job-menu");
            if(this.curr.job === target) return;
            this.changeJob(target);
        });

        this.$genderWrap.find("[data-gender]").on("click", (evt)=>{
            if(this.opts.complete) return;
            let target = $(evt.currentTarget).data("gender");
            if(this.curr.gender === target) return;
            this.changeGender(target);
        });
    }

    _settings(setArr){
        this.changeTribe(setArr[0]);
        this.changeJob(setArr[1]);
        this.changeGender(setArr[2]);
    }

    changeTribe(tribeStr){
        this.$tabWrap.find(`[data-tab]`).removeClass("p-tab__list--on");
        this.$tribeWrap.find(`[data-tribe]`).removeClass("choose__tribe--on");
        this.$tabWrap.find(`[data-tab=${tribeStr}]`).addClass("p-tab__list--on");
        this.$tribeWrap.find(`[data-tribe=${tribeStr}]`).addClass("choose__tribe--on");
        this.curr.tribe = tribeStr;
    }

    changeJob(jobStr){
        this.$tribeWrap.find(`[data-job-menu]`).removeClass("job-menu__list--on");
        this.$tribeWrap.find(`[data-tribe]`).find(`[data-job]`).removeClass("choose__job--on");
        this.$tribeWrap.find(`[data-job-menu=${jobStr}]`).addClass("job-menu__list--on");
        this.$tribeWrap.find(`[data-tribe=${this.curr.tribe}]`).find(`[data-job=${jobStr}]`).addClass("choose__job--on");
        this.curr.job = jobStr;
        this.checkDevice(jobStr);
    }

    changeGender(genderStr){
        this.$genderWrap.find(`[data-gender]`).removeClass("gender__list--on");
        this.$genderWrap.find(`[data-gender=${genderStr}]`).addClass("gender__list--on");
        this.curr.gender = genderStr;
    }

    checkDevice(id){
        if(this.isMobile===null){
            this.jobMovie(id);
        }else{
            this.jobImage(id);
        }
        this.prev.tribe = this.curr.tribe;
        this.prev.job = this.curr.job;
        this.prev.gender = this.curr.gender;
    }

    jobMovie(movieId){
        this.$target = this.$tribeWrap.find(`[data-tribe=${this.curr.tribe}]`).find(`[data-job=${movieId}]`);
        this.$currMovie = this.$target.find("[data-movie]").attr("id");
        console.log(this.$prevMovie, this.$currMovie);
        this.$prevMovie = this.$target.find("[data-movie]").attr("id");
    }

    jobImage(imgId){
        // console.log(this.curr.tribe, `image__${imgId}`);
    }

    set complete(setArr){
        this.changeTribe(setArr[0]);
        this.checkDevice(setArr[1]);
        this.changeJob(setArr[1]);
        this.changeGender(setArr[2]);
        this.opts.complete = setArr[3];
    }
}

export default Choose;