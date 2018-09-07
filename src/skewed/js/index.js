var Skewed = (function(){

    function Person(opts){
        this.opts = opts;
        this.init();
    }

    Person.prototype = {
        init : function(){
            console.log("skewed")
        }
    };

    return Person;
})();


var skewed = new Skewed({
    element:".conformance_test"
});