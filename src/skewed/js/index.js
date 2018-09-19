var Skewed = (function(){

    function Person(opts){
        this.opts = opts;
        this.state = {
            dist:true
        }
        this.init();
    }

    Person.prototype = {
        init : function(){
            var context = this;

            $(window).on("resize", function(){
                context.resize();
            }).resize();

            this.setlayout(["-65%", "65%"], ["35%", "35%"], ["65%", "-65%"]);
            this.controls();
        },
        controls : function(){
            var context = this;

            $(this.opts.list).on("mouseenter", function(){
                context.over($(this).index());
            });

            $(document).on("mouseleave", function(){
                context.out();
            });
        },
        over : function(num){
            if(num==0){
                this.setlayout(["-40%", "40%"], ["60%", "20%"], ["80%", "-80%"]);
            }else if(num==1){
                this.setlayout(["-80%", "80%"], ["20%", "20%"], ["80%", "-80%"]);
            }else if(num==2){
                this.setlayout(["-80%", "80%"], ["20%", "60%"], ["40%", "-40%"]);
            }
        },
        out : function(){
            this.setlayout(["-65%", "65%"], ["35%", "35%"], ["65%", "-65%"]);
        },
        resize : function(){
            var outWidth = $(this.opts.element).width();
            var outHeight = $(this.opts.element).height();
            var radian = this.opts.deg * Math.PI / 180;
            var edge = outHeight * Math.tan(radian);
            $(this.opts.list).find($(this.opts.wrap)).css({width:(outWidth+edge), marginLeft:-(outWidth+edge)/2});
        },
        setlayout : function(v1, v2, v3, dist){
            (this.state.dist) ? this.state.dist=0 : this.state.dist=1;
            TweenMax.to([$(this.opts.list).eq(0)], this.state.dist, {left:v1[0], right:v1[1], ease: Quint.easeInOut});
            TweenMax.to([$(this.opts.list).eq(1)], this.state.dist, {left:v2[0], right:v2[1], ease: Quint.easeInOut});
            TweenMax.to([$(this.opts.list).eq(2)], this.state.dist, {left:v3[0], right:v3[1], ease: Quint.easeInOut});
            this.state.dist = false;
        }
    };

    return Person;
})();


var skewed = new Skewed({
    element:"#container",
    list:"[data-list='skew']",
    wrap:"[data-list='wrap']",
    deg:19
});