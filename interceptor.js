(function (window) {
    function Interceptor(fn) {
        this.change = fn;
        this.init();
    }

    Interceptor.prototype.init = function () {
        define();
        let change = this.change;
        let open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function () {
            this.addEventListener('readystatechange', function () {
                if (this.readyState == 4 && this.status == 200) {
                    let temp = this.responseText;
                    this.responseText = temp;
                    if (change) {
                        change(this);
                    }
                }
            }, false);
            open.apply(this, arguments);
        }
    };

    function define() {
        Object.defineProperty(XMLHttpRequest.prototype, 'responseText', {
            configurable: true,
            enumerable: true,
            get: function () {
                return this.value;
            },
            set: function (str) {
                this.value = str;
            }
        })
    }

    function int(fn) {
        return new Interceptor(fn);
    }

    window.interceptor = int;
})(window);