! function(e) {
    var t = {
            en: {
                days: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                sep: "-",
                format: "DD-MM-YYYY hh:mm",
                prevMonth: "Previous month",
                nextMonth: "Next month",
                today: "Today"
            },
            ro: {
                days: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"],
                months: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                sep: ".",
                format: "DD.MM.YYYY hh:mm",
                prevMonth: "Luna precedentă",
                nextMonth: "Luna următoare",
                today: "Azi"
            },
            ja: {
                days: ["日", "月", "火", "水", "木", "金", "土"],
                months: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
                sep: "/",
                format: "YYYY/MM/DD hh:mm"
            },
            ru: {
                days: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                months: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
                format: "DD.MM.YYYY hh:mm"
            },
            br: {
                days: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                format: "DD/MM/YYYY hh:mm"
            },
            pt: {
                days: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
                months: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
            },
            cn: {
                days: ["日", "一", "二", "三", "四", "五", "六"],
                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
            },
            da: {
                days: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø"],
                months: ["Jan", "Feb", "Mar", "Apr", "Maj", "Juni", "Juli", "Aug", "Sept", "Okt", "Nov", "Dec"],
                sep: "-",
                format: "DD-MM-YYYY hh:mm",
                prevMonth: "Forrige måned",
                nextMonth: "Næste måned",
                today: "I dag"
            },
            de: {
                days: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                months: ["Jan", "Feb", "März", "Apr", "Mai", "Juni", "Juli", "Aug", "Sept", "Okt", "Nov", "Dez"],
                format: "DD.MM.YYYY hh:mm"
            },
            sv: {
                days: ["Sö", "Må", "Ti", "On", "To", "Fr", "Lö"],
                months: ["Jan", "Feb", "Mar", "Apr", "Maj", "Juni", "Juli", "Aug", "Sept", "Okt", "Nov", "Dec"]
            },
            id: {
                days: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
                months: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
            },
            it: {
                days: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
                months: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
                format: "DD/MM/YYYY hh:mm"
            },
            tr: {
                days: ["Pz", "Pzt", "Sal", "Çar", "Per", "Cu", "Cts"],
                months: ["Ock", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Agu", "Eyl", "Ekm", "Kas", "Arlk"]
            },
            es: {
                days: ["dom", "lun", "mar", "miér", "jue", "vie", "sáb"],
                months: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
                format: "DD/MM/YYYY hh:mm"
            },
            ko: {
                days: ["일", "월", "화", "수", "목", "금", "토"],
                months: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
                sep: "/",
                prevMonth: "이전 달",
                nextMonth: "다음 달",
                today: "오늘"
            },
            nl: {
                days: ["zo", "ma", "di", "wo", "do", "vr", "za"],
                months: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
                format: "DD-MM-YYYY hh:mm"
            },
            no: {
                days: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
                months: ["Jan", "Feb", "Mar", "Apr", "Mi", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
                sep: ".",
                format: "YYYY-MM-DD hh:mm",
                prevMonth: "Forrige Måned",
                nextMonth: "Neste Måned",
                today: "I dag"
            },
            cz: {
                days: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
                months: ["Led", "Úno", "Bře", "Dub", "Kvě", "Čer", "Čvc", "Srp", "Zář", "Říj", "Lis", "Pro"],
                format: "DD.MM.YYYY hh:mm"
            },
            fr: {
                days: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                format: "DD-MM-YYYY hh:mm"
            },
            pl: {
                days: ["N", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
                months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
                sep: "-",
                format: "YYYY-MM-DD hh:mm",
                prevMonth: "Poprzedni miesiąc",
                nextMonth: "Następny miesiąc",
                today: "Dzisiaj"
            },
            gr: {
                days: ["Κυ", "Δε", "Τρ", "Τε", "Πε", "Πα", "Σα"],
                months: ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαϊ", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"],
                sep: "-",
                format: "DD-MM-YYYY hh:mm",
                prevMonth: "Προηγ. μήνας",
                nextMonth: "Επόμ. μήνας",
                today: "Σήμερα"
            },
            ua: {
                days: ["Неділя", "Понеділок", "Вівторок", "Cереда", "Четвер", "П'ятниця", "Субота"],
                months: ["Cічень", "Лютий", "Березень", "Квітень", "Травень", "Червня", "Липня", "Серпня", "Вересня", "Жовтень", "Листопада", "Грудня"],
                format: "YYYY-MM-DD hh:mm",
                prevMonth: "Попередній місяць",
                nextMonth: "Наступний місяць",
                today: "Cьогодні"
            },
            et: {
                days: ["P", "E", "T", "K", "N", "R", "L"],
                months: ["Jaan", "Veebr", "Märts", "Apr", "Mai", "Juun", "Juul", "Aug", "Sept", "Okt", "Nov", "Dets"],
                sep: ".",
                format: "DD.MM.YYYY hh:mm",
                prevMonth: "Eelmine kuu",
                nextMonth: "Järgmine kuu",
                today: "Täna"
            },
            hu: {
                days: ["Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"],
                months: ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec"],
                sep: "-",
                format: "YYYY-MM-DD hh:mm:00",
                prevMonth: "Előző hónap",
                nextMonth: "Következő hónap",
                today: "Ma"
            },
            fa: {
                days: ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه"],
                months: ["ژانویه", "فبریه", "مارچ", "آپریل", "می", "ژوئن", "جولای", "آگوست", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"],
                sep: "-",
                format: "YYYY-MM-DD hh:mm",
                prevMonth: "ماه قبل",
                nextMonth: "ماه بعد",
                today: "امروز"
            },
            lv: {
                days: ["Sv", "P", "O", "T", "C", "P", "S"],
                months: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jūn", "Jūl", "Avg", "Sep", "Okt", "Nov", "Dec"],
                format: "DD.MM.YYYY hh:mm"
            },
            lt: {
                days: ["Pr", "A", "T", "K", "P", "Š", "S"],
                months: ["Saus.", "Vas.", "Kovas", "Bal.", "Geg.", "Birž.", "Liepa", "Rugp.", "Rugs.", "Spal.", "Lapkr.", "Gruod."],
                sep: "-",
                format: "YYYY-MM-DD hh:mm",
                prevMonth: "Praeitas mėnesis",
                nextMonth: "Sekantis mėnesis",
                today: "Šiandien"
            }
        },
        a = function(e, t) {
            this.$pickerObject = e, this.$inputObject = t
        };
    a.prototype.getPicker = function() {
        return this.$pickerObject
    }, a.prototype.getInput = function() {
        return this.$inputObject
    }, a.prototype.isShow = function() {
        var e = !0;
        return "none" == this.$pickerObject.css("display") && (e = !1), e
    }, a.prototype.show = function() {
        var e = this.$pickerObject,
            t = this.$inputObject;
        e.show(), t.data("pickerId"), null != t && !1 === e.data("isInline") && this._relocate()
    }, a.prototype.hide = function() {
        var e = this.$pickerObject;
        this.$inputObject;
        e.hide()
    }, a.prototype.getDate = function() {
        var e = this.$pickerObject;
        this.$inputObject;
        return m(e)
    }, a.prototype.setDate = function(e) {
        var t = this.$pickerObject;
        this.$inputObject;
        f("Date", e) || (e = new Date(e)), M(t, {
            isAnim: !0,
            isOutputToInputObject: !0
        }, e)
    }, a.prototype.setMinDate = function(e) {
        var t = this.$pickerObject,
            a = this.$inputObject;
        f("Date", e) || (e = new Date(e)), t.data("minDate", e), a.val() ? (datepicked = new Date(m(t)), M(t, {
            isAnim: !0,
            isOutputToInputObject: !0
        }, datepicked > e ? datepicked : e)) : M(t, {
            isAnim: !0,
            isOutputToInputObject: !1
        }, e)
    }, a.prototype.setMaxDate = function(e) {
        var t = this.$pickerObject,
            a = this.$inputObject;
        f("Date", e) || (e = new Date(e)), t.data("maxDate", e), a.val() ? (datepicked = new Date(m(t)), M(t, {
            isAnim: !0,
            isOutputToInputObject: !0
        }, datepicked < e ? datepicked : e)) : M(t, {
            isAnim: !0,
            isOutputToInputObject: !1
        }, e)
    }, a.prototype.destroy = function() {
        var e = this.$pickerObject,
            t = e.data("pickerId");
        n[t] = null, e.remove()
    }, a.prototype._relocate = function() {
        var t = this.$pickerObject,
            a = this.$inputObject;
        if (null != a && !1 === t.data("isInline")) {
            var n = a.outerHeight({
                margin: !0
            });
            f("Number", n) || (n = a.outerHeight());
            var i = t.outerHeight({
                margin: !0
            });
            f("Number", i) || (i = t.outerHeight()), 0 !== e(".datepicker_calendar", t).width() && 0 !== e(".datepicker_timelist", t).width() && t.parent().width(e(".datepicker_calendar", t).width() + e(".datepicker_timelist", t).width() + 6), parseInt(e(window).height()) <= a.offset().top - e(document).scrollTop() + n + i ? t.parent().css("top", a.offset().top - n / 2 - i + "px") : t.parent().css("top", a.offset().top + n + "px"), t.parent().width() + a.offset().left > e(window).width() ? t.parent().css("left", (e(window).width() - t.parent().width()) / 2 + "px") : t.parent().css("left", a.offset().left + "px"), t.parent().css("z-index", 1e5)
        }
    };
    var n = [],
        i = [],
        r = function(t) {
            return e(t).closest(".datepicker")
        },
        o = function(e) {
            var t = r(e);
            if (!1 !== t.data("stateAllowBeforeMonth")) {
                var a = p(t),
                    n = new Date(a.getFullYear(), a.getMonth(), 0).getDate();
                n < a.getDate() && a.setDate(n), D(t, {
                    isAnim: !0,
                    isOutputToInputObject: !1,
                    keepPickedDate: !0
                }, a.getFullYear(), a.getMonth() - 1, a.getDate(), a.getHours(), a.getMinutes());
                var i = new Date;
                if (t.data("futureOnly") && t.data("current") && (i = new Date(t.data("current"))), !(i.getFullYear() == a.getFullYear() && i.getMonth() == a.getMonth()) || !t.data("futureOnly")) {
                    n < a.getDate() && a.setDate(n);
                    var o = new Date(a.getFullYear(), a.getMonth() - 1, a.getDate(), a.getHours(), a.getMinutes());
                    t.data("minDate") && o < t.data("minDate") && (o = t.data("minDate")), D(t, {
                        isAnim: !0,
                        isOutputToInputObject: !1,
                        keepPickedDate: !0
                    }, o.getFullYear(), o.getMonth(), o.getDate(), o.getHours(), o.getMinutes())
                }
            }
        },
        l = function(e) {
            var t = r(e),
                a = p(t),
                n = new Date(a.getFullYear(), a.getMonth() + 1, 0).getDate();
            n < a.getDate() && a.setDate(n), s(a.getFullYear(), a.getMonth() + 1) < a.getDate() && a.setDate(s(a.getFullYear(), a.getMonth() + 1));
            var i = new Date(a.getFullYear(), a.getMonth() + 1, a.getDate(), a.getHours(), a.getMinutes());
            t.data("maxDate") && i > t.data("maxDate") && (i = t.data("maxDate")), D(t, {
                isAnim: !0,
                isOutputToInputObject: !1,
                keepPickedDate: !0
            }, i.getFullYear(), i.getMonth(), i.getDate(), i.getHours(), i.getMinutes())
        },
        s = function(e, t) {
            return new Date(e, t + 1, 0).getDate()
        },
        d = function(e, t, a, n) {
            return "default" == e && (e = v(t, "format"), a ? e = e.substring(0, e.search(" ")) : n && (e = e.substring(e.search(" ") + 1))), e
        },
        u = function(e) {
            if (e < 99) {
                var t = new Date;
                return parseInt(e) + parseInt(t.getFullYear().toString().substr(0, 2) + "00")
            }
            return e
        },
        c = function(e, t) {
            var a, n;
            if (null != t) {
                var i = t.replace(/hh:mm.*/, "(?:$&)?").replace(/\s/, "\\s?").replace(/(-|\/)/g, "[-/]").replace(/YYYY/gi, "(\\d{2,4})").replace(/(YY|MM|DD|HH|hh|mm)/g, "(\\d{1,2})").replace(/(M|D|H|h|m)/g, "(\\d{1,2})").replace(/(tt|TT)/g, "([aApP][mM])");
                if (null != (a = new RegExp(i).exec(e))) {
                    for (var r, o, l, s, d, c = [], h = "", p = "", m = t; null != m && 0 < m.length;) {
                        var g = m.substring(0, 1);
                        m = m.substring(1, m.length), p != g && (/(YYYY|YY|MM|DD|mm|dd|M|D|HH|H|hh|h|m|tt|TT)/.test(h) ? (c.push(h), h = "") : h = ""), h += g, p = g
                    }
                    "" !== h && /(YYYY|YY|MM|DD|mm|dd|M|D|HH|H|hh|h|m|tt|TT)/.test(h) && c.push(h);
                    for (var M = !1, v = !1, D = !1, f = 0; f < c.length && !(a.length < f); f++) {
                        var Y = c[f],
                            y = a[f + 1];
                        "YYYY" == Y ? (r = u(y), M = !0) : "YY" == Y ? (r = parseInt(y) + 2e3, M = !0) : "MM" == Y || "M" == Y ? (o = parseInt(y) - 1, M = !0) : "DD" == Y || "D" == Y ? (l = y, M = !0) : "hh" == Y || "h" == Y ? (s = void 0 !== y ? y : 0, M = !0) : "HH" == Y || "H" == Y ? (s = void 0 !== y ? y : 0, D = !0, M = !0) : "mm" == Y || "m" == Y ? (d = void 0 !== y ? y : 0, M = !0) : "tt" != Y && "TT" != Y || ("pm" != y && "PM" != y || (v = !0), M = !0)
                    }
                    if (D && (v ? 12 != s && (s = parseInt(s) + 12) : 12 == s && (s = 0)), n = new Date(r, o, l, s, d), !0 === M && !1 === isNaN(n) && !1 === isNaN(n.getDate())) return n
                }
            }
            return null !== (a = /^(\d{2,4})[-\/](\d{1,2})[-\/](\d{1,2}) (\d{1,2}):(\d{1,2})$/.exec(e)) ? (a[1] = u(a[1]), n = new Date(a[1], a[2] - 1, a[3], a[4], a[5])) : null !== (a = /^(\d{2,4})[-\/](\d{1,2})[-\/](\d{1,2})$/.exec(e)) && (a[1] = u(a[1]), n = new Date(a[1], a[2] - 1, a[3])), !1 === isNaN(n) && !1 === isNaN(n.getDate()) && n
        },
        h = function(t) {
            var a = function(t) {
                var a = r(t);
                return null != a.data("inputObjectId") ? e(i[a.data("inputObjectId")]) : null
            }(t);
            if (null != a) {
                var n = m(t),
                    o = t.data("locale"),
                    l = d(t.data("dateFormat"), o, t.data("dateOnly"), t.data("timeOnly")),
                    s = a.val();
                a.val(function(e, t) {
                    null == e && (e = new Date);
                    var a = e.getFullYear(),
                        n = e.getMonth() + 1,
                        i = e.getDate(),
                        r = e.getHours(),
                        o = e.getMinutes();
                    return t = t.replace(/YYYY/gi, a).replace(/YY/g, a - 2e3).replace(/MM/g, g(n)).replace(/M/g, n).replace(/DD/g, g(i)).replace(/D/g, i).replace(/hh/g, g(r)).replace(/h/g, r).replace(/HH/g, r > 12 ? g(r - 12) : r < 1 ? 12 : g(r)).replace(/H/g, r > 12 ? r - 12 : r < 1 ? 12 : r).replace(/mm/g, g(o)).replace(/m/g, o).replace(/tt/g, r >= 12 ? "pm" : "am").replace(/TT/g, r >= 12 ? "PM" : "AM")
                }(n, l)), s != a.val() && a.trigger("change")
            }
        },
        p = function(e) {
            return r(e).data("shownDate")
        },
        m = function(e) {
            return r(e).data("pickedDate")
        },
        g = function(e) {
            return e = ("0" + e).slice(-2)
        },
        M = function(e, t, a) {
            D(e, t, a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes())
        },
        v = function(e, a) {
            return void 0 !== t[e][a] ? t[e][a] : t.en[a]
        },
        D = function(n, i, s, d, u, c, M) {
            var Y = new Date;
            Y = null != c ? new Date(s, d, u, c, M, 0) : null != s ? new Date(s, d, u) : new Date;
            var y = n.data("todayButton"),
                O = n.data("closeButton"),
                w = i.isAnim;
            !1 === n.data("timelistScroll") && (w = !1);
            var k = i.isAnim;
            !1 === n.data("animation") && (k = !1);
            var b = n.data("futureOnly"),
                T = n.data("minDate"),
                S = n.data("maxDate"),
                I = i.isOutputToInputObject,
                x = i.keepPickedDate;
            void 0 === x && (x = !1);
            var j = n.data("minuteInterval"),
                F = n.data("firstDayOfWeek"),
                A = n.data("allowWdays");
            (null == A || !1 === f("Array", A) || A.length <= 0) && (A = null);
            var H = n.data("minTime"),
                C = n.data("maxTime"),
                _ = new Date;
            if (b && (n.data("current") && (_ = new Date(n.data("current"))), Y.getTime() < _.getTime() && Y.setTime(_.getTime())), null != A && A.length <= 6)
                for (; - 1 == e.inArray(Y.getDay(), A);) Y.setDate(Y.getDate() + 1);
            var J = n.data("locale");
            t.hasOwnProperty(J) || (J = "en");
            var P = new Date(Y.getFullYear(), Y.getMonth(), 1).getDay() - F,
                N = new Date(Y.getFullYear(), Y.getMonth() + 1, 0).getDate(),
                z = new Date(Y.getFullYear(), Y.getMonth(), 0).getDate(),
                L = new Date(Y.getFullYear(), Y.getMonth(), 0),
                $ = new Date(Y.getFullYear(), Y.getMonth() + 2, 0),
                B = _.getFullYear() == Y.getFullYear(),
                W = B && _.getMonth() == Y.getMonth(),
                V = W && _.getDate() == Y.getDate(),
                K = _.getFullYear() + 1 == Y.getFullYear(),
                E = B && _.getMonth() + 1 == Y.getMonth() || K && 11 === _.getMonth() && 0 === Y.getMonth(),
                G = !1;
            (Y.getFullYear() < _.getFullYear() || B && Y.getMonth() < _.getMonth()) && (G = !0);
            var R = n.children(".datepicker_header"),
                q = (n.children(".datepicker_inner_container"), n.children(".datepicker_inner_container").children(".datepicker_calendar")),
                Q = q.children(".datepicker_table"),
                Z = n.children(".datepicker_inner_container").children(".datepicker_timelist"),
                U = "",
                X = m(n);
            null != X && (X.getMonth() != Y.getMonth() || X.getDate() != Y.getDate() ? U = "calendar" : X.getHours() == Y.getHours() && X.getMinutes() == Y.getMinutes() || 0 !== Y.getMinutes() && Y.getMinutes() % j != 0 || (U = "timelist")), !1 === x && e(n).data("pickedDate", Y), e(n).data("shownDate", Y), !0 === k && ("calendar" == U ? (q.stop().queue([]), q.fadeTo("fast", .8)) : "timelist" == U && (Z.stop().queue([]), Z.fadeTo("fast", .8)));
            var ee = Z.scrollTop(),
                te = -1;
            R.children().remove();
            var ae = new Date(Y.getTime());
            ae.setMinutes(59), ae.setHours(23), ae.setSeconds(59), ae.setDate(0);
            var ne = null;
            b && W || !(null == T || T < ae.getTime()) ? n.data("stateAllowBeforeMonth", !1) : ((ne = e("<a>")).text("<"), ne.prop("alt", v(J, "prevMonth")), ne.prop("title", v(J, "prevMonth")), ne.click(function() {
                o(n)
            }), n.data("stateAllowBeforeMonth", !0)), ae.setMinutes(0), ae.setHours(0), ae.setSeconds(0), ae.setDate(1), ae.setMonth(Y.getMonth() + 1);
            var ie = e("<span>");
            ie.text(Y.getFullYear() + " " + v(J, "sep") + " " + v(J, "months")[Y.getMonth()]);
            var re = null;
            if ((null == S || S > ae.getTime()) && ((re = e("<a>")).text(">"), re.prop("alt", v(J, "nextMonth")), re.prop("title", v(J, "nextMonth")), re.click(function() {
                    l(n)
                })), y) {
                var oe = e("<a><div/></a>");
                oe.addClass("icon-home"), oe.prop("alt", v(J, "today")), oe.prop("title", v(J, "today")), oe.click(function() {
                    ! function(e) {
                        var t = r(e),
                            a = new Date;
                        D(t, {
                            isAnim: !0,
                            isOutputToInputObject: !0
                        }, a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes())
                    }(n)
                }), R.append(oe)
            }
            if (O) {
                var le = e("<a><div/></a>");
                le.addClass("icon-close"), le.prop("alt", v(J, "close")), le.prop("title", v(J, "close")), le.click(function() {
                    n.hide()
                }), R.append(le)
            }
            null != ne && R.append(ne), R.append(ie), null != re && R.append(re), Q.children().remove();
            var se = e("<tr>");
            Q.append(se);
            for (var de, ue = 7 + F, ce = v(J, "days"), he = 0; he < 7; he++)(de = e("<th>")).text(ce[(he + ue) % 7]), se.append(de);
            var pe = 7 * Math.ceil((P + N) / 7);
            he = 0, P < 0 && (he = -7);
            var me = new Date(Y.getTime());
            me.setHours(0), me.setMinutes(0), me.setSeconds(0);
            for (var ge = m(n), Me = p(n); he < pe; he++) {
                var ve = he + 1 - P,
                    De = G || W && ve < _.getDate() || E && P > he && z + ve < _.getDate();
                he % 7 == 0 && (se = e("<tr>"), Q.append(se)), (de = e("<td>")).data("day", ve), se.append(de), P > he ? (de.text(z + ve), de.addClass("day_another_month"), de.data("dateStr", L.getFullYear() + "/" + (L.getMonth() + 1) + "/" + (z + ve)), me.setDate(z + ve), me.setMonth(L.getMonth()), me.setYear(L.getFullYear())) : he < P + N ? (de.text(ve), de.data("dateStr", Y.getFullYear() + "/" + (Y.getMonth() + 1) + "/" + ve), me.setDate(ve), me.setMonth(Y.getMonth()), me.setYear(Y.getFullYear())) : (de.text(ve - N), de.addClass("day_another_month"), de.data("dateStr", $.getFullYear() + "/" + ($.getMonth() + 1) + "/" + (ve - N)), me.setDate(ve - N), me.setMonth($.getMonth()), me.setYear($.getFullYear()));
                var fe = (he + ue) % 7;
                if (null != A) {
                    if (-1 == e.inArray(fe, A)) {
                        de.addClass("day_in_unallowed");
                        continue
                    }
                } else 0 === fe ? de.addClass("wday_sun") : 6 == fe && de.addClass("wday_sat");
                Me.getFullYear() == ge.getFullYear() && Me.getMonth() == ge.getMonth() && ve == ge.getDate() && de.addClass("active"), W && ve == _.getDate() && de.addClass("today");
                var Ye = new Date(me.getTime());
                Ye.setHours(23), Ye.setMinutes(59), Ye.setSeconds(59), null != T && T > Ye.getTime() || null != S && S < me.getTime() ? de.addClass("out_of_range") : b && De ? de.addClass("day_in_past") : (de.click(function(t) {
                    t.stopPropagation(), e(this).hasClass("hover") && e(this).removeClass("hover"), e(this).addClass("active");
                    var n = r(e(this)),
                        i = new Date(e(this).data("dateStr")),
                        o = m(n);
                    D(n, {
                        isAnim: !1,
                        isOutputToInputObject: !0
                    }, i.getFullYear(), i.getMonth(), i.getDate(), o.getHours(), o.getMinutes());
                    var l = e(this),
                        s = new a(n, l),
                        d = n.data("onSelect");
                    null != d && d(s, i), !0 === n.data("dateOnly") && !1 === n.data("isInline") && n.data("closeOnSelected") && (-1, n.hide())
                }), de.hover(function() {
                    e(this).hasClass("active") || e(this).addClass("hover")
                }, function() {
                    e(this).hasClass("hover") && e(this).removeClass("hover")
                }))
            }
            if (!0 === n.data("timeOnly") && (q.css("display", "none"), ie.css("display", "none"), null != re && re.css("display", "none"), null != ne && ne.css("display", "none")), !0 === n.data("dateOnly")) Z.css("display", "none");
            else {
                Z.children().remove(), q.innerHeight() > 0 && Z.css("height", q.innerHeight() - 10 + "px"), me = new Date(Y.getTime()), Z.css("height", Math.max(q.innerHeight() - 10, 200) + "px");
                for (var ye = H[0], Oe = H[1]; 100 * ye + Oe < 100 * C[0] + C[1];) {
                    var we = e("<div>"),
                        ke = ye < _.getHours() || ye == _.getHours() && Oe < _.getMinutes(),
                        be = V && ke;
                    we.addClass("timelist_item");
                    var Te = "";
                    n.data("amPmInTimeList") ? (Te = ye > 12 ? ye - 12 : ye < 1 ? 12 : ye, Te += ":" + g(Oe), Te += ye >= 12 ? "PM" : "AM") : Te = g(ye) + ":" + g(Oe), we.text(Te), we.data("hour", ye), we.data("min", Oe), Z.append(we), me.setHours(ye), me.setMinutes(Oe), null != T && T > me.getTime() || null != S && S < me.getTime() ? we.addClass("out_of_range") : b && be ? we.addClass("time_in_past") : (we.click(function(t) {
                        t.stopPropagation(), e(this).hasClass("hover") && e(this).removeClass("hover"), e(this).addClass("active");
                        var a = r(e(this)),
                            n = m(a),
                            i = e(this).data("hour"),
                            o = e(this).data("min");
                        D(a, {
                            isAnim: !1,
                            isOutputToInputObject: !0
                        }, n.getFullYear(), n.getMonth(), n.getDate(), i, o), !1 === a.data("isInline") && a.data("closeOnSelected") && (-1, a.hide())
                    }), we.hover(function() {
                        e(this).hasClass("active") || e(this).addClass("hover")
                    }, function() {
                        e(this).hasClass("hover") && e(this).removeClass("hover")
                    })), ye == Y.getHours() && Oe == Y.getMinutes() && (we.addClass("active"), te = we.offset().top), (Oe += j) >= 60 && (Oe -= 60, ye++)
                }!0 === w ? Z.scrollTop(te - Z.offset().top) : Z.scrollTop(ee)
            }!0 === k && ("calendar" == U && !1 === n.data("timeOnly") ? q.fadeTo("fast", 1) : "timelist" == U && !1 === n.data("dateOnly") && Z.fadeTo("fast", 1)), !0 === I && h(n)
        },
        f = function(e, t) {
            var a = Object.prototype.toString.call(t).slice(8, -1);
            return null != t && a === e
        };
    e.fn.dtpicker = function(t) {
        new Date;
        var a = {
            current: null,
            dateFormat: "default",
            locale: "en",
            animation: !0,
            minuteInterval: 60,
            firstDayOfWeek: 0,
            closeOnSelected: !0,
            timelistScroll: !0,
            calendarMouseScroll: !0,
            todayButton: !1,
            closeButton: !1,
            dateOnly: !1,
            timeOnly: !1,
            futureOnly: !0,
            minDate: null,
            maxDate: null,
            autodateOnStart: !1,
            minTime: "00:00",
            maxTime: "23:59",
            onShow: null,
            onHide: null,
            onSelect: null,
            allowWdays: null,
            amPmInTimeList: !1,
            externalLocale: null
        };
        void 0 !== t && !0 === t.closeButton || (a.closeButton = !1), a.inputObjectId = void 0;
        var i = e.extend(a, t);
        return this.each(function(t) {
            ! function(t, a) {
                var i = e("<div>");
                if (i.destroy = function() {
                        window.alert("destroy!")
                    }, i.addClass("datepicker"), t.append(i), a.current) {
                    var s = d(a.dateFormat, a.locale, a.dateOnly, a.timeOnly),
                        u = c(a.current, s);
                    a.current = u || new Date
                } else a.current = new Date;
                null != a.inputObjectId && i.data("inputObjectId", a.inputObjectId), a.timeOnly && (a.todayButton = !1), i.data("timeOnly", a.timeOnly), i.data("dateOnly", a.dateOnly), i.data("pickerId", n.length), i.data("dateFormat", a.dateFormat), i.data("locale", a.locale), i.data("firstDayOfWeek", a.firstDayOfWeek), i.data("animation", a.animation), i.data("closeOnSelected", a.closeOnSelected), i.data("timelistScroll", a.timelistScroll), i.data("calendarMouseScroll", a.calendarMouseScroll), i.data("todayButton", a.todayButton), i.data("closeButton", a.closeButton), i.data("futureOnly", a.futureOnly), i.data("onShow", a.onShow), i.data("onHide", a.onHide), i.data("onSelect", a.onSelect), i.data("onInit", a.onInit), i.data("allowWdays", a.allowWdays), i.data("current", a.current), !0 === a.amPmInTimeList ? i.data("amPmInTimeList", !0) : i.data("amPmInTimeList", !1);
                var h = Date.parse(a.minDate);
                isNaN(h) ? i.data("minDate", null) : i.data("minDate", h);
                var p = Date.parse(a.maxDate);
                isNaN(p) ? i.data("maxDate", null) : i.data("maxDate", p), i.data("state", 0), 5 <= a.minuteInterval && a.minuteInterval <= 60 ? i.data("minuteInterval", a.minuteInterval) : i.data("minuteInterval", 60), a.minTime = a.minTime.split(":"), a.maxTime = a.maxTime.split(":"), a.minTime[0] >= 0 && a.minTime[0] < 24 || (a.minTime[0] = "00"), a.maxTime[0] >= 0 && a.maxTime[0] < 24 || (a.maxTime[0] = "23"), a.minTime[1] >= 0 && a.minTime[1] < 60 || (a.minTime[1] = "00"), a.maxTime[1] >= 0 && a.maxTime[1] < 24 || (a.maxTime[1] = "59"), a.minTime[0] = parseInt(a.minTime[0], 10), a.minTime[1] = parseInt(a.minTime[1], 10), a.maxTime[0] = parseInt(a.maxTime[0], 10), a.maxTime[1] = parseInt(a.maxTime[1], 10), i.data("minTime", a.minTime), i.data("maxTime", a.maxTime);
                var m = e("<div>");
                m.addClass("datepicker_header"), i.append(m);
                var g = e("<div>");
                g.addClass("datepicker_inner_container"), i.append(g);
                var v = e("<div>");
                v.addClass("datepicker_calendar");
                var D = e("<table>");
                D.addClass("datepicker_table"), v.append(D), g.append(v);
                var f = e("<div>");
                f.addClass("datepicker_timelist"), g.append(f), a.calendarMouseScroll && (window.sidebar ? v.bind("DOMMouseScroll", function(t) {
                    var a = r(e(this));
                    return t.originalEvent.detail > 0 ? l(a) : o(a), !1
                }) : v.bind("mousewheel", function(t) {
                    var a = r(e(this));
                    return t.originalEvent.wheelDelta / 120 > 0 ? o(a) : l(a), !1
                })), n.push(i), M(i, {
                    isAnim: !0,
                    isOutputToInputObject: a.autodateOnStart
                }, a.current)
            }(e(this), i)
        })
    }, e.fn.appendDtpicker = function(r) {
        new Date;
        var o = {
            current: null,
            dateFormat: "default",
            locale: "en",
            animation: !0,
            minuteInterval: 60,
            firstDayOfWeek: 0,
            closeOnSelected: !0,
            timelistScroll: !0,
            calendarMouseScroll: !0,
            todayButton: !1,
            closeButton: !1,
            dateOnly: !1,
            timeOnly: !1,
            futureOnly: !0,
            minDate: null,
            maxDate: null,
            autodateOnStart: !1,
            minTime: "00:00",
            maxTime: "23:59",
            onShow: null,
            onHide: null,
            onSelect: null,
            allowWdays: null,
            amPmInTimeList: !1,
            externalLocale: null
        };
        void 0 !== r && !0 === r.inline && !0 !== r.closeButton && (o.closeButton = !1), o.inline = !1;
        var l = e.extend(o, r);
        return null != l.externalLocale && (t = e.extend(t, l.externalLocale)), this.each(function(t) {
            if (0 < e(n[e(this).data("pickerId")]).length) console.log("dtpicker - Already exist appended picker");
            else {
                var r = i.length;
                i.push(this), l.inputObjectId = r, null != e(this).val() && "" !== e(this).val() && (l.current = e(this).val());
                var o = e("<div>");
                l.inline ? o.insertAfter(this) : (o.css("position", "absolute"), e("body").append(o));
                var s = n.length,
                    u = e(o).dtpicker(l),
                    h = u.children(".datepicker");
                e(this).data("pickerId", s), e(this).keyup(function() {
                    var t = e(this),
                        a = e(n[t.data("pickerId")]);
                    if (null != t.val() && (null == t.data("beforeVal") || null != t.data("beforeVal") && t.data("beforeVal") != t.val())) {
                        var i = d(a.data("dateFormat"), a.data("locale"), a.data("dateOnly"), a.data("timeOnly")),
                            r = c(t.val(), i);
                        r && M(a, {
                            isAnim: !0,
                            isOutputToInputObject: !1
                        }, r)
                    }
                    t.data("beforeVal", t.val())
                }), e(this).change(function() {
                    e(this).trigger("keyup")
                });
                var p = new a(h, e(this));
                !0 === l.inline ? h.data("isInline", !0) : (h.data("isInline", !1), u.css({
                    zIndex: 100
                }), h.css("width", "auto"), h.hide(), e(this).on("click, focus", function(t) {
                    t.stopPropagation();
                    var i = e(this),
                        r = e(n[i.data("pickerId")]),
                        o = new a(r, i);
                    if (!o.isShow()) {
                        o.show();
                        var l = r.data("onShow");
                        null != l && (console.log("dtpicker- Call the onShow handler"), l(o))
                    }
                }), function(t) {
                    e(window).resize(function() {
                        t._relocate()
                    }), e(window).scroll(function() {
                        t._relocate()
                    })
                }(p)), e(this).bind("destroyed", function() {
                    var t = e(this),
                        i = e(n[t.data("pickerId")]);
                    new a(i, t).destroy()
                });
                var m = h.data("onInit");
                null != m && (console.log("dtpicker- Call the onInit handler"), m(p))
            }
        })
    };
    var Y = {
        show: function() {
            var t = e(this),
                i = e(n[t.data("pickerId")]);
            null != i && new a(i, t).show()
        },
        hide: function() {
            var t = e(this),
                i = e(n[t.data("pickerId")]);
            null != i && new a(i, t).hide()
        },
        setDate: function(t) {
            var i = e(this),
                r = e(n[i.data("pickerId")]);
            null != r && new a(r, i).setDate(t)
        },
        setMinDate: function(t) {
            var i = e(this),
                r = e(n[i.data("pickerId")]);
            null != r && new a(r, i).setMinDate(t)
        },
        setMaxDate: function(t) {
            var i = e(this),
                r = e(n[i.data("pickerId")]);
            null != r && new a(r, i).setMaxDate(t)
        },
        getDate: function() {
            var t = e(this),
                i = e(n[t.data("pickerId")]);
            if (null != i) return new a(i, t).getDate()
        },
        destroy: function() {
            var t = e(this),
                i = e(n[t.data("pickerId")]);
            null != i && new a(i, t).destroy()
        }
    };
    e.fn.handleDtpicker = function(t) {
        return Y[t] ? Y[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist on jQuery.handleDtpicker") : Y.init.apply(this, arguments)
    }, window.console || (window.console = {}, window.console.log = function() {}), e.event.special.destroyed = {
        remove: function(e) {
            e.handler && e.handler.apply(this, arguments)
        }
    }, e(function() {
        e("body").click(function() {
            for (var t = 0; t < n.length; t++) {
                var r = e(n[t]);
                if (null != r.data("inputObjectId") && !r.data("isInline") && "none" != r.css("display")) {
                    if (r.is(":hover")) continue;
                    var o = e(i[r.data("inputObjectId")]);
                    if (o.is(":focus")) continue;
                    var l = new a(r, o);
                    l.hide();
                    var s = r.data("onHide");
                    null != s && (console.log("dtpicker- Call the onHide handler"), s(l))
                }
            }
        })
    })
}(jQuery);