class Sub {
    constructor(opts){
        this.opts = $.extend({
            el:"#element2",
            idx:2
        }, opts);
        this._init();
    }

    _init(){
        console.log("initSub")
    }
}

export default Sub;