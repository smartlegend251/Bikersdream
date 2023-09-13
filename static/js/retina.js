! function() {
    function t() {}

    function e(t) {
        return r.retinaImageSuffix + t
    }

    function i(t, i) {
        if (this.path = t || "", null != i) this.at_2x_path = i, this.perform_check = !1;
        else {
            if (void 0 !== document.createElement) {
                var n = document.createElement("a");
                n.href = this.path, n.pathname = n.pathname.replace(h, e), this.at_2x_path = n.href
            } else {
                var a = this.path.split("?");
                a[0] = a[0].replace(h, e), this.at_2x_path = a.join("?")
            }
            this.perform_check = !0
        }
    }

    function n(t) {
        this.el = t, this.path = new i(this.el.getAttribute("src"), this.el.getAttribute("data-at2x"));
        var e = this;
        this.path.check_2x_variant(function(t) {
            t && e.swap()
        })
    }
    var a = "undefined" == typeof exports ? window : exports,
        r = {
            retinaImageSuffix: "@2x",
            check_mime_type: !0,
            force_original_dimensions: !0
        };
    a.Retina = t, t.configure = function(t) {
        for (var e in null === t && (t = {}), t) t.hasOwnProperty(e) && (r[e] = t[e])
    }, t.init = function(t) {
        null === t && (t = a);
        var e = t.onload || function() {};
        t.onload = function() {
            var t, i, a = document.getElementsByTagName("img"),
                r = [];
            for (t = 0; t < a.length; t += 1)(i = a[t]).getAttributeNode("data-no-retina") || r.push(new n(i));
            e()
        }
    }, t.isRetina = function() {
        return a.devicePixelRatio > 1 || !(!a.matchMedia || !a.matchMedia("(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)").matches)
    };
    var h = /\.\w+$/;
    a.RetinaImagePath = i, i.confirmed_paths = [], i.prototype.is_external = function() {
        return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
    }, i.prototype.check_2x_variant = function(t) {
        var e, n = this;
        return this.is_external() ? t(!1) : this.perform_check || void 0 === this.at_2x_path || null === this.at_2x_path ? this.at_2x_path in i.confirmed_paths ? t(!0) : ((e = new XMLHttpRequest).open("HEAD", this.at_2x_path), e.onreadystatechange = function() {
            if (4 !== e.readyState) return t(!1);
            if (e.status >= 200 && e.status <= 399) {
                if (r.check_mime_type) {
                    var a = e.getResponseHeader("Content-Type");
                    if (null === a || !a.match(/^image/i)) return t(!1)
                }
                return i.confirmed_paths.push(n.at_2x_path), t(!0)
            }
            return t(!1)
        }, void e.send()) : t(!0)
    }, a.RetinaImage = n, n.prototype.swap = function(t) {
        void 0 === t && (t = this.path.at_2x_path);
        var e = this;
        ! function i() {
            e.el.complete ? (r.force_original_dimensions && (e.el.setAttribute("width", e.el.offsetWidth), e.el.setAttribute("height", e.el.offsetHeight)), e.el.setAttribute("src", t)) : setTimeout(i, 5)
        }()
    }, t.isRetina() && t.init(a)
}();