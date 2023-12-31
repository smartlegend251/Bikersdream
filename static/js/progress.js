! function(t) {
    "use strict";
    var e = function(n, s) {
        this.$element = t(n), this.options = t.extend({}, e.defaults, s)
    };
    e.defaults = {
        transition_delay: 300,
        refresh_speed: 50,
        display_text: "none",
        use_percentage: !0,
        percent_format: function(t) {
            return t + "%"
        },
        amount_format: function(t, e) {
            return t + " / " + e
        },
        update: t.noop,
        done: t.noop,
        fail: t.noop
    }, e.prototype.transition = function() {
        var n = this.$element,
            s = n.parent(),
            a = this.$back_text,
            i = this.$front_text,
            r = this.options,
            o = parseInt(n.attr("data-transitiongoal")),
            h = parseInt(n.attr("aria-valuemin")) || 0,
            d = parseInt(n.attr("aria-valuemax")) || 100,
            f = s.hasClass("vertical"),
            p = r.update && "function" == typeof r.update ? r.update : e.defaults.update,
            c = r.done && "function" == typeof r.done ? r.done : e.defaults.done,
            u = r.fail && "function" == typeof r.fail ? r.fail : e.defaults.fail;
        if (isNaN(o)) u("data-transitiongoal not set");
        else {
            var l, g = Math.round(100 * (o - h) / (d - h));
            if ("center" === r.display_text && !a && !i) this.$back_text = a = t("<span>").addClass("progressbar-back-text").prependTo(s), this.$front_text = i = t("<span>").addClass("progressbar-front-text").prependTo(n), f ? (l = s.css("height"), a.css({
                height: l,
                "line-height": l
            }), i.css({
                height: l,
                "line-height": l
            }), t(window).resize(function() {
                l = s.css("height"), a.css({
                    height: l,
                    "line-height": l
                }), i.css({
                    height: l,
                    "line-height": l
                })
            })) : (l = s.css("width"), i.css({
                width: l
            }), t(window).resize(function() {
                l = s.css("width"), i.css({
                    width: l
                })
            }));
            setTimeout(function() {
                var t, e, u, l, _;
                f ? n.css("height", g + "%") : n.css("width", g + "%");
                var x = setInterval(function() {
                    f ? (u = n.height(), l = s.height()) : (u = n.width(), l = s.width()), t = Math.round(100 * u / l), e = Math.round(h + u / l * (d - h)), t >= g && (t = g, e = o, c(n), clearInterval(x)), "none" !== r.display_text && (_ = r.use_percentage ? r.percent_format(t) : r.amount_format(e, d, h), "fill" === r.display_text ? n.text(_) : "center" === r.display_text && (a.text(_), i.text(_))), n.attr("aria-valuenow", e), p(t, n)
                }, r.refresh_speed)
            }, r.transition_delay)
        }
    };
    var n = t.fn.progressbar;
    t.fn.progressbar = function(n) {
        return this.each(function() {
            var s = t(this),
                a = s.data("bs.progressbar"),
                i = "object" == typeof n && n;
            a || s.data("bs.progressbar", a = new e(this, i)), a.transition()
        })
    }, t.fn.progressbar.Constructor = e, t.fn.progressbar.noConflict = function() {
        return t.fn.progressbar = n, this
    }
}(window.jQuery);