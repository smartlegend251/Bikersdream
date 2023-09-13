function fullscreenFix() {
    var a = $("body").height();
    $(".content-b").each(function(i) {
        $(this).innerHeight() <= a && $(this).closest(".fullscreen").addClass("not-overflow")
    })
}

function backgroundResize() {
    var a = $(window).height();
    $(".background").each(function(i) {
        var t = $(this),
            e = t.width(),
            s = t.height(),
            o = t.attr("data-img-width"),
            n = t.attr("data-img-height"),
            r = o / n,
            c = parseFloat(t.attr("data-diff"));
        c = c || 0;
        var l = 0;
        if (t.hasClass("parallax") && !$("html").hasClass("touch")) {
            l = a - s
        }
        e > (o = (n = s + l + c) * r) && (n = (o = e) / r), t.data("resized-imgW", o), t.data("resized-imgH", n), t.css("background-size", o + "px " + n + "px")
    })
}

function parallaxPosition(a) {
    var i = $(window).height(),
        t = $(window).scrollTop(),
        e = t + i,
        s = (t + e) / 2;
    $(".parallax").each(function(a) {
        var o = $(this),
            n = o.height(),
            r = o.offset().top,
            c = r + n;
        if (e > r && t < c) {
            o.data("resized-imgW");
            var l = o.data("resized-imgH"),
                d = n < i ? l - n : l - i,
                h = 0 + (-l + i - 0) * (s - (r -= d)) / ((c += d) - r),
                u = o.attr("data-oriz-pos");
            u = u || "50%", $(this).css("background-position", u + " " + h + "px")
        }
    })
}
"ontouchstart" in window && (document.documentElement.className = document.documentElement.className + " touch"), $("html").hasClass("touch") || $(".parallax").css("background-attachment", "fixed"), $(window).resize(fullscreenFix), fullscreenFix(), $(window).resize(backgroundResize), $(window).focus(backgroundResize), backgroundResize(), $("html").hasClass("touch") || ($(window).resize(parallaxPosition), $(window).scroll(parallaxPosition), parallaxPosition());