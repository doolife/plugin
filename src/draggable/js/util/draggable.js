class Draggable {
    // 생성자 함수
    constructor(opts) {
        // 옵션 초기화
        this.opts = {
            el: "#draggable",  // 선택자
            pos: "center",     // 위치 지정 center, leftTop, rightTop, leftBottom, rightBottom
            ...opts,           // 옵션을 받아 덮어쓰기
        };

        // DOM 엘리먼트 선택
        this.el = document.querySelector(this.opts.el);
        this.drag = this.el.querySelector("[data-draggable]");

        // 마우스 이벤트 관련 변수 초기화
        this.clicking = false;
        this.previousX;
        this.previousY;

        // 마우스 이벤트 콜백 함수 초기화
        this.mouseupCallbackFn = null;
        this.mouseleaveCallbackFn = null;
        this.mouseenterCallbackFn = null;

        this.init();
    }

    // 초기화 메서드
    init() {
        this.setting();
        this.controls();
    }

    // 초기 위치 설정 메서드
    setting() {
        const { offsetWidth, offsetHeight } = this.drag;
        let elX, elY;

        // 초기 위치 계산
        switch (this.opts.pos) {
            case "center":
                elX = (offsetWidth - this.el.offsetWidth) / 2;
                elY = (offsetHeight - this.el.offsetHeight) / 2;
                break;
            case "leftTop":
                elX = 0;
                elY = 0;
                break;
            case "rightTop":
                elX = offsetWidth - this.el.offsetWidth;
                elY = 0;
                break;
            case "leftBottom":
                elX = 0;
                elY = offsetHeight - this.el.offsetHeight;
                break;
            case "rightBottom":
                elX = offsetWidth - this.el.offsetWidth;
                elY = offsetHeight - this.el.offsetHeight;
                break;
        }

        // 초기 위치로 스크롤 이동
        this.el.scrollLeft = elX;
        this.el.scrollTop = elY;
    }

    // 이벤트 핸들러 등록
    controls() {
        this.el.addEventListener("mousedown", (evt) => this.mousedown(evt));
        this.el.addEventListener("mouseup", () => this.handleMouseup());
        this.el.addEventListener("mousemove", (evt) => this.mousemove(evt));
        this.el.addEventListener("mouseleave", () => this.handleMouseleave());
        this.el.addEventListener("mouseenter", () => this.handleMouseenter());
    }

    // mousedown 이벤트 핸들러
    mousedown(evt) {
        evt.preventDefault();
        // 현재 마우스 위치 저장
        this.previousX = evt.clientX;
        this.previousY = evt.clientY;
        // 클릭 상태 설정
        this.clicking = true;
    }

    // mousemove 이벤트 핸들러
    mousemove(evt) {
        // 클릭 중일 때만 이동 처리
        if (this.clicking) {
            evt.preventDefault();
            // 스크롤 이동 계산
            this.el.scrollLeft += this.previousX - evt.clientX;
            this.el.scrollTop += this.previousY - evt.clientY;
            // 현재 마우스 위치 갱신
            this.previousX = evt.clientX;
            this.previousY = evt.clientY;
        }
    }

    // mouseup 이벤트 핸들러
    handleMouseup() {
        this.clicking = false;  // 클릭 상태 해제
        this.callIfFunction(this.mouseupCallbackFn);    // mouseup 콜백 호출
    }

    // mouseleave 이벤트 핸들러
    handleMouseleave() {
        this.clicking = false;  // 클릭 상태 해제
        this.callIfFunction(this.mouseleaveCallbackFn); // mouseleave 콜백 호출
    }

    // mouseenter 이벤트 핸들러
    handleMouseenter() {
        this.callIfFunction(this.mouseenterCallbackFn); // mouseenter 콜백 호출
    }

    // mouseup 콜백 함수 등록
    mouseupCallback(callback) {
        this.mouseupCallbackFn = callback;
    }

    // mouseleave 콜백 함수 등록
    mouseleaveCallback(callback) {
        this.mouseleaveCallbackFn = callback;
    }

    // mouseenter 콜백 함수 등록
    mouseenterCallback(callback) {
        this.mouseenterCallbackFn = callback;
    }

    // 함수가 존재하면 호출하는 메서드
    callIfFunction(callback) {
        if (typeof callback === "function") callback();
    }

    // 리셋 메서드 (현재는 사용되지 않음)
    set reset(num) {}
}

// 클래스를 내보내기
export default Draggable;