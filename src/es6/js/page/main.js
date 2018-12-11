class Main {
    constructor(opts){
        this.opts = $.extend({
            el:"#element1",
            idx:1
        }, opts);
        this._init();
    }

    _init(){
        console.log("initMain")
    }
}

export default Main;