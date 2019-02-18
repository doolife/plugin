class TabMenu{
    constructor(opts){
        this.opts = Object.assign({
            el:"#tabmenu",
            idx:1
        }, opts);

        this.state = {};

        this.$el = document.querySelector(this.opts.el);
        this.$menuWrap = this.$el.querySelector("[data-tab='wrap']");
        this.$menu = this.$menuWrap.querySelectorAll("[data-list]");
        this.$conWrap = this.$el.querySelector("[data-con='wrap']");
        this.$con = this.$conWrap.querySelectorAll("[data-list]");

        this._init();
    };

    _init(){
        this._startSet();
        this._controls();
    };

    _startSet(){
        this._showHide(this.opts.idx);
    };

    _controls(){
        this.$menu.forEach(menu => menu.addEventListener("click", (e) => {
            this.state.str = menu.getAttribute("data-list");
            this._showHide(this.state.str);
        }));
        // for ( let i = 0 ; i<this.$menu.length ; i++ ) {
        //     this.$menu[i].addEventListener('click', this._showHide.bind(this));
        // }
    };

    _showHide(str){
        this.$con.forEach(con => {
            this.state.data = con.getAttribute("data-list");
            if(str==this.state.data){
                con.style.display = "block";
            }else{
                con.style.display = "none";
            }
        });
    };

    set menu(str){

    };

};

export default TabMenu;