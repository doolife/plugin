class Main {
    constructor(opts){
        this.opts = Object.assign({
            el:"#parent",
            name:"doonam"
        }, opts);

        this.init();
    }

    init(){
        console.log(this.opts.el+" | 2")
    }

    controls(){
        console.log("super controls")
    }
}

export default Main;