var Remotemenu = (function(){

    function Person(opts) {
        this.opts = opts;

        this.$wrap = $(opts.element);
        this.$gnb = this.$wrap.find($("[data-remote='wrap']")).children("[data-list='list']");
        this.$snb = this.$gnb.find("[data-list='list']");
        this.$cnb = this.$wrap.find($("[data-remote='wrap']")).find("[data-list='list']");
        this.$cnbli = this.$wrap.find($("[data-remote='wrap']")).find("li");
        this.$con = $("[data-contents='con']");
        this.$scon = $("[data-contents='scon']");
        this.$btnArrow = $("[data-btn='arrow']");

        this.state = {
            isMobile: false,
            resizeWidth: false,
            gnbNum: false,
            snbNum: false,
            removeChk: false,
            scrollTop: $(window).scrollTop(),
            scrollTopSave: false,
            scChk: true
        };

        this.arrowSlide();
        this.controls();
    }

    Person.prototype = {
        controls: function () {
            var context = this;
            if (this.opts.quick) {
                this.$gnb.children("a").on("click", function () {
                    var hash = $(this).attr("href"),
                        reStr = hash.replace(/#/g, "");

                    context.mobileBodyFix();
                    context.listSlide(reStr);
                });

                this.$snb.children("a").on("click", function () {
                    var hash = $(this).attr("href"),
                        reStr = hash.replace(/#/g, "");

                    context.mobileBodyFix();
                    context.listSlide(reStr);
                });
            } else {
                if (!this.opts.type) {
                    this.$gnb.children("a").on("click", function () {
                        context.mobileBodyFix();
                        if (this.state.isMobile) {
                            context.arrowSlide();
                        }
                    });
                } else {
                    this.$cnbli.children("a").on("click", function () {
                        context.mobileBodyFix();
                        if (this.state.isMobile) {
                            context.arrowSlide();
                        }
                    });
                }
            }

            $(window).on("resize", function () {
                context.state.isMobile = (!window.matchMedia("(min-width:769px)").matches);
                context.state.resizeWidth = context.$wrap.outerWidth();
                if (context.opts.show) {
                    context.opts.show = false;
                    context.arrowSlide();
                } else {
                    context.mobileMask();
                }
                context.scrollAction();
            }).resize();

            $(window).on("scroll", function () {
                if (context.state.isMobile) {
                    if (!context.state.scChk) return false;
                }
                context.state.scrollTop = $(window).scrollTop();
                context.scrollAction();
            });

            this.$btnArrow.on("click", function () {
                context.mobileBodyFix();
                context.arrowSlide();
            });

            $(document).on("click", "[data-remote='mask']", function () {
                context.mobileBodyFix();
                context.arrowSlide();
            });
        },
        navAnchor: function (num) {
            if (!this.opts.type) {
                this.$gnb.removeClass("active");
                this.$gnb.eq(num).addClass("active");
            } else {
                this.$cnb.parent("ul").parent("li").removeClass("active");
                this.$cnb.removeClass("active");
                this.$cnb.eq(num).parent("ul").parent("li").addClass("active");
                this.$cnb.eq(num).addClass("active");
            }
        },
        scrollAction: function () {
            var scltop = $(window).scrollTop();
            if (!this.state.isMobile) {
                if (scltop >= this.opts.top - this.opts.fix) {
                    this.$wrap.addClass("fix").css({top: this.opts.fix});
                } else {
                    this.$wrap.removeClass("fix").css({top: this.opts.top});
                }
            } else {
                this.$wrap.removeClass("fix").css({top: ""});
            }

            this.quickAnchor(scltop)
        },
        quickAnchor: function (scltop) {
            if (this.opts.quick) {
                var firstTop = this.$con.eq(0).offset().top,
                    // lastBottom = this.$con.eq(this.$con.length - 1).offset().top + this.$con.eq(this.$con.length - 1).height(),
                    endScroll = $(window).scrollTop() === $(document).height() - $(window).height();
                for (var i = 0, len = this.$con.length; i < len; i++) {
                    var conTop = this.$con.eq(i).offset().top;
                    if (conTop <= scltop) {
                        this.state.gnbNum = i;
                        for (var j = 0, slen = this.$con.eq(i).children(this.$scon).length; j < slen; j++) {
                            var sconTop = this.$con.eq(i).children(this.$scon).eq(j).offset().top;
                            if (sconTop <= scltop) {
                                this.state.snbNum = j;
                            }
                        }
                    }
                    // removeChk = (scltop < firstTop || scltop > lastBottom) ? true : false;
                    this.state.removeChk = (scltop < firstTop);
                }

                if (!this.state.removeChk) {
                    this.$gnb.removeClass("active");
                    this.$gnb.find(this.$snb).removeClass("active");
                    if (endScroll) {
                        this.$gnb.eq(this.$gnb.length - 1).addClass("active");
                        this.$gnb.eq(this.$gnb.length - 1).find(this.$snb).eq(this.$gnb.eq(this.$gnb.length - 1).find(this.$snb).length - 1).addClass("active");
                    } else {
                        this.$gnb.eq(this.state.gnbNum).addClass("active");
                        this.$gnb.eq(this.state.gnbNum).find(this.$snb).eq(this.state.snbNum).addClass("active");
                    }
                } else {
                    this.$gnb.removeClass("active");
                    this.$gnb.find(this.$snb).removeClass("active");
                }
            }

            this.remoteShowHide();
        },
        remoteShowHide: function () {
            if (!this.state.removeChk) {
                this.$wrap.css({display: "block"});
            } else {
                if (this.state.isMobile) {
                    this.opts.show = false;
                } else {
                    this.opts.show = (!this.opts.show);
                }
                this.arrowSlide();
                this.$wrap.css({display: "none"});
            }
        },
        arrowSlide: function () {
            if (this.opts.show) {
                this.$wrap.stop().animate({right: 0}, 250).find(this.$btnArrow).addClass("on");
                this.state.scChk = false;
                this.opts.show = false;
            } else {
                this.$wrap.stop().animate({right: -this.state.resizeWidth}, 250).find(this.$btnArrow).removeClass("on");
                this.state.scChk = true;
                this.opts.show = true;
            }
            this.mobileMask();
        },
        mobileBodyFix: function () {
            if (this.opts.show) {
                this.state.scrollTopSave = this.state.scrollTop;
                if (this.state.isMobile) {
                    $("body").css({height: "auto", position: "fixed", overflow: "hidden", marginTop: -this.state.scrollTop});
                }
            } else {
                if (this.state.isMobile) {
                    $("body").css({height: "", position: "", overflow: "", marginTop: ""});
                    $("html, body").scrollTop(this.state.scrollTopSave);
                }
            }
        },
        mobileMask: function () {
            $("#mobileMask").remove();
            if (this.state.isMobile) {
                if (!this.opts.show) {
                    this.$wrap.before($("<div id='mobileMask' data-remote='mask'></div>"));
                    $("html").css({height: "auto", overflow: "hidden"});
                } else {
                    $("html").css({height: "", overflow: ""});
                }
            } else {
                $("html").css({height: "", overflow: ""});
                $("body").css({height: "", position: "", overflow: "", marginTop: ""});
            }
        },
        listSlide: function (id) {
            var conOffset = $("[data-id='" + id + "']").offset().top;
            $("html, body").stop().animate({scrollTop: conOffset}, this.opts.cspeed);
            if (this.state.isMobile) {
                this.arrowSlide();
            }
        }
    };

    return Person;
})();

var remotemenu = new Remotemenu({
    element:"#remoteMenu",  // element
    top:920,    // 기본 상단에서 떨어진 값
    fix:100,    // 스크롤시 상단에서 떨어진 값
    cspeed:600,    // 퀵메뉴 클릭시 이동하는 스피드
    show:false,    // true : 보이기 / false : 숨기기
    quick:true      // true : 퀵메뉴 / flase : 네비게이션
});