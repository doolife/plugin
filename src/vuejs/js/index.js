import '../sass/index.scss';

var app = new Vue({
    el:'#app',
    data:{
        todos:[
            {text:"삐삐"},
            {text:"금요일에 만나요"},
            {text:"미아"},
        ],
        name:"Vue",
        smile:false,
        iu1:"http://image.koreatimes.com/article/2018/07/17/201807171740275b1.jpg",
        iu2:"https://i.pinimg.com/474x/75/ac/6f/75ac6fafb8083d046d6b35c9cf364106.jpg",
        number:0
    },
    methods:{
        inc:function(){
            this.number++;
        },
        dec:function(){
            this.number--;
        }
    }
});