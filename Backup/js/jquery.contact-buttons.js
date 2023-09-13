! function(t) {
    "use strict";
    t.contactButtons = function(n) {
        var o, e = {
                effect: "",
                buttons: {
                    facebook: {
                        class: "facebook",
                        use: !1,
                        icon: "facebook",
                        link: "https://www.facebook.com/JustTripIndia/",
                        title: "Follow on Facebook"
                    },
                    google: {
                        class: "gplus",
                        use: !1,
                        icon: "google-plus",
                        link: "",
                        title: "Visit on Google Plus"
                    },
                    linkedin: {
                        class: "linkedin",
                        use: !1,
                        icon: "linkedin",
                        link: "",
                        title: "Visit on LinkedIn"
                    },
                    twitter: {
                        class: "twitter",
                        use: !1,
                        icon: "twitter",
                        link: "",
                        title: "Follow on Twitter"
                    },
                    pinterest: {
                        class: "pinterest",
                        use: !1,
                        icon: "pinterest",
                        link: "",
                        title: "Follow on Pinterest"
                    },
                    phone: {
                        class: "phone",
                        use: !1,
                        icon: "phone",
                        link: "",
                        title: "+91-9663133008",
                        type: "phone"
                    },
                    email: {
                        class: "email",
                        use: !1,
                        icon: "envelope",
                        link: "",
                        title: "Send us an email",
                        type: "email"
                    }
                }
            },
            a = n;
        for (o in e.buttons) n.buttons[o] && (a.buttons[o] = t.extend(e.buttons[o], n.buttons[o]));
        var i = t("#contact-buttons-bar");
        if (0 === i.length) {
            t("body").append('<div id="contact-buttons-bar">'), (i = t("#contact-buttons-bar")).addClass(a.effect);
            var s;
            for (s in i.append('<button class="contact-button-link show-hide-contact-bar"><span class="fa fa-angle-left"></span></button>'), a.buttons) {
                var l = a.buttons[s],
                    c = l.link;
                if (l.use) {
                    "phone" === l.type ? c = "tel:" + l.link : "email" === l.type && (c = "mailto:" + l.link);
                    var r = '<span class="fa fa-' + l.icon + '"></span>',
                        u = '<a href="' + c + '" class="contact-button-link cb-ancor ' + l.class + '" ' + (l.title ? 'title="' + l.title + '"' : "") + (l.extras ? l.extras : "") + ">" + r + "</a>";
                    i.append(u)
                }
            }
            setTimeout(function() {
                i.animate({
                    left: 0
                })
            }, 200), t("body").on("click", ".show-hide-contact-bar", function(n) {
                n.preventDefault(), n.stopImmediatePropagation(), t(".show-hide-contact-bar").find(".fa").toggleClass("fa-angle-right fa-angle-left"), i.find(".cb-ancor").toggleClass("cb-hidden")
            })
        }
    }, t(function() {
        var n = t("#contact-buttons-bar.slide-on-scroll");
        n.attr("data-top", n.css("top")), t(window).scroll(function() {
            clearTimeout(t.data(this, "scrollCheck")), t.data(this, "scrollCheck", setTimeout(function() {
                var o = t(window).scrollTop() + parseInt(n.attr("data-top"));
                n.animate({
                    top: o
                }, 500)
            }, 250))
        })
    })
}(jQuery);