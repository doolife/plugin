class Choose {
    constructor(opts) {
        // 사용자 옵션이 없으면 기본 옵션 사용
        this.opts = {
            el: "#element",
            data: {
                tribe: 1,
                job: 16,
                gender: 0,
            },
            complete: false,
            ...opts
        };

        // DOM 요소
        this.el = document.querySelector(this.opts.el);
        this.tabWrap = this.el.querySelector("[data-tab-wrap]");
        this.tribeWrap = this.el.querySelector("[data-tribe-wrap]");
        this.genderWrap = this.el.querySelector("[data-gender-wrap]");

        // 현재 및 이전 상태를 저장하는 객체
        this.curr = {
            tribe: "",
            job: "",
            gender: "",
        };
        this.prev = { ...this.curr };

        // 모바일 여부
        this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

        // 콜백 함수를 저장할 객체
        this.callbacks = {
            selectCallback: null,
        };

        // 초기화 함수
        this.init();
    }

    // 초기 데이터 설정 및 컨트롤 함수
    init() {
        const { tribe, job, gender } = this.opts.data;
        this.settings([tribe, job, gender]);
        this.controls();
    }

    // 이벤트 리스너를 추가하는 함수
    addEventListeners(elements, event, callback) {
        elements.forEach((element) => {
            element.addEventListener(event, callback);
        });
    }

    // 컨트롤 함수
    controls() {
        const tabElements = this.tabWrap.querySelectorAll("[data-tab]");
        this.addEventListeners(tabElements, "click", (evt) => {
            if (this.opts.complete) return;
            const target = Number(evt.currentTarget.dataset.tab);
            const targetChild = Number(this.tribeWrap.querySelector(`[data-tribe="${target}"] [data-job]`).dataset.job);
            if (this.curr.tribe === target) return;
            this.changeTribe(target);
            this.changeJob(targetChild);
        });

        const jobMenuElements = this.tribeWrap.querySelectorAll("[data-job-menu]");
        this.addEventListeners(jobMenuElements, "click", (evt) => {
            if (this.opts.complete) return;
            const target = Number(evt.currentTarget.dataset.jobMenu);
            if (this.curr.job === target) return;
            this.changeJob(target);
        });

        const genderElements = this.genderWrap.querySelectorAll("[data-gender]");
        this.addEventListeners(genderElements, "click", (evt) => {
            if (this.opts.complete) return;
            const target = Number(evt.currentTarget.dataset.gender);
            if (this.curr.gender === target) return;
            this.changeGender(target);
        });
    }

    // 초기 데이터 설정
    settings(setArr) {
        const [tribe, job, gender] = setArr;
        this.changeTribe(tribe);
        this.changeGender(gender);
        this.changeJob(job);
    }

    // 부족 변경 함수
    changeTribe(tribeStr) {
        this.clearClass(this.tabWrap.querySelectorAll("[data-tab]"), "p-tab__list--on");
        this.clearClass(this.tribeWrap.querySelectorAll("[data-tribe]"), "choose__tribe--on");
        this.addClass(this.tabWrap.querySelector(`[data-tab="${tribeStr}"]`), "p-tab__list--on");
        this.addClass(this.tribeWrap.querySelector(`[data-tribe="${tribeStr}"]`), "choose__tribe--on");
        this.curr.tribe = tribeStr;
    }

    // 직업 변경 함수
    changeJob(jobStr) {
        this.clearClass(this.tribeWrap.querySelectorAll("[data-job-menu]"), "job-menu__list--on");
        this.clearClass(this.tribeWrap.querySelectorAll("[data-tribe] [data-job]"), "choose__job--on");
        this.addClass(this.tribeWrap.querySelector(`[data-job-menu="${jobStr}"]`), "job-menu__list--on");
        this.addClass(this.tribeWrap.querySelector(`[data-tribe="${this.curr.tribe}"] [data-job="${jobStr}"]`), "choose__job--on");
        this.curr.job = jobStr;
        this.checkDevice();
    }

    // 성별 변경 함수
    changeGender(genderStr) {
        this.clearClass(this.genderWrap.querySelectorAll("[data-gender]"), "gender__list--on");
        this.addClass(this.genderWrap.querySelector(`[data-gender="${genderStr}"]`), "gender__list--on");
        this.curr.gender = genderStr;
        this.checkDevice();
    }

    // 디바이스 유형 체크
    checkDevice() {
        const deviceType = this.isMobile ? "mobile" : "pc";
        this.selectCallback(deviceType);
        this.prev = { ...this.curr };
    }

    // web video
    selectCallback(deviceType) {
        this.executeCallback("selectCallback", this.curr.tribe, this.prev.job, this.curr.job, this.curr.gender, deviceType);
    }

    // 외부에서 콜백 등록하는 메서드
    on(eventName, callback) {
        this.callbacks[eventName] = callback;
    }

    // 콜백 실행 메서드
    executeCallback(eventName, ...args) {
        const callback = this.callbacks[eventName];
        if (callback && typeof callback === "function") {
            callback(...args);
        }
    }

    // 요소들의 클래스를 제거
    clearClass(elements, className) {
        elements.forEach((element) => element.classList.remove(className));
    }

    // 요소에 클래스를 추가
    addClass(element, className) {
        if (element) element.classList.add(className);
    }

    // 완료 상태
    set complete(setArr) {
        // 완료 상태 설정
        const [tribe, job, gender, complete] = setArr;
        this.changeTribe(tribe);
        this.changeGender(gender);
        this.changeJob(job);
        this.opts.complete = complete;
    }
}

export default Choose;