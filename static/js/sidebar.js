! function(t) {
    "use strict";
    var e = function(i, s) {
        this.$element = t(i), this.options = t.extend({}, e.DEFAULTS, s), this.transitioning = null, this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
    };
    e.DEFAULTS = {
        toggle: !0
    }, e.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("sidebar-open")) {
            var e = t.Event("show.bs.sidebar");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                this.$element.addClass("sidebar-open"), this.transitioning = 1;
                var i = function() {
                    this.$element, this.transitioning = 0, this.$element.trigger("shown.bs.sidebar")
                };
                if (!t.support.transition) return i.call(this);
                this.$element.one(t.support.transition.end, t.proxy(i, this)).emulateTransitionEnd(400)
            }
        }
    }, e.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("sidebar-open")) {
            var e = t.Event("hide.bs.sidebar");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                this.$element.removeClass("sidebar-open"), this.transitioning = 1;
                var i = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.sidebar")
                };
                if (!t.support.transition) return i.call(this);
                this.$element.one(t.support.transition.end, t.proxy(i, this)).emulateTransitionEnd(400)
            }
        }
    }, e.prototype.toggle = function() {
        this[this.$element.hasClass("sidebar-open") ? "hide" : "show"]()
    };
    var i = t.fn.sidebar;
    t.fn.sidebar = function(i) {
        return this.each(function() {
            var s = t(this),
                n = s.data("bs.sidebar"),
                a = t.extend({}, e.DEFAULTS, s.data(), "object" == typeof a && i);
            !n && a.toggle && "show" == i && (i = !i), n || s.data("bs.sidebar", n = new e(this, a)), "string" == typeof i && n[i]()
        })
    }, t.fn.sidebar.Constructor = e, t.fn.collapse.noConflict = function() {
        return t.fn.sidebar = i, this
    }, t(document).on("click.bs.sidebar.data-api", '[data-toggle="sidebar"]', function(e) {
        var i, s = t(this),
            n = s.attr("data-target") || e.preventDefault() || (i = s.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""),
            a = t(n),
            r = a.data("bs.sidebar") ? "toggle" : s.data();
        a.sidebar(r)
    }), t("html").on("click.bs.sidebar.autohide", function(e) {
        var i = t(e.target);
        i.is('.sidebar, [data-toggle="sidebar"]') || i.parents('.sidebar, [data-toggle="sidebar"]').length || t(".sidebar").each(function(e, i) {
            var s = t(i);
            s.data("bs.sidebar") && s.hasClass("sidebar-open") && s.sidebar("hide")
        })
    })
}(jQuery);