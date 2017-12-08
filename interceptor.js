(function (window) {
    function Interceptor(change) {
        this.change = change;
        this.init();
    }

    Interceptor.prototype.init = function () {
        let change = this.change;
        let open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function () {
            this.addEventListener('readystatechange', function () {
                if (this.readyState == 4 && this.status == 200) {
                    let temp = this.responseText;
                    define();
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

    window.Interceptor = Interceptor;
})(window);