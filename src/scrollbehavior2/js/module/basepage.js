class basepage {
    constructor(opts){
        this.opts = Object.assign({
            el:"[data-nav='wrap']",
            idx:0,
            gnbCallback:(current, prev)=>{

            }
        }, opts);
    };

    _init(){
        console.log("SUPER INIT~!!!")
        this.layout();
    };

    layout(){
        console.log("LAOUT!!!")
    }
};

export default basepage;