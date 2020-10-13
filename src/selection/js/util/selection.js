import videoInfo from "./video-info";
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

        this.targetEvent = "tribe";

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
            this.targetEvent = "tribe";
            let targetData = $(evt.currentTarget).data("tab");
            let targetArr1 = Number(Object.keys(videoInfo[targetData])[0]);
            let targetArr2 = this.searchArr(videoInfo[targetData][0]);
            if(this.curr.tribe === targetData) return;
            this.setTribe(targetData);
            this.setGender(targetArr1);
            this.setJob(targetArr2);
        });

        this.$genderWrap.find("[data-gender]").on("click", (evt)=>{
            if(this.opts.complete) return;
            this.targetEvent = "gender";
            let targetData = $(evt.currentTarget).data("gender");
            let targetArr2 = this.searchArr(videoInfo[this.curr.tribe][targetData]);
            if(this.curr.gender === targetData) return;
            this.setGender(targetData);
            this.setJob(targetArr2);
        });

        this.$jobWrap.find("[data-job-menu]").on("click", (evt)=>{
            if(this.opts.complete) return;
            this.targetEvent = "job";
            let targetData = $(evt.currentTarget).data("job-menu");
            if(this.curr.job === Number(targetData)) return;
            this.setJob(Number(targetData));
        });
    }

    searchArr(str){
        let num;
        $.each(str, (key, value)=>{
            if(value!==""){
                num = value.number;
                return false;
            }
        });
        return num;
    }

    setTribe(value){
        this.curr.tribe = value;
        this.$tabWrap.find(`[data-tab]`).removeClass("sele-tab__list--on");
        this.$tabWrap.find(`[data-tab=${value}]`).addClass("sele-tab__list--on");
        this.$tribeWrap.find(`[data-tribe]`).removeClass("sele-con__tribe--on");
        this.$tribeWrap.find(`[data-tribe=${value}]`).addClass("sele-con__tribe--on");
    }

    setGender(value){
        let $parent = this.$tribeWrap.find(`[data-tribe=${this.curr.tribe}]`);
        this.curr.gender = value;
        this.$genderWrap.find(`[data-gender]`).removeClass("gender__list--on");
        this.$genderWrap.find(`[data-gender=${value}]`).addClass("gender__list--on");
        this.$tribeWrap.find(`[data-movie-wrap]`).removeClass("sele-con__movie--on");
        $parent.find(`[data-movie-wrap=${value}]`).addClass("sele-con__movie--on");
    }

    setJob(value){
        let $parent1 = this.$tribeWrap.find(`[data-tribe=${this.curr.tribe}]`);
        let $parent2 = $parent1.find(`[data-movie-wrap=${this.curr.gender}]`);
        this.curr.job = value;
        $.each(videoInfo[this.curr.tribe][this.curr.gender], (key, value)=>{
            let $ele = $(this.$jobWrap.find("[data-job-menu]")[key]);
            $ele.attr("data-job-menu", `${value.number}`).data("job-menu", `${value.number}`);
            ($ele.data("job-menu")!=="undefined") ? $ele.css({display:"inline-block"}) : $ele.css({display:"none"}) ;
        });
        this.$jobWrap.find(`[data-job-menu]`).removeClass("job-menu__list--on");
        this.$jobWrap.find(`[data-job-menu=${value}]`).addClass("job-menu__list--on");
        this.$tribeWrap.find(`[data-job]`).removeClass("sele-con__job--on");
        $parent2.find(`[data-job=${value}]`).addClass("sele-con__job--on");
        this.checkDevice(value);
    }

    checkDevice(value){
        if(this.isMobile===null){
            $.each(videoInfo[this.curr.tribe][this.curr.gender], (key, value)=>{
                if(this.curr.job===value.number){
                    console.log(value)
                }
            });
        }else{
            console.log(this.prev.tribe, this.prev.gender, this.prev.job, "이전", this.curr.tribe, this.curr.gender, this.curr.job, "현재", `image__${value}`);
        }
        this.methodDepth("callback");
        this.prev.tribe = this.curr.tribe;
        this.prev.gender = this.curr.gender;
        this.prev.job = this.curr.job;
    }

    methodDepth(funcValue){
        if (typeof this.opts[`${funcValue}`] == "function") this.opts[`${funcValue}`].call(this);
    };

    on(event, func){
        this.$el.on(event, func);
    };

    set complete(value){
        this.setTribe(value[0]);
        this.setGender(value[1]);
        this.setJob(value[2]);
        this.opts.complete = value[3];
    }
}

export default Selection;