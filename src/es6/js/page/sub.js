class Sub {
    constructor(opts){
        this.opts = Object.assign({
            el:"#wife",
            name:"uihwa"
        }, opts);

        this.init();
    }

    init(){
        console.log(this.opts.el, this.opts.name+" | 3")
    }
}

export default Sub;