class Quickmenu {
    constructor(opts) {
        this.opts = $.extend({
            element: "#contents",
            position: "center",
            margin: 0,
            fix: 100,
            speed: 600,
            quickAni: false
        }, opts);

        this.state = {
            d1y: [],
            d2y: [],
            d1Length: "",
            d2Length: "",
            id:"",
            scTop:"",
            quickTop:"",
            firstTop:""
        };

        this.selector = {
            wrap: "[data-quick='wrap']",
            parent: "[data-parent='wrap']",
            list: "[data-menu='list']",
            con: "[data-quick='con']",
            top: "[data-btn='top']"
        };

        this.init();
    };
    init(){
        this.position();
        this.resize();
        this.scrolling();
        this.controls();
    }
    controls(){
        $(this.selector.parent).on("click", "" + this.selector.list + "", (e)=> {
            if (!this.urlChk($(e.target).attr("href"))) {
                e.preventDefault();
                e.stopPropagation();
                this.state.id = $(e.target).attr("href");
                this.slideMove();
            }
        });

        $(this.selector.top).on("click", ()=> {
            this.slideTop();
        });
    }
    urlChk(strUrl){
        this.state.expUrl = /^http[s]?\:\/\//i;
        return this.state.expUrl.test(strUrl);
    }
    resize(){
        this.state.quickTop = $(this.selector.wrap).offset().top;
        this.state.firstTop = $(this.opts.element).children($(this.selector.con)).eq(0).offset().top;
    }
    scrolling(){
        $(window).on("scroll", ()=> {
            this.state.scTop = $(window).scrollTop();
            this.scrollAction();
        }).scroll();
    }
    scrollAction(){
        $.each($(this.opts.element).children($(this.selector.con)), (i, el)=> {
            this.state.d1y = $(el).offset().top - this.opts.margin;
            if (this.state.d1y <= this.state.scTop) {
                this.state.d1Num = i;
            }
            $.each($(el).children($(this.selector.con)), (i, el)=> {
                this.state.d2y = $(el).offset().top - this.opts.margin;
                if (this.state.d2y <= this.state.scTop) {
                    this.state.d2Num = i;
                }
            });
        });
        this.anchor();
    }
    position(){
        $(this.selector.wrap).addClass(this.opts.position);
    }
    anchor(){
        this.end();
        this.remove();
        this.add();
        this.sticky();
    }
    add(){
        $(this.selector.parent).children(this.selector.list).eq(this.state.d1Num).addClass("on").find(this.selector.list).eq(this.state.d2Num).addClass("on");
        if (this.state.scTop < this.state.firstTop - this.opts.margin) this.remove();
    }
    remove(){
        $(this.selector.parent).find(this.selector.list).removeClass("on");
    }
    end(){
        this.state.endScroll = this.state.scTop === $(document).height() - $(window).height();
        if (this.state.endScroll) {
            this.state.d1Num = $(this.selector.parent).children(this.selector.list).length - 1;
            this.state.d2Num = $(this.selector.parent).children(this.selector.list).eq(this.state.d1Num).find(this.selector.list).length - 1;
        }
    }
    slideMove(){
        this.state.offset = $(this.state.id).offset().top;
        $("html, body").stop().animate({scrollTop: this.state.offset - this.opts.margin}, this.opts.speed);
    }
    slideTop(){
        $("html, body").stop().animate({scrollTop: 0}, this.opts.speed);
    }
    sticky(){
        if (this.opts.quickAni) {
            if (this.state.scTop >= this.state.quickTop - this.opts.fix) {
                $(this.selector.wrap).stop().animate({top: this.state.scTop + this.opts.margin}, 300);
            } else {
                $(this.selector.wrap).stop().animate({top: this.state.quickTop}, 300);
            }
        } else {
            if (this.state.scTop >= this.state.quickTop - this.opts.fix) {
                $(this.selector.wrap).addClass("fixed");
            } else {
                $(this.selector.wrap).removeClass("fixed");
            }
        }
    }
};

export default Quickmenu;