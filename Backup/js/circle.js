! function(t) {
    function i(t) {
        this.init(t)
    }
    i.prototype = {
        value: 0,
        size: 30,
        startAngle: -Math.PI,
        thickness: "auto",
        fill: {
            gradient: ["#3aeabb", "#fdd250"]
        },
        emptyFill: "#e5e5e5",
        animation: {
            duration: 3300,
            easing: "circleProgressEasing"
        },
        animationStartValue: 0,
        reverse: !1,
        lineCap: "butt",
        constructor: i,
        el: null,
        canvas: null,
        ctx: null,
        radius: 0,
        arcFill: null,
        lastFrameValue: 0,
        init: function(i) {
            t.extend(this, i), this.radius = this.size / 2, this.initWidget(), this.initFill(), this.draw()
        },
        initWidget: function() {
            var i = this.canvas = this.canvas || t("<canvas>").prependTo(this.el)[0];
            i.width = this.size, i.height = this.size, this.ctx = i.getContext("2d")
        },
        initFill: function() {
            function i() {
                var i = t("<canvas>")[0];
                i.width = a.size, i.height = a.size, i.getContext("2d").drawImage(e, 0, 0, n, n), a.arcFill = a.ctx.createPattern(i, "no-repeat"), a.drawFrame(a.lastFrameValue)
            }
            var e, a = this,
                s = this.fill,
                r = this.ctx,
                n = this.size;
            if (!s) throw Error("The fill is not specified!");
            if (s.color && (this.arcFill = s.color), s.gradient) {
                var c = s.gradient;
                if (1 == c.length) this.arcFill = c[0];
                else if (c.length > 1) {
                    for (var h = s.gradientAngle || 0, l = s.gradientDirection || [n / 2 * (1 - Math.cos(h)), n / 2 * (1 + Math.sin(h)), n / 2 * (1 + Math.cos(h)), n / 2 * (1 - Math.sin(h))], o = r.createLinearGradient.apply(r, l), g = 0; g < c.length; g++) {
                        var d = c[g],
                            u = g / (c.length - 1);
                        t.isArray(d) && (u = d[1], d = d[0]), o.addColorStop(u, d)
                    }
                    this.arcFill = o
                }
            }
            s.image && (s.image instanceof Image ? e = s.image : (e = new Image).src = s.image, e.complete ? i() : e.onload = i)
        },
        draw: function() {
            this.animation ? this.drawAnimated(this.value) : this.drawFrame(this.value)
        },
        drawFrame: function(t) {
            this.lastFrameValue = t, this.ctx.clearRect(0, 0, this.size, this.size), this.drawEmptyArc(t), this.drawArc(t)
        },
        drawArc: function(t) {
            var i = this.ctx,
                e = this.radius,
                a = this.getThickness(),
                s = this.startAngle;
            i.save(), i.beginPath(), this.reverse ? i.arc(e, e, e - a / 2, s - 2 * Math.PI * t, s) : i.arc(e, e, e - a / 2, s, s + 2 * Math.PI * t), i.lineWidth = a, i.lineCap = this.lineCap, i.strokeStyle = this.arcFill, i.stroke(), i.restore()
        },
        drawEmptyArc: function(t) {
            var i = this.ctx,
                e = this.radius,
                a = this.getThickness(),
                s = this.startAngle;
            1 > t && (i.save(), i.beginPath(), 0 >= t ? i.arc(e, e, e - a / 2, 0, 2 * Math.PI) : this.reverse ? i.arc(e, e, e - a / 2, s, s - 2 * Math.PI * t) : i.arc(e, e, e - a / 2, s + 2 * Math.PI * t, s), i.lineWidth = a, i.strokeStyle = this.emptyFill, i.stroke(), i.restore())
        },
        drawAnimated: function(i) {
            var e = this,
                a = this.el;
            a.trigger("circle-animation-start"), t(this.canvas).stop(!0, !0).css({
                animationProgress: 0
            }).animate({
                animationProgress: 1
            }, t.extend({}, this.animation, {
                step: function(t) {
                    var s = e.animationStartValue * (1 - t) + i * t;
                    e.drawFrame(s), a.trigger("circle-animation-progress", [t, s])
                },
                complete: function() {
                    a.trigger("circle-animation-end")
                }
            }))
        },
        getThickness: function() {
            return t.isNumeric(this.thickness) ? this.thickness : this.size / 14
        }
    }, t.circleProgress = {
        defaults: i.prototype
    }, t.easing.circleProgressEasing = function(t, i, e, a, s) {
        return (i /= s / 2) < 1 ? a / 2 * i * i * i + e : a / 2 * ((i -= 2) * i * i + 2) + e
    }, t.fn.circleProgress = function(e) {
        var a = "circle-progress";
        if ("widget" == e) {
            var s = this.data(a);
            return s && s.canvas
        }
        return this.each(function() {
            var s = t(this),
                r = s.data(a),
                n = t.isPlainObject(e) ? e : {};
            r ? r.init(n) : (n.el = s, r = new i(n), s.data(a, r))
        })
    }
}(jQuery);