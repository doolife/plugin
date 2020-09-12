import chtinfo from "./cht-info";
class Selection{
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

        this.$el = $(this.opts.el);
        this.$tabWrap = this.$el.find("[data-tab-wrap]");
        this.$tribeWrap = this.$el.find("[data-tribe-wrap]");
        this.$genderWrap = this.$el.find("[data-gender-wrap]");
        this.$jobWrap = this.$el.find("[job-menu-wrap]");

        this.$target = "";

        this.curr = {
            tribe:"",
            gender:"",
            job:"",
        };

        this.prev = {
            tribe:"",
            gender:"",
            job:"",
        };

        this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

        this._init();
    }

    _init(){
        this._settings([this.opts.data.tribe, this.opts.data.gender, this.opts.data.job]);
        this._controls();
    }

    _settings(value){
        this.setTribe(value[0]);
        this.setGender(value[1]);
        this.setJob(value[2]);
    }

    _controls(){
        this.$tabWrap.find("[data-tab]").on("click", (evt)=>{
            if(this.opts.complete) return;
            let targetData = $(evt.currentTarget).data("tab");
            let targetArr1 = Number(Object.keys(chtinfo[targetData])[0][0]);
            let targetArr2 = chtinfo[targetData][0].find(this.searchArr);
            if(this.curr.tribe === targetData) return;
            this.setTribe(targetData);
            this.setGender(targetArr1);
            this.setJob(targetArr2);
        });

        this.$genderWrap.find("[data-gender]").on("click", (evt)=>{
            if(this.opts.complete) return;
            let targetData = $(evt.currentTarget).data("gender");
            let targetArr2 = chtinfo[this.curr.tribe][targetData].find(this.searchArr);
            if(this.curr.gender === targetData) return;
            this.setGender(targetData);
            this.setJob(targetArr2);
        });

        this.$jobWrap.find("[data-job-menu]").on("click", (evt)=>{
            if(this.opts.complete) return;
            let targetData = $(evt.currentTarget).data("job-menu");
            if(this.curr.job === Number(targetData)) return;
            this.setJob(Number(targetData));
        });
    }

    searchArr(value){
        if(value !== "")  {
            return true;
        }
    }

    setTribe(value){
        this.curr.tribe = value;
        this.$tabWrap.find(`[data-tab]`).removeClass("p-tab__list--on");
        this.$tabWrap.find(`[data-tab=${value}]`).addClass("p-tab__list--on");
    }

    setGender(value){
        this.curr.gender = value;
        this.$genderWrap.find(`[data-gender]`).removeClass("gender__list--on");
        this.$genderWrap.find(`[data-gender=${value}]`).addClass("gender__list--on");
    }

    setJob(value){
        this.curr.job = value;
        $.each(chtinfo[this.curr.tribe][this.curr.gender], (key, value)=>{
            let $ele = $(this.$jobWrap.find("[data-job-menu]")[key]);
            $ele.attr("data-job-menu", `${value}`).data("job-menu", `${value}`);
            ($ele.data("job-menu")!=="") ? $ele.css({display:"inline-block"}) : $ele.css({display:"none"}) ;
        });
        this.$jobWrap.find(`[data-job-menu]`).removeClass("job-menu__list--on");
        this.$jobWrap.find(`[data-job-menu=${value}]`).addClass("job-menu__list--on");
        this.checkDevice(value);
    }

    checkDevice(value){
        (this.isMobile===null) ? this.jobMovie(value) : this.jobImage(value);
        this.prev.tribe = this.curr.tribe;
        this.prev.gender = this.curr.gender;
        this.prev.job = this.curr.job;
    }

    jobMovie(value){
        console.log(this.prev.tribe, this.prev.gender, this.prev.job, "이전", this.curr.tribe, this.curr.gender, this.curr.job, "현재", `movie__${value}`);
    }

    jobImage(value){
        console.log(this.prev.tribe, this.prev.gender, this.prev.job, "이전", this.curr.tribe, this.curr.gender, this.curr.job, "현재", `image__${value}`);
    }

    set complete(value){
        this.setTribe(value[0]);
        this.setGender(value[1]);
        this.setJob(value[2]);
        this.opts.complete = value[3];
    }
}

export default Selection;