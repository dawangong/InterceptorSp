(function (window) {
    function Interceptor(fn) {
        this.change = fn;
        this.init();
    }

    Interceptor.prototype.init = function () {
        let change = this.change;
        let open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function () {
            this.addEventListener('readystatechange', function () {
                if (this.readyState == 4 && this.status == 200) {
                    let temp = this.responseText;
                    defineSet();
                    this.responseText = temp;
                    if (change) {
                        change(this);
                    }
                }
            }, false);
            open.apply(this, arguments);
        }
    };

    function defineSet() {
        Object.defineProperty(XMLHttpRequest.prototype, 'responseText', {
            writable:true
        })
    }

    function int(fn) {
        return new Interceptor(fn);
    }

    window.Intercept = int;
})(window);
