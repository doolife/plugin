class Placeholder {
    constructor(opts){
        this.opts = Object.assign({
            el:"#placeHolder"
        }, opts);

        this.elWrap = document.querySelector(this.opts.el);
        this.elLabel = this.elWrap.querySelector("[data-label='check']");
        this.elInput = this.elWrap.querySelector("[data-input='check']");

        this.init();
    }

    init(){
        this.controls();
    }

    controls(){
        if(!this.elInput.disabled){
            this.elInput.addEventListener("focus", this.label.bind(this));
        }else{
            if(this.elInput.value!==0){
                this.label();
            }
        }

        this.elInput.addEventListener("blur", this.input.bind(this));
    }
    label(){
        this.elLabel.style.display = "none";
    }
    input(){
        if(this.elInput.value==0){
            this.elLabel.style.display = "block";
        }
    }
    delete(){
        this.elInput.value = "";
        this.input();
    }
}

export default Placeholder;