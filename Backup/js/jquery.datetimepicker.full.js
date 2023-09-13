var DateFormatter;
! function() {
    "use strict";
    var e, t, a, r, n;
    e = function(e, t) {
        return "string" == typeof e && "string" == typeof t && e.toLowerCase() === t.toLowerCase()
    }, t = function(e, a, r) {
        var n = r || "0",
            o = e.toString();
        return o.length < a ? t(n + o, a) : o
    }, a = function(e) {
        var t, r;
        for (e = e || {}, t = 1; t < arguments.length; t++)
            if (r = arguments[t])
                for (var n in r) r.hasOwnProperty(n) && ("object" == typeof r[n] ? a(e[n], r[n]) : e[n] = r[n]);
        return e
    }, r = function(e, t) {
        for (var a = 0; a < t.length; a++)
            if (t[a].toLowerCase() === e.toLowerCase()) return a;
        return -1
    }, n = {
        dateSettings: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            meridiem: ["AM", "PM"],
            ordinal: function(e) {
                var t = e % 10,
                    a = {
                        1: "st",
                        2: "nd",
                        3: "rd"
                    };
                return 1 !== Math.floor(e % 100 / 10) && a[t] ? a[t] : "th"
            }
        },
        separators: /[ \-+\/\.T:@]/g,
        validParts: /[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,
        intParts: /[djwNzmnyYhHgGis]/g,
        tzParts: /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        tzClip: /[^-+\dA-Z]/g
    }, (DateFormatter = function(e) {
        var t = this,
            r = a(n, e);
        t.dateSettings = r.dateSettings, t.separators = r.separators, t.validParts = r.validParts, t.intParts = r.intParts, t.tzParts = r.tzParts, t.tzClip = r.tzClip
    }).prototype = {
        constructor: DateFormatter,
        getMonth: function(e) {
            var t;
            return 0 === (t = r(e, this.dateSettings.monthsShort) + 1) && (t = r(e, this.dateSettings.months) + 1), t
        },
        parseDate: function(t, a) {
            var r, n, o, i, s, u, d, l, f, c, m = this,
                h = !1,
                g = !1,
                p = m.dateSettings,
                D = {
                    date: null,
                    year: null,
                    month: null,
                    day: null,
                    hour: 0,
                    min: 0,
                    sec: 0
                };
            if (!t) return null;
            if (t instanceof Date) return t;
            if ("U" === a) return (o = parseInt(t)) ? new Date(1e3 * o) : t;
            switch (typeof t) {
                case "number":
                    return new Date(t);
                case "string":
                    break;
                default:
                    return null
            }
            if (!(r = a.match(m.validParts)) || 0 === r.length) throw new Error("Invalid date format definition.");
            for (n = t.replace(m.separators, "\0").split("\0"), o = 0; o < n.length; o++) switch (i = n[o], s = parseInt(i), r[o]) {
                case "y":
                case "Y":
                    if (!s) return null;
                    f = i.length, D.year = 2 === f ? parseInt((70 > s ? "20" : "19") + i) : s, h = !0;
                    break;
                case "m":
                case "n":
                case "M":
                case "F":
                    if (isNaN(s)) {
                        if (!((u = m.getMonth(i)) > 0)) return null;
                        D.month = u
                    } else {
                        if (!(s >= 1 && 12 >= s)) return null;
                        D.month = s
                    }
                    h = !0;
                    break;
                case "d":
                case "j":
                    if (!(s >= 1 && 31 >= s)) return null;
                    D.day = s, h = !0;
                    break;
                case "g":
                case "h":
                    if (c = n[d = r.indexOf("a") > -1 ? r.indexOf("a") : r.indexOf("A") > -1 ? r.indexOf("A") : -1], d > -1) l = e(c, p.meridiem[0]) ? 0 : e(c, p.meridiem[1]) ? 12 : -1, s >= 1 && 12 >= s && l > -1 ? D.hour = s + l - 1 : s >= 0 && 23 >= s && (D.hour = s);
                    else {
                        if (!(s >= 0 && 23 >= s)) return null;
                        D.hour = s
                    }
                    g = !0;
                    break;
                case "G":
                case "H":
                    if (!(s >= 0 && 23 >= s)) return null;
                    D.hour = s, g = !0;
                    break;
                case "i":
                    if (!(s >= 0 && 59 >= s)) return null;
                    D.min = s, g = !0;
                    break;
                case "s":
                    if (!(s >= 0 && 59 >= s)) return null;
                    D.sec = s, g = !0
            }
            if (!0 === h && D.year && D.month && D.day) D.date = new Date(D.year, D.month - 1, D.day, D.hour, D.min, D.sec, 0);
            else {
                if (!0 !== g) return null;
                D.date = new Date(0, 0, 0, D.hour, D.min, D.sec, 0)
            }
            return D.date
        },
        guessDate: function(e, t) {
            if ("string" != typeof e) return e;
            var a, r, n, o, i, s, u = e.replace(this.separators, "\0").split("\0"),
                d = t.match(this.validParts),
                l = new Date,
                f = 0;
            if (!/^[djmn]/g.test(d[0])) return e;
            for (n = 0; n < u.length; n++) {
                if (f = 2, i = u[n], s = parseInt(i.substr(0, 2)), isNaN(s)) return null;
                switch (n) {
                    case 0:
                        "m" === d[0] || "n" === d[0] ? l.setMonth(s - 1) : l.setDate(s);
                        break;
                    case 1:
                        "m" === d[0] || "n" === d[0] ? l.setDate(s) : l.setMonth(s - 1);
                        break;
                    case 2:
                        if (r = l.getFullYear(), f = 4 > (a = i.length) ? a : 4, !(r = parseInt(4 > a ? r.toString().substr(0, 4 - a) + i : i.substr(0, 4)))) return null;
                        l.setFullYear(r);
                        break;
                    case 3:
                        l.setHours(s);
                        break;
                    case 4:
                        l.setMinutes(s);
                        break;
                    case 5:
                        l.setSeconds(s)
                }(o = i.substr(f)).length > 0 && u.splice(n + 1, 0, o)
            }
            return l
        },
        parseFormat: function(e, a) {
            var r, n = this,
                o = n.dateSettings,
                i = /\\?(.?)/gi,
                s = function(e, t) {
                    return r[e] ? r[e]() : t
                };
            return r = {
                d: function() {
                    return t(r.j(), 2)
                },
                D: function() {
                    return o.daysShort[r.w()]
                },
                j: function() {
                    return a.getDate()
                },
                l: function() {
                    return o.days[r.w()]
                },
                N: function() {
                    return r.w() || 7
                },
                w: function() {
                    return a.getDay()
                },
                z: function() {
                    var e = new Date(r.Y(), r.n() - 1, r.j()),
                        t = new Date(r.Y(), 0, 1);
                    return Math.round((e - t) / 864e5)
                },
                W: function() {
                    var e = new Date(r.Y(), r.n() - 1, r.j() - r.N() + 3),
                        a = new Date(e.getFullYear(), 0, 4);
                    return t(1 + Math.round((e - a) / 864e5 / 7), 2)
                },
                F: function() {
                    return o.months[a.getMonth()]
                },
                m: function() {
                    return t(r.n(), 2)
                },
                M: function() {
                    return o.monthsShort[a.getMonth()]
                },
                n: function() {
                    return a.getMonth() + 1
                },
                t: function() {
                    return new Date(r.Y(), r.n(), 0).getDate()
                },
                L: function() {
                    var e = r.Y();
                    return e % 4 == 0 && e % 100 != 0 || e % 400 == 0 ? 1 : 0
                },
                o: function() {
                    var e = r.n(),
                        t = r.W();
                    return r.Y() + (12 === e && 9 > t ? 1 : 1 === e && t > 9 ? -1 : 0)
                },
                Y: function() {
                    return a.getFullYear()
                },
                y: function() {
                    return r.Y().toString().slice(-2)
                },
                a: function() {
                    return r.A().toLowerCase()
                },
                A: function() {
                    var e = r.G() < 12 ? 0 : 1;
                    return o.meridiem[e]
                },
                B: function() {
                    var e = 3600 * a.getUTCHours(),
                        r = 60 * a.getUTCMinutes(),
                        n = a.getUTCSeconds();
                    return t(Math.floor((e + r + n + 3600) / 86.4) % 1e3, 3)
                },
                g: function() {
                    return r.G() % 12 || 12
                },
                G: function() {
                    return a.getHours()
                },
                h: function() {
                    return t(r.g(), 2)
                },
                H: function() {
                    return t(r.G(), 2)
                },
                i: function() {
                    return t(a.getMinutes(), 2)
                },
                s: function() {
                    return t(a.getSeconds(), 2)
                },
                u: function() {
                    return t(1e3 * a.getMilliseconds(), 6)
                },
                e: function() {
                    return /\((.*)\)/.exec(String(a))[1] || "Coordinated Universal Time"
                },
                I: function() {
                    return new Date(r.Y(), 0) - Date.UTC(r.Y(), 0) != new Date(r.Y(), 6) - Date.UTC(r.Y(), 6) ? 1 : 0
                },
                O: function() {
                    var e = a.getTimezoneOffset(),
                        r = Math.abs(e);
                    return (e > 0 ? "-" : "+") + t(100 * Math.floor(r / 60) + r % 60, 4)
                },
                P: function() {
                    var e = r.O();
                    return e.substr(0, 3) + ":" + e.substr(3, 2)
                },
                T: function() {
                    return (String(a).match(n.tzParts) || [""]).pop().replace(n.tzClip, "") || "UTC"
                },
                Z: function() {
                    return 60 * -a.getTimezoneOffset()
                },
                c: function() {
                    return "Y-m-d\\TH:i:sP".replace(i, s)
                },
                r: function() {
                    return "D, d M Y H:i:s O".replace(i, s)
                },
                U: function() {
                    return a.getTime() / 1e3 || 0
                }
            }, s(e, e)
        },
        formatDate: function(e, t) {
            var a, r, n, o, i, s = this,
                u = "";
            if ("string" == typeof e && !(e = s.parseDate(e, t))) return null;
            if (e instanceof Date) {
                for (n = t.length, a = 0; n > a; a++) "S" !== (i = t.charAt(a)) && "\\" !== i && (a > 0 && "\\" === t.charAt(a - 1) ? u += i : (o = s.parseFormat(i, e), a !== n - 1 && s.intParts.test(i) && "S" === t.charAt(a + 1) && (r = parseInt(o) || 0, o += s.dateSettings.ordinal(r)), u += o));
                return u
            }
            return ""
        }
    }
}();
var datetimepickerFactory = function(e) {
    "use strict";
    var t = {
            i18n: {
                ar: {
                    months: ["كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"],
                    dayOfWeekShort: ["ن", "ث", "ع", "خ", "ج", "س", "ح"],
                    dayOfWeek: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"]
                },
                ro: {
                    months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
                    dayOfWeekShort: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
                    dayOfWeek: ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă"]
                },
                id: {
                    months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
                    dayOfWeekShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
                    dayOfWeek: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
                },
                is: {
                    months: ["Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"],
                    dayOfWeekShort: ["Sun", "Mán", "Þrið", "Mið", "Fim", "Fös", "Lau"],
                    dayOfWeek: ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur"]
                },
                bg: {
                    months: ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
                    dayOfWeekShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                    dayOfWeek: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"]
                },
                fa: {
                    months: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
                    dayOfWeekShort: ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"],
                    dayOfWeek: ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه", "یک‌شنبه"]
                },
                ru: {
                    months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                    dayOfWeekShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                    dayOfWeek: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
                },
                uk: {
                    months: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
                    dayOfWeekShort: ["Ндл", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"],
                    dayOfWeek: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]
                },
                en: {
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    dayOfWeekShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                },
                el: {
                    months: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
                    dayOfWeekShort: ["Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"],
                    dayOfWeek: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"]
                },
                de: {
                    months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                    dayOfWeekShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                    dayOfWeek: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
                },
                nl: {
                    months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
                    dayOfWeekShort: ["zo", "ma", "di", "wo", "do", "vr", "za"],
                    dayOfWeek: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
                },
                tr: {
                    months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
                    dayOfWeekShort: ["Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"],
                    dayOfWeek: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
                },
                fr: {
                    months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                    dayOfWeekShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                    dayOfWeek: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
                },
                es: {
                    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    dayOfWeekShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
                    dayOfWeek: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
                },
                th: {
                    months: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
                    dayOfWeekShort: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
                    dayOfWeek: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"]
                },
                pl: {
                    months: ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"],
                    dayOfWeekShort: ["nd", "pn", "wt", "śr", "cz", "pt", "sb"],
                    dayOfWeek: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"]
                },
                pt: {
                    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    dayOfWeekShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
                    dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
                },
                ch: {
                    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"]
                },
                se: {
                    months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
                    dayOfWeekShort: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"]
                },
                km: {
                    months: ["មករា​", "កុម្ភៈ", "មិនា​", "មេសា​", "ឧសភា​", "មិថុនា​", "កក្កដា​", "សីហា​", "កញ្ញា​", "តុលា​", "វិច្ឆិកា", "ធ្នូ​"],
                    dayOfWeekShort: ["អាទិ​", "ច័ន្ទ​", "អង្គារ​", "ពុធ​", "ព្រហ​​", "សុក្រ​", "សៅរ៍"],
                    dayOfWeek: ["អាទិត្យ​", "ច័ន្ទ​", "អង្គារ​", "ពុធ​", "ព្រហស្បតិ៍​", "សុក្រ​", "សៅរ៍"]
                },
                kr: {
                    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                    dayOfWeekShort: ["일", "월", "화", "수", "목", "금", "토"],
                    dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
                },
                it: {
                    months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
                    dayOfWeekShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
                    dayOfWeek: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]
                },
                da: {
                    months: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
                    dayOfWeekShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
                    dayOfWeek: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"]
                },
                no: {
                    months: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
                    dayOfWeekShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
                    dayOfWeek: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"]
                },
                ja: {
                    months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                    dayOfWeekShort: ["日", "月", "火", "水", "木", "金", "土"],
                    dayOfWeek: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"]
                },
                vi: {
                    months: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
                    dayOfWeekShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
                    dayOfWeek: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]
                },
                sl: {
                    months: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
                    dayOfWeekShort: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"],
                    dayOfWeek: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"]
                },
                cs: {
                    months: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
                    dayOfWeekShort: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"]
                },
                hu: {
                    months: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
                    dayOfWeekShort: ["Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"],
                    dayOfWeek: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"]
                },
                az: {
                    months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"],
                    dayOfWeekShort: ["B", "Be", "Ça", "Ç", "Ca", "C", "Ş"],
                    dayOfWeek: ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"]
                },
                bs: {
                    months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
                    dayOfWeekShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
                    dayOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
                },
                ca: {
                    months: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
                    dayOfWeekShort: ["Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"],
                    dayOfWeek: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"]
                },
                "en-GB": {
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    dayOfWeekShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                },
                et: {
                    months: ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"],
                    dayOfWeekShort: ["P", "E", "T", "K", "N", "R", "L"],
                    dayOfWeek: ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"]
                },
                eu: {
                    months: ["Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua"],
                    dayOfWeekShort: ["Ig.", "Al.", "Ar.", "Az.", "Og.", "Or.", "La."],
                    dayOfWeek: ["Igandea", "Astelehena", "Asteartea", "Asteazkena", "Osteguna", "Ostirala", "Larunbata"]
                },
                fi: {
                    months: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"],
                    dayOfWeekShort: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
                    dayOfWeek: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"]
                },
                gl: {
                    months: ["Xan", "Feb", "Maz", "Abr", "Mai", "Xun", "Xul", "Ago", "Set", "Out", "Nov", "Dec"],
                    dayOfWeekShort: ["Dom", "Lun", "Mar", "Mer", "Xov", "Ven", "Sab"],
                    dayOfWeek: ["Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado"]
                },
                hr: {
                    months: ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"],
                    dayOfWeekShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
                    dayOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
                },
                ko: {
                    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                    dayOfWeekShort: ["일", "월", "화", "수", "목", "금", "토"],
                    dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
                },
                lt: {
                    months: ["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"],
                    dayOfWeekShort: ["Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "Šeš"],
                    dayOfWeek: ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"]
                },
                lv: {
                    months: ["Janvāris", "Februāris", "Marts", "Aprīlis ", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"],
                    dayOfWeekShort: ["Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "St"],
                    dayOfWeek: ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"]
                },
                mk: {
                    months: ["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"],
                    dayOfWeekShort: ["нед", "пон", "вто", "сре", "чет", "пет", "саб"],
                    dayOfWeek: ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"]
                },
                mn: {
                    months: ["1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"],
                    dayOfWeekShort: ["Дав", "Мяг", "Лха", "Пүр", "Бсн", "Бям", "Ням"],
                    dayOfWeek: ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба", "Ням"]
                },
                "pt-BR": {
                    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    dayOfWeekShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                    dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
                },
                sk: {
                    months: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"],
                    dayOfWeekShort: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"],
                    dayOfWeek: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"]
                },
                sq: {
                    months: ["Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"],
                    dayOfWeekShort: ["Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Shtu"],
                    dayOfWeek: ["E Diel", "E Hënë", "E Martē", "E Mërkurë", "E Enjte", "E Premte", "E Shtunë"]
                },
                "sr-YU": {
                    months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
                    dayOfWeekShort: ["Ned", "Pon", "Uto", "Sre", "čet", "Pet", "Sub"],
                    dayOfWeek: ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"]
                },
                sr: {
                    months: ["јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"],
                    dayOfWeekShort: ["нед", "пон", "уто", "сре", "чет", "пет", "суб"],
                    dayOfWeek: ["Недеља", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"]
                },
                sv: {
                    months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
                    dayOfWeekShort: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
                    dayOfWeek: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
                },
                "zh-TW": {
                    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
                    dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
                },
                zh: {
                    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    dayOfWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
                    dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
                },
                ug: {
                    months: ["1-ئاي", "2-ئاي", "3-ئاي", "4-ئاي", "5-ئاي", "6-ئاي", "7-ئاي", "8-ئاي", "9-ئاي", "10-ئاي", "11-ئاي", "12-ئاي"],
                    dayOfWeek: ["يەكشەنبە", "دۈشەنبە", "سەيشەنبە", "چارشەنبە", "پەيشەنبە", "جۈمە", "شەنبە"]
                },
                he: {
                    months: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
                    dayOfWeekShort: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת"],
                    dayOfWeek: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת", "ראשון"]
                },
                hy: {
                    months: ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"],
                    dayOfWeekShort: ["Կի", "Երկ", "Երք", "Չոր", "Հնգ", "Ուրբ", "Շբթ"],
                    dayOfWeek: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"]
                },
                kg: {
                    months: ["Үчтүн айы", "Бирдин айы", "Жалган Куран", "Чын Куран", "Бугу", "Кулжа", "Теке", "Баш Оона", "Аяк Оона", "Тогуздун айы", "Жетинин айы", "Бештин айы"],
                    dayOfWeekShort: ["Жек", "Дүй", "Шей", "Шар", "Бей", "Жум", "Ише"],
                    dayOfWeek: ["Жекшемб", "Дүйшөмб", "Шейшемб", "Шаршемб", "Бейшемби", "Жума", "Ишенб"]
                },
                rm: {
                    months: ["Schaner", "Favrer", "Mars", "Avrigl", "Matg", "Zercladur", "Fanadur", "Avust", "Settember", "October", "November", "December"],
                    dayOfWeekShort: ["Du", "Gli", "Ma", "Me", "Gie", "Ve", "So"],
                    dayOfWeek: ["Dumengia", "Glindesdi", "Mardi", "Mesemna", "Gievgia", "Venderdi", "Sonda"]
                },
                ka: {
                    months: ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"],
                    dayOfWeekShort: ["კვ", "ორშ", "სამშ", "ოთხ", "ხუთ", "პარ", "შაბ"],
                    dayOfWeek: ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"]
                }
            },
            ownerDocument: document,
            contentWindow: window,
            value: "",
            rtl: !1,
            format: "d-m-Y H:i",
            formatTime: "H:i",
            formatDate: "d-m-Y",
            startDate: !1,
            step: 60,
            monthChangeSpinner: !0,
            closeOnDateSelect: !1,
            closeOnTimeSelect: !0,
            closeOnWithoutClick: !0,
            closeOnInputClick: !0,
            openOnFocus: !0,
            timepicker: !0,
            datepicker: !0,
            weeks: !1,
            defaultTime: !1,
            defaultDate: !1,
            minDate: !1,
            maxDate: !1,
            minTime: !1,
            maxTime: !1,
            minDateTime: !1,
            maxDateTime: !1,
            allowTimes: [],
            opened: !1,
            initTime: !0,
            inline: !1,
            theme: "",
            touchMovedThreshold: 5,
            onSelectDate: function() {},
            onSelectTime: function() {},
            onChangeMonth: function() {},
            onGetWeekOfYear: function() {},
            onChangeYear: function() {},
            onChangeDateTime: function() {},
            onShow: function() {},
            onClose: function() {},
            onGenerate: function() {},
            withoutCopyright: !0,
            inverseButton: !1,
            hours12: !1,
            next: "xdsoft_next",
            prev: "xdsoft_prev",
            dayOfWeekStart: 0,
            parentID: "body",
            timeHeightInTimePicker: 25,
            timepickerScrollbar: !0,
            todayButton: !0,
            prevButton: !0,
            nextButton: !0,
            defaultSelect: !0,
            scrollMonth: !0,
            scrollTime: !0,
            scrollInput: !0,
            lazyInit: !1,
            mask: !1,
            validateOnBlur: !0,
            allowBlank: !0,
            yearStart: 1950,
            yearEnd: 2050,
            monthStart: 0,
            monthEnd: 11,
            style: "",
            id: "",
            fixed: !1,
            roundTime: "round",
            className: "",
            weekends: [],
            highlightedDates: [],
            highlightedPeriods: [],
            allowDates: [],
            allowDateRe: null,
            disabledDates: [],
            disabledWeekDays: [],
            yearOffset: 0,
            beforeShowDay: null,
            enterLikeTab: !0,
            showApplyButton: !1
        },
        a = null,
        r = null,
        n = "en",
        o = {
            meridiem: ["AM", "PM"]
        },
        i = function() {
            var i = t.i18n[n],
                s = {
                    days: i.dayOfWeek,
                    daysShort: i.dayOfWeekShort,
                    months: i.months,
                    monthsShort: e.map(i.months, function(e) {
                        return e.substring(0, 3)
                    })
                };
            "function" == typeof DateFormatter && (a = r = new DateFormatter({
                dateSettings: e.extend({}, o, s)
            }))
        },
        s = {
            moment: {
                default_options: {
                    format: "YYYY/MM/DD HH:mm",
                    formatDate: "YYYY/MM/DD",
                    formatTime: "HH:mm"
                },
                formatter: {
                    parseDate: function(e, t) {
                        if (d(t)) return r.parseDate(e, t);
                        var a = moment(e, t);
                        return !!a.isValid() && a.toDate()
                    },
                    formatDate: function(e, t) {
                        return d(t) ? r.formatDate(e, t) : moment(e).format(t)
                    },
                    formatMask: function(e) {
                        return e.replace(/Y{4}/g, "9999").replace(/Y{2}/g, "99").replace(/M{2}/g, "19").replace(/D{2}/g, "39").replace(/H{2}/g, "29").replace(/m{2}/g, "59").replace(/s{2}/g, "59")
                    }
                }
            }
        };
    e.datetimepicker = {
        setLocale: function(e) {
            var a = t.i18n[e] ? e : "en";
            n !== a && (n = a, i())
        },
        setDateFormatter: function(r) {
            if ("string" == typeof r && s.hasOwnProperty(r)) {
                var n = s[r];
                e.extend(t, n.default_options), a = n.formatter
            } else a = r
        }
    };
    var u = {
            RFC_2822: "D, d M Y H:i:s O",
            ATOM: "Y-m-dTH:i:sP",
            ISO_8601: "Y-m-dTH:i:sO",
            RFC_822: "D, d M y H:i:s O",
            RFC_850: "l, d-M-y H:i:s T",
            RFC_1036: "D, d M y H:i:s O",
            RFC_1123: "D, d M Y H:i:s O",
            RSS: "D, d M Y H:i:s O",
            W3C: "Y-m-dTH:i:sP"
        },
        d = function(e) {
            return -1 !== Object.values(u).indexOf(e)
        };

    function l(e, t, a) {
        this.date = e, this.desc = t, this.style = a
    }
    e.extend(e.datetimepicker, u), i(), window.getComputedStyle || (window.getComputedStyle = function(e) {
        return this.el = e, this.getPropertyValue = function(t) {
            var a = /(-([a-z]))/g;
            return "float" === t && (t = "styleFloat"), a.test(t) && (t = t.replace(a, function(e, t, a) {
                return a.toUpperCase()
            })), e.currentStyle[t] || null
        }, this
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
        var a, r;
        for (a = t || 0, r = this.length; a < r; a += 1)
            if (this[a] === e) return a;
        return -1
    }), Date.prototype.countDaysInMonth = function() {
        return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate()
    }, e.fn.xdsoftScroller = function(t, a) {
        return this.each(function() {
            var r, n, o, i, s, u = e(this),
                d = function(e) {
                    var t, a = {
                        x: 0,
                        y: 0
                    };
                    return "touchstart" === e.type || "touchmove" === e.type || "touchend" === e.type || "touchcancel" === e.type ? (t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0], a.x = t.clientX, a.y = t.clientY) : "mousedown" !== e.type && "mouseup" !== e.type && "mousemove" !== e.type && "mouseover" !== e.type && "mouseout" !== e.type && "mouseenter" !== e.type && "mouseleave" !== e.type || (a.x = e.clientX, a.y = e.clientY), a
                },
                l = 100,
                f = !1,
                c = 0,
                m = 0,
                h = 0,
                g = !1,
                p = 0,
                D = function() {};
            "hide" !== a ? (e(this).hasClass("xdsoft_scroller_box") || (r = u.children().eq(0), n = u[0].clientHeight, o = r[0].offsetHeight, i = e('<div class="xdsoft_scrollbar"></div>'), s = e('<div class="xdsoft_scroller"></div>'), i.append(s), u.addClass("xdsoft_scroller_box").append(i), D = function(e) {
                var t = d(e).y - c + p;
                t < 0 && (t = 0), t + s[0].offsetHeight > h && (t = h - s[0].offsetHeight), u.trigger("scroll_element.xdsoft_scroller", [l ? t / l : 0])
            }, s.on("touchstart.xdsoft_scroller mousedown.xdsoft_scroller", function(r) {
                n || u.trigger("resize_scroll.xdsoft_scroller", [a]), c = d(r).y, p = parseInt(s.css("margin-top"), 10), h = i[0].offsetHeight, "mousedown" === r.type || "touchstart" === r.type ? (t.ownerDocument && e(t.ownerDocument.body).addClass("xdsoft_noselect"), e([t.ownerDocument.body, t.contentWindow]).on("touchend mouseup.xdsoft_scroller", function a() {
                    e([t.ownerDocument.body, t.contentWindow]).off("touchend mouseup.xdsoft_scroller", a).off("mousemove.xdsoft_scroller", D).removeClass("xdsoft_noselect")
                }), e(t.ownerDocument.body).on("mousemove.xdsoft_scroller", D)) : (g = !0, r.stopPropagation(), r.preventDefault())
            }).on("touchmove", function(e) {
                g && (e.preventDefault(), D(e))
            }).on("touchend touchcancel", function() {
                g = !1, p = 0
            }), u.on("scroll_element.xdsoft_scroller", function(e, t) {
                n || u.trigger("resize_scroll.xdsoft_scroller", [t, !0]), t = t > 1 ? 1 : t < 0 || isNaN(t) ? 0 : t, s.css("margin-top", l * t), setTimeout(function() {
                    r.css("marginTop", -parseInt((r[0].offsetHeight - n) * t, 10))
                }, 10)
            }).on("resize_scroll.xdsoft_scroller", function(e, t, a) {
                var d, f;
                n = u[0].clientHeight, o = r[0].offsetHeight, f = (d = n / o) * i[0].offsetHeight, d > 1 ? s.hide() : (s.show(), s.css("height", parseInt(f > 10 ? f : 10, 10)), l = i[0].offsetHeight - s[0].offsetHeight, !0 !== a && u.trigger("scroll_element.xdsoft_scroller", [t || Math.abs(parseInt(r.css("marginTop"), 10)) / (o - n)]))
            }), u.on("mousewheel", function(e) {
                var t = Math.abs(parseInt(r.css("marginTop"), 10));
                return (t -= 20 * e.deltaY) < 0 && (t = 0), u.trigger("scroll_element.xdsoft_scroller", [t / (o - n)]), e.stopPropagation(), !1
            }), u.on("touchstart", function(e) {
                f = d(e), m = Math.abs(parseInt(r.css("marginTop"), 10))
            }), u.on("touchmove", function(e) {
                if (f) {
                    e.preventDefault();
                    var t = d(e);
                    u.trigger("scroll_element.xdsoft_scroller", [(m - (t.y - f.y)) / (o - n)])
                }
            }), u.on("touchend touchcancel", function() {
                f = !1, m = 0
            })), u.trigger("resize_scroll.xdsoft_scroller", [a])) : u.find(".xdsoft_scrollbar").hide()
        })
    }, e.fn.datetimepicker = function(r, o) {
        var i, s, u = this,
            d = 48,
            f = 57,
            c = 96,
            m = 105,
            h = 17,
            g = 46,
            p = 13,
            D = 27,
            v = 8,
            y = 37,
            b = 38,
            k = 39,
            x = 40,
            T = 9,
            S = 116,
            M = 65,
            w = 67,
            O = 86,
            W = 90,
            _ = 89,
            F = !1,
            C = e.isPlainObject(r) || !r ? e.extend(!0, {}, t, r) : e.extend(!0, {}, t),
            P = 0;
        return i = function(t) {
            var o, i, s, u, P, Y, A = e('<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'),
                H = e('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),
                j = e('<div class="xdsoft_datepicker active"></div>'),
                J = e('<div class="xdsoft_monthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button><div class="xdsoft_label xdsoft_month"><span></span><i></i></div><div class="xdsoft_label xdsoft_year"><span></span><i></i></div><button type="button" class="xdsoft_next"></button></div>'),
                z = e('<div class="xdsoft_calendar"></div>'),
                I = e('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),
                N = I.find(".xdsoft_time_box").eq(0),
                L = e('<div class="xdsoft_time_variant"></div>'),
                E = e('<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'),
                R = e('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),
                V = e('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),
                B = !1,
                G = 0;
            C.id && A.attr("id", C.id), C.style && A.attr("style", C.style), C.weeks && A.addClass("xdsoft_showweeks"), C.rtl && A.addClass("xdsoft_rtl"), A.addClass("xdsoft_" + C.theme), A.addClass(C.className), J.find(".xdsoft_month span").after(R), J.find(".xdsoft_year span").after(V), J.find(".xdsoft_month,.xdsoft_year").on("touchstart mousedown.xdsoft", function(t) {
                var a, r, n = e(this).find(".xdsoft_select").eq(0),
                    o = 0,
                    i = 0,
                    s = n.is(":visible");
                for (J.find(".xdsoft_select").hide(), P.currentTime && (o = P.currentTime[e(this).hasClass("xdsoft_month") ? "getMonth" : "getFullYear"]()), n[s ? "hide" : "show"](), a = n.find("div.xdsoft_option"), r = 0; r < a.length && a.eq(r).data("value") !== o; r += 1) i += a[0].offsetHeight;
                return n.xdsoftScroller(C, i / (n.children()[0].offsetHeight - n[0].clientHeight)), t.stopPropagation(), !1
            });
            var U = function(e) {
                var t = e.originalEvent,
                    a = t.touches ? t.touches[0] : t;
                this.touchStartPosition = this.touchStartPosition || a;
                var r = Math.abs(this.touchStartPosition.clientX - a.clientX),
                    n = Math.abs(this.touchStartPosition.clientY - a.clientY);
                Math.sqrt(r * r + n * n) > C.touchMovedThreshold && (this.touchMoved = !0)
            };

            function q() {
                var e, a = !1;
                return C.startDate ? a = P.strToDate(C.startDate) : (a = C.value || (t && t.val && t.val() ? t.val() : "")) ? (a = P.strToDateTime(a), C.yearOffset && (a = new Date(a.getFullYear() - C.yearOffset, a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds()))) : C.defaultDate && (a = P.strToDateTime(C.defaultDate), C.defaultTime && (e = P.strtotime(C.defaultTime), a.setHours(e.getHours()), a.setMinutes(e.getMinutes()))), a && P.isValidDate(a) ? A.data("changed", !0) : a = "", a || 0
            }

            function X(r) {
                var n = function(e, t) {
                        var a = e.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, "\\$1").replace(/_/g, "{digit+}").replace(/([0-9]{1})/g, "{digit$1}").replace(/\{digit([0-9]{1})\}/g, "[0-$1_]{1}").replace(/\{digit[\+]\}/g, "[0-9_]{1}");
                        return new RegExp(a).test(t)
                    },
                    o = function(e, t) {
                        if (!(e = "string" == typeof e || e instanceof String ? r.ownerDocument.getElementById(e) : e)) return !1;
                        if (e.createTextRange) {
                            var a = e.createTextRange();
                            return a.collapse(!0), a.moveEnd("character", t), a.moveStart("character", t), a.select(), !0
                        }
                        return !!e.setSelectionRange && (e.setSelectionRange(t, t), !0)
                    };
                r.mask && t.off("keydown.xdsoft"), !0 === r.mask && (a.formatMask ? r.mask = a.formatMask(r.format) : r.mask = r.format.replace(/Y/g, "9999").replace(/F/g, "9999").replace(/m/g, "19").replace(/d/g, "39").replace(/H/g, "29").replace(/i/g, "59").replace(/s/g, "59")), "string" === e.type(r.mask) && (n(r.mask, t.val()) || (t.val(r.mask.replace(/[0-9]/g, "_")), o(t[0], 0)), t.on("paste.xdsoft", function(a) {
                    var i = (a.clipboardData || a.originalEvent.clipboardData || window.clipboardData).getData("text"),
                        s = this.value,
                        u = this.selectionStart,
                        d = s.substr(0, u),
                        l = s.substr(u + i.length);
                    return s = d + i + l, u += i.length, n(r.mask, s) ? (this.value = s, o(this, u)) : "" === e.trim(s) ? this.value = r.mask.replace(/[0-9]/g, "_") : t.trigger("error_input.xdsoft"), a.preventDefault(), !1
                }), t.on("keydown.xdsoft", function(a) {
                    var i, s = this.value,
                        u = a.which,
                        l = this.selectionStart,
                        C = this.selectionEnd,
                        P = l !== C;
                    if (u >= d && u <= f || u >= c && u <= m || u === v || u === g) {
                        for (i = u === v || u === g ? "_" : String.fromCharCode(c <= u && u <= m ? u - d : u), u === v && l && !P && (l -= 1);;) {
                            var Y = r.mask.substr(l, 1),
                                A = l < r.mask.length,
                                H = l > 0;
                            if (!(/[^0-9_]/.test(Y) && A && H)) break;
                            l += u !== v || P ? 1 : -1
                        }
                        if (P) {
                            var j = C - l,
                                J = r.mask.replace(/[0-9]/g, "_"),
                                z = J.substr(l, j).substr(1),
                                I = s.substr(0, l),
                                N = i + z,
                                L = s.substr(l + j);
                            s = I + N + L
                        } else {
                            var E = s.substr(0, l),
                                R = i,
                                V = s.substr(l + 1);
                            s = E + R + V
                        }
                        if ("" === e.trim(s)) s = J;
                        else if (l === r.mask.length) return a.preventDefault(), !1;
                        for (l += u === v ? 0 : 1;
                            /[^0-9_]/.test(r.mask.substr(l, 1)) && l < r.mask.length && l > 0;) l += u === v ? 0 : 1;
                        n(r.mask, s) ? (this.value = s, o(this, l)) : "" === e.trim(s) ? this.value = r.mask.replace(/[0-9]/g, "_") : t.trigger("error_input.xdsoft")
                    } else if (-1 !== [M, w, O, W, _].indexOf(u) && F || -1 !== [D, b, x, y, k, S, h, T, p].indexOf(u)) return !0;
                    return a.preventDefault(), !1
                }))
            }
            J.find(".xdsoft_select").xdsoftScroller(C).on("touchstart mousedown.xdsoft", function(e) {
                var t = e.originalEvent;
                this.touchMoved = !1, this.touchStartPosition = t.touches ? t.touches[0] : t, e.stopPropagation(), e.preventDefault()
            }).on("touchmove", ".xdsoft_option", U).on("touchend mousedown.xdsoft", ".xdsoft_option", function() {
                if (!this.touchMoved) {
                    void 0 !== P.currentTime && null !== P.currentTime || (P.currentTime = P.now());
                    var t = P.currentTime.getFullYear();
                    P && P.currentTime && P.currentTime[e(this).parent().parent().hasClass("xdsoft_monthselect") ? "setMonth" : "setFullYear"](e(this).data("value")), e(this).parent().parent().hide(), A.trigger("xchange.xdsoft"), C.onChangeMonth && e.isFunction(C.onChangeMonth) && C.onChangeMonth.call(A, P.currentTime, A.data("input")), t !== P.currentTime.getFullYear() && e.isFunction(C.onChangeYear) && C.onChangeYear.call(A, P.currentTime, A.data("input"))
                }
            }), A.getValue = function() {
                return P.getCurrentTime()
            }, A.setOptions = function(r) {
                var n = {};
                C = e.extend(!0, {}, C, r), r.allowTimes && e.isArray(r.allowTimes) && r.allowTimes.length && (C.allowTimes = e.extend(!0, [], r.allowTimes)), r.weekends && e.isArray(r.weekends) && r.weekends.length && (C.weekends = e.extend(!0, [], r.weekends)), r.allowDates && e.isArray(r.allowDates) && r.allowDates.length && (C.allowDates = e.extend(!0, [], r.allowDates)), r.allowDateRe && "[object String]" === Object.prototype.toString.call(r.allowDateRe) && (C.allowDateRe = new RegExp(r.allowDateRe)), r.highlightedDates && e.isArray(r.highlightedDates) && r.highlightedDates.length && (e.each(r.highlightedDates, function(t, r) {
                    var o, i = e.map(r.split(","), e.trim),
                        s = new l(a.parseDate(i[0], C.formatDate), i[1], i[2]),
                        u = a.formatDate(s.date, C.formatDate);
                    void 0 !== n[u] ? (o = n[u].desc) && o.length && s.desc && s.desc.length && (n[u].desc = o + "\n" + s.desc) : n[u] = s
                }), C.highlightedDates = e.extend(!0, [], n)), r.highlightedPeriods && e.isArray(r.highlightedPeriods) && r.highlightedPeriods.length && (n = e.extend(!0, [], C.highlightedDates), e.each(r.highlightedPeriods, function(t, r) {
                    var o, i, s, u, d, f, c;
                    if (e.isArray(r)) o = r[0], i = r[1], s = r[2], c = r[3];
                    else {
                        var m = e.map(r.split(","), e.trim);
                        o = a.parseDate(m[0], C.formatDate), i = a.parseDate(m[1], C.formatDate), s = m[2], c = m[3]
                    }
                    for (; o <= i;) u = new l(o, s, c), d = a.formatDate(o, C.formatDate), o.setDate(o.getDate() + 1), void 0 !== n[d] ? (f = n[d].desc) && f.length && u.desc && u.desc.length && (n[d].desc = f + "\n" + u.desc) : n[d] = u
                }), C.highlightedDates = e.extend(!0, [], n)), r.disabledDates && e.isArray(r.disabledDates) && r.disabledDates.length && (C.disabledDates = e.extend(!0, [], r.disabledDates)), r.disabledWeekDays && e.isArray(r.disabledWeekDays) && r.disabledWeekDays.length && (C.disabledWeekDays = e.extend(!0, [], r.disabledWeekDays)), !C.open && !C.opened || C.inline || t.trigger("open.xdsoft"), C.inline && (B = !0, A.addClass("xdsoft_inline"), t.after(A).hide()), C.inverseButton && (C.next = "xdsoft_prev", C.prev = "xdsoft_next"), C.datepicker ? j.addClass("active") : j.removeClass("active"), C.timepicker ? I.addClass("active") : I.removeClass("active"), C.value && (P.setCurrentTime(C.value), t && t.val && t.val(P.str)), isNaN(C.dayOfWeekStart) ? C.dayOfWeekStart = 0 : C.dayOfWeekStart = parseInt(C.dayOfWeekStart, 10) % 7, C.timepickerScrollbar || N.xdsoftScroller(C, "hide"), C.minDate && /^[\+\-](.*)$/.test(C.minDate) && (C.minDate = a.formatDate(P.strToDateTime(C.minDate), C.formatDate)), C.maxDate && /^[\+\-](.*)$/.test(C.maxDate) && (C.maxDate = a.formatDate(P.strToDateTime(C.maxDate), C.formatDate)), C.minDateTime && /^\+(.*)$/.test(C.minDateTime) && (C.minDateTime = P.strToDateTime(C.minDateTime).dateFormat(C.formatDate)), C.maxDateTime && /^\+(.*)$/.test(C.maxDateTime) && (C.maxDateTime = P.strToDateTime(C.maxDateTime).dateFormat(C.formatDate)), E.toggle(C.showApplyButton), J.find(".xdsoft_today_button").css("visibility", C.todayButton ? "visible" : "hidden"), J.find("." + C.prev).css("visibility", C.prevButton ? "visible" : "hidden"), J.find("." + C.next).css("visibility", C.nextButton ? "visible" : "hidden"), X(C), C.validateOnBlur && t.off("blur.xdsoft").on("blur.xdsoft", function() {
                    if (C.allowBlank && (!e.trim(e(this).val()).length || "string" == typeof C.mask && e.trim(e(this).val()) === C.mask.replace(/[0-9]/g, "_"))) e(this).val(null), A.data("xdsoft_datetime").empty();
                    else {
                        var t = a.parseDate(e(this).val(), C.format);
                        if (t) e(this).val(a.formatDate(t, C.format));
                        else {
                            var r = +[e(this).val()[0], e(this).val()[1]].join(""),
                                n = +[e(this).val()[2], e(this).val()[3]].join("");
                            !C.datepicker && C.timepicker && r >= 0 && r < 24 && n >= 0 && n < 60 ? e(this).val([r, n].map(function(e) {
                                return e > 9 ? e : "0" + e
                            }).join(":")) : e(this).val(a.formatDate(P.now(), C.format))
                        }
                        A.data("xdsoft_datetime").setCurrentTime(e(this).val())
                    }
                    A.trigger("changedatetime.xdsoft"), A.trigger("close.xdsoft")
                }), C.dayOfWeekStartPrev = 0 === C.dayOfWeekStart ? 6 : C.dayOfWeekStart - 1, A.trigger("xchange.xdsoft").trigger("afterOpen.xdsoft")
            }, A.data("options", C).on("touchstart mousedown.xdsoft", function(e) {
                return e.stopPropagation(), e.preventDefault(), V.hide(), R.hide(), !1
            }), N.append(L), N.xdsoftScroller(C), A.on("afterOpen.xdsoft", function() {
                N.xdsoftScroller(C)
            }), A.append(j).append(I), !0 !== C.withoutCopyright && A.append(H), j.append(J).append(z).append(E), e(C.parentID).append(A), P = new function() {
                var t = this;
                t.now = function(e) {
                    var a, r, n = new Date;
                    return !e && C.defaultDate && (a = t.strToDateTime(C.defaultDate), n.setFullYear(a.getFullYear()), n.setMonth(a.getMonth()), n.setDate(a.getDate())), n.setFullYear(n.getFullYear()), !e && C.defaultTime && (r = t.strtotime(C.defaultTime), n.setHours(r.getHours()), n.setMinutes(r.getMinutes()), n.setSeconds(r.getSeconds()), n.setMilliseconds(r.getMilliseconds())), n
                }, t.isValidDate = function(e) {
                    return "[object Date]" === Object.prototype.toString.call(e) && !isNaN(e.getTime())
                }, t.setCurrentTime = function(e, a) {
                    "string" == typeof e ? t.currentTime = t.strToDateTime(e) : t.isValidDate(e) ? t.currentTime = e : e || a || !C.allowBlank || C.inline ? t.currentTime = t.now() : t.currentTime = null, A.trigger("xchange.xdsoft")
                }, t.empty = function() {
                    t.currentTime = null
                }, t.getCurrentTime = function() {
                    return t.currentTime
                }, t.nextMonth = function() {
                    void 0 !== t.currentTime && null !== t.currentTime || (t.currentTime = t.now());
                    var a, r = t.currentTime.getMonth() + 1;
                    return 12 === r && (t.currentTime.setFullYear(t.currentTime.getFullYear() + 1), r = 0), a = t.currentTime.getFullYear(), t.currentTime.setDate(Math.min(new Date(t.currentTime.getFullYear(), r + 1, 0).getDate(), t.currentTime.getDate())), t.currentTime.setMonth(r), C.onChangeMonth && e.isFunction(C.onChangeMonth) && C.onChangeMonth.call(A, P.currentTime, A.data("input")), a !== t.currentTime.getFullYear() && e.isFunction(C.onChangeYear) && C.onChangeYear.call(A, P.currentTime, A.data("input")), A.trigger("xchange.xdsoft"), r
                }, t.prevMonth = function() {
                    void 0 !== t.currentTime && null !== t.currentTime || (t.currentTime = t.now());
                    var a = t.currentTime.getMonth() - 1;
                    return -1 === a && (t.currentTime.setFullYear(t.currentTime.getFullYear() - 1), a = 11), t.currentTime.setDate(Math.min(new Date(t.currentTime.getFullYear(), a + 1, 0).getDate(), t.currentTime.getDate())), t.currentTime.setMonth(a), C.onChangeMonth && e.isFunction(C.onChangeMonth) && C.onChangeMonth.call(A, P.currentTime, A.data("input")), A.trigger("xchange.xdsoft"), a
                }, t.getWeekOfYear = function(t) {
                    if (C.onGetWeekOfYear && e.isFunction(C.onGetWeekOfYear)) {
                        var a = C.onGetWeekOfYear.call(A, t);
                        if (void 0 !== a) return a
                    }
                    var r = new Date(t.getFullYear(), 0, 1);
                    return 4 !== r.getDay() && r.setMonth(0, 1 + (4 - r.getDay() + 7) % 7), Math.ceil(((t - r) / 864e5 + r.getDay() + 1) / 7)
                }, t.strToDateTime = function(e) {
                    var r, n, o = [];
                    return e && e instanceof Date && t.isValidDate(e) ? e : ((o = /^([+-]{1})(.*)$/.exec(e)) && (o[2] = a.parseDate(o[2], C.formatDate)), o && o[2] ? (r = o[2].getTime() - 6e4 * o[2].getTimezoneOffset(), n = new Date(t.now(!0).getTime() + parseInt(o[1] + "1", 10) * r)) : n = e ? a.parseDate(e, C.format) : t.now(), t.isValidDate(n) || (n = t.now()), n)
                }, t.strToDate = function(e) {
                    if (e && e instanceof Date && t.isValidDate(e)) return e;
                    var r = e ? a.parseDate(e, C.formatDate) : t.now(!0);
                    return t.isValidDate(r) || (r = t.now(!0)), r
                }, t.strtotime = function(e) {
                    if (e && e instanceof Date && t.isValidDate(e)) return e;
                    var r = e ? a.parseDate(e, C.formatTime) : t.now(!0);
                    return t.isValidDate(r) || (r = t.now(!0)), r
                }, t.str = function() {
                    var e = C.format;
                    return C.yearOffset && (e = (e = e.replace("Y", t.currentTime.getFullYear() + C.yearOffset)).replace("y", String(t.currentTime.getFullYear() + C.yearOffset).substring(2, 4))), a.formatDate(t.currentTime, e)
                }, t.currentTime = this.now()
            }, E.on("touchend click", function(e) {
                e.preventDefault(), A.data("changed", !0), P.setCurrentTime(q()), t.val(P.str()), A.trigger("close.xdsoft")
            }), J.find(".xdsoft_today_button").on("touchend mousedown.xdsoft", function() {
                A.data("changed", !0), P.setCurrentTime(0, !0), A.trigger("afterOpen.xdsoft")
            }).on("dblclick.xdsoft", function() {
                var e, a, r = P.getCurrentTime();
                r = new Date(r.getFullYear(), r.getMonth(), r.getDate()), e = P.strToDate(C.minDate), r < (e = new Date(e.getFullYear(), e.getMonth(), e.getDate())) || (a = P.strToDate(C.maxDate), r > (a = new Date(a.getFullYear(), a.getMonth(), a.getDate())) || (t.val(P.str()), t.trigger("change"), A.trigger("close.xdsoft")))
            }), J.find(".xdsoft_prev,.xdsoft_next").on("touchend mousedown.xdsoft", function() {
                var t = e(this),
                    a = 0,
                    r = !1;
                ! function e(n) {
                    t.hasClass(C.next) ? P.nextMonth() : t.hasClass(C.prev) && P.prevMonth(), C.monthChangeSpinner && (r || (a = setTimeout(e, n || 100)))
                }(500), e([C.ownerDocument.body, C.contentWindow]).on("touchend mouseup.xdsoft", function t() {
                    clearTimeout(a), r = !0, e([C.ownerDocument.body, C.contentWindow]).off("touchend mouseup.xdsoft", t)
                })
            }), I.find(".xdsoft_prev,.xdsoft_next").on("touchend mousedown.xdsoft", function() {
                var t = e(this),
                    a = 0,
                    r = !1,
                    n = 110;
                ! function e(o) {
                    var i = N[0].clientHeight,
                        s = L[0].offsetHeight,
                        u = Math.abs(parseInt(L.css("marginTop"), 10));
                    t.hasClass(C.next) && s - i - C.timeHeightInTimePicker >= u ? L.css("marginTop", "-" + (u + C.timeHeightInTimePicker) + "px") : t.hasClass(C.prev) && u - C.timeHeightInTimePicker >= 0 && L.css("marginTop", "-" + (u - C.timeHeightInTimePicker) + "px"), N.trigger("scroll_element.xdsoft_scroller", [Math.abs(parseInt(L[0].style.marginTop, 10) / (s - i))]), n = n > 10 ? 10 : n - 10, r || (a = setTimeout(e, o || n))
                }(500), e([C.ownerDocument.body, C.contentWindow]).on("touchend mouseup.xdsoft", function t() {
                    clearTimeout(a), r = !0, e([C.ownerDocument.body, C.contentWindow]).off("touchend mouseup.xdsoft", t)
                })
            }), o = 0, A.on("xchange.xdsoft", function(i) {
                clearTimeout(o), o = setTimeout(function() {
                    void 0 !== P.currentTime && null !== P.currentTime || (P.currentTime = P.now());
                    for (var o, i, s, u, d, l, f, c, m, h, g = "", p = new Date(P.currentTime.getFullYear(), P.currentTime.getMonth(), 1, 12, 0, 0), D = 0, v = P.now(), y = !1, b = !1, k = !1, x = !1, T = [], S = !0, M = ""; p.getDay() !== C.dayOfWeekStart;) p.setDate(p.getDate() - 1);
                    for (g += "<table><thead><tr>", C.weeks && (g += "<th></th>"), o = 0; o < 7; o += 1) g += "<th>" + C.i18n[n].dayOfWeekShort[(o + C.dayOfWeekStart) % 7] + "</th>";
                    for (g += "</tr></thead>", g += "<tbody>", !1 !== C.maxDate && (y = P.strToDate(C.maxDate), y = new Date(y.getFullYear(), y.getMonth(), y.getDate(), 23, 59, 59, 999)), !1 !== C.minDate && (b = P.strToDate(C.minDate), b = new Date(b.getFullYear(), b.getMonth(), b.getDate())), !1 !== C.minDateTime && (k = P.strToDate(C.minDateTime), k = new Date(k.getFullYear(), k.getMonth(), k.getDate(), k.getHours(), k.getMinutes(), k.getSeconds())), !1 !== C.maxDateTime && (x = P.strToDate(C.maxDateTime), x = new Date(x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds())), !1 !== x && (h = 31 * (12 * x.getFullYear() + x.getMonth()) + x.getDate()); D < P.currentTime.countDaysInMonth() || p.getDay() !== C.dayOfWeekStart || P.currentTime.getMonth() === p.getMonth();) {
                        T = [], D += 1, s = p.getDay(), u = p.getDate(), d = p.getFullYear(), F = p.getMonth(), l = P.getWeekOfYear(p), m = "", T.push("xdsoft_date"), f = C.beforeShowDay && e.isFunction(C.beforeShowDay.call) ? C.beforeShowDay.call(A, p) : null, C.allowDateRe && "[object RegExp]" === Object.prototype.toString.call(C.allowDateRe) && (C.allowDateRe.test(a.formatDate(p, C.formatDate)) || T.push("xdsoft_disabled")), C.allowDates && C.allowDates.length > 0 && -1 === C.allowDates.indexOf(a.formatDate(p, C.formatDate)) && T.push("xdsoft_disabled");
                        var w = 31 * (12 * p.getFullYear() + p.getMonth()) + p.getDate();
                        (!1 !== y && p > y || !1 !== k && p < k || !1 !== b && p < b || !1 !== x && w > h || f && !1 === f[0]) && T.push("xdsoft_disabled"), -1 !== C.disabledDates.indexOf(a.formatDate(p, C.formatDate)) && T.push("xdsoft_disabled"), -1 !== C.disabledWeekDays.indexOf(s) && T.push("xdsoft_disabled"), t.is("[disabled]") && T.push("xdsoft_disabled"), f && "" !== f[1] && T.push(f[1]), P.currentTime.getMonth() !== F && T.push("xdsoft_other_month"), (C.defaultSelect || A.data("changed")) && a.formatDate(P.currentTime, C.formatDate) === a.formatDate(p, C.formatDate) && T.push("xdsoft_current"), a.formatDate(v, C.formatDate) === a.formatDate(p, C.formatDate) && T.push("xdsoft_today"), 0 !== p.getDay() && 6 !== p.getDay() && -1 === C.weekends.indexOf(a.formatDate(p, C.formatDate)) || T.push("xdsoft_weekend"), void 0 !== C.highlightedDates[a.formatDate(p, C.formatDate)] && (i = C.highlightedDates[a.formatDate(p, C.formatDate)], T.push(void 0 === i.style ? "xdsoft_highlighted_default" : i.style), m = void 0 === i.desc ? "" : i.desc), C.beforeShowDay && e.isFunction(C.beforeShowDay) && T.push(C.beforeShowDay(p)), S && (g += "<tr>", S = !1, C.weeks && (g += "<th>" + l + "</th>")), g += '<td data-date="' + u + '" data-month="' + F + '" data-year="' + d + '" class="xdsoft_date xdsoft_day_of_week' + p.getDay() + " " + T.join(" ") + '" title="' + m + '"><div>' + u + "</div></td>", p.getDay() === C.dayOfWeekStartPrev && (g += "</tr>", S = !0), p.setDate(u + 1)
                    }
                    g += "</tbody></table>", z.html(g), J.find(".xdsoft_label span").eq(0).text(C.i18n[n].months[P.currentTime.getMonth()]), J.find(".xdsoft_label span").eq(1).text(P.currentTime.getFullYear() + C.yearOffset), M = "", F = "";
                    var O = 0;
                    if (!1 !== C.minTime) {
                        var W = P.strtotime(C.minTime);
                        O = 60 * W.getHours() + W.getMinutes()
                    }
                    var _ = 1440;
                    if (!1 !== C.maxTime) {
                        W = P.strtotime(C.maxTime);
                        _ = 60 * W.getHours() + W.getMinutes()
                    }
                    if (!1 !== C.minDateTime) {
                        W = P.strToDateTime(C.minDateTime);
                        if (a.formatDate(P.currentTime, C.formatDate) === a.formatDate(W, C.formatDate))(F = 60 * W.getHours() + W.getMinutes()) > O && (O = F)
                    }
                    if (!1 !== C.maxDateTime) {
                        var F;
                        W = P.strToDateTime(C.maxDateTime);
                        if (a.formatDate(P.currentTime, C.formatDate) === a.formatDate(W, C.formatDate))(F = 60 * W.getHours() + W.getMinutes()) < _ && (_ = F)
                    }
                    if (c = function(r, n) {
                            var o, i = P.now(),
                                s = C.allowTimes && e.isArray(C.allowTimes) && C.allowTimes.length;
                            i.setHours(r), r = parseInt(i.getHours(), 10), i.setMinutes(n), n = parseInt(i.getMinutes(), 10), T = [];
                            var u = 60 * r + n;
                            (t.is("[disabled]") || u >= _ || u < O) && T.push("xdsoft_disabled"), (o = new Date(P.currentTime)).setHours(parseInt(P.currentTime.getHours(), 10)), s || o.setMinutes(Math[C.roundTime](P.currentTime.getMinutes() / C.step) * C.step), (C.initTime || C.defaultSelect || A.data("changed")) && o.getHours() === parseInt(r, 10) && (!s && C.step > 59 || o.getMinutes() === parseInt(n, 10)) && (C.defaultSelect || A.data("changed") ? T.push("xdsoft_current") : C.initTime && T.push("xdsoft_init_time")), parseInt(v.getHours(), 10) === parseInt(r, 10) && parseInt(v.getMinutes(), 10) === parseInt(n, 10) && T.push("xdsoft_today"), M += '<div class="xdsoft_time ' + T.join(" ") + '" data-hour="' + r + '" data-minute="' + n + '">' + a.formatDate(i, C.formatTime) + "</div>"
                        }, C.allowTimes && e.isArray(C.allowTimes) && C.allowTimes.length)
                        for (D = 0; D < C.allowTimes.length; D += 1) c(P.strtotime(C.allowTimes[D]).getHours(), F = P.strtotime(C.allowTimes[D]).getMinutes());
                    else
                        for (D = 0, o = 0; D < (C.hours12 ? 12 : 24); D += 1)
                            for (o = 0; o < 60; o += C.step) {
                                var Y = 60 * D + o;
                                Y < O || (Y >= _ || c((D < 10 ? "0" : "") + D, F = (o < 10 ? "0" : "") + o))
                            }
                    for (L.html(M), r = "", D = parseInt(C.yearStart, 10); D <= parseInt(C.yearEnd, 10); D += 1) r += '<div class="xdsoft_option ' + (P.currentTime.getFullYear() === D ? "xdsoft_current" : "") + '" data-value="' + D + '">' + (D + C.yearOffset) + "</div>";
                    for (V.children().eq(0).html(r), D = parseInt(C.monthStart, 10), r = ""; D <= parseInt(C.monthEnd, 10); D += 1) r += '<div class="xdsoft_option ' + (P.currentTime.getMonth() === D ? "xdsoft_current" : "") + '" data-value="' + D + '">' + C.i18n[n].months[D] + "</div>";
                    R.children().eq(0).html(r), e(A).trigger("generate.xdsoft")
                }, 10), i.stopPropagation()
            }).on("afterOpen.xdsoft", function() {
                var e, t, a, r;
                C.timepicker && (L.find(".xdsoft_current").length ? e = ".xdsoft_current" : L.find(".xdsoft_init_time").length && (e = ".xdsoft_init_time"), e ? (t = N[0].clientHeight, (a = L[0].offsetHeight) - t < (r = L.find(e).index() * C.timeHeightInTimePicker + 1) && (r = a - t), N.trigger("scroll_element.xdsoft_scroller", [parseInt(r, 10) / (a - t)])) : N.trigger("scroll_element.xdsoft_scroller", [0]))
            }), i = 0, z.on("touchend click.xdsoft", "td", function(a) {
                a.stopPropagation(), i += 1;
                var r = e(this),
                    n = P.currentTime;
                if (null == n && (P.currentTime = P.now(), n = P.currentTime), r.hasClass("xdsoft_disabled")) return !1;
                n.setDate(1), n.setFullYear(r.data("year")), n.setMonth(r.data("month")), n.setDate(r.data("date")), A.trigger("select.xdsoft", [n]), t.val(P.str()), C.onSelectDate && e.isFunction(C.onSelectDate) && C.onSelectDate.call(A, P.currentTime, A.data("input"), a), A.data("changed", !0), A.trigger("xchange.xdsoft"), A.trigger("changedatetime.xdsoft"), (i > 1 || !0 === C.closeOnDateSelect || !1 === C.closeOnDateSelect && !C.timepicker) && !C.inline && A.trigger("close.xdsoft"), setTimeout(function() {
                    i = 0
                }, 200)
            }), L.on("touchstart", "div", function(e) {
                this.touchMoved = !1
            }).on("touchmove", "div", U).on("touchend click.xdsoft", "div", function(t) {
                if (!this.touchMoved) {
                    t.stopPropagation();
                    var a = e(this),
                        r = P.currentTime;
                    if (null == r && (P.currentTime = P.now(), r = P.currentTime), a.hasClass("xdsoft_disabled")) return !1;
                    r.setHours(a.data("hour")), r.setMinutes(a.data("minute")), A.trigger("select.xdsoft", [r]), A.data("input").val(P.str()), C.onSelectTime && e.isFunction(C.onSelectTime) && C.onSelectTime.call(A, P.currentTime, A.data("input"), t), A.data("changed", !0), A.trigger("xchange.xdsoft"), A.trigger("changedatetime.xdsoft"), !0 !== C.inline && !0 === C.closeOnTimeSelect && A.trigger("close.xdsoft")
                }
            }), j.on("mousewheel.xdsoft", function(e) {
                return !C.scrollMonth || (e.deltaY < 0 ? P.nextMonth() : P.prevMonth(), !1)
            }), t.on("mousewheel.xdsoft", function(e) {
                return !C.scrollInput || (!C.datepicker && C.timepicker ? ((s = L.find(".xdsoft_current").length ? L.find(".xdsoft_current").eq(0).index() : 0) + e.deltaY >= 0 && s + e.deltaY < L.children().length && (s += e.deltaY), L.children().eq(s).length && L.children().eq(s).trigger("mousedown"), !1) : C.datepicker && !C.timepicker ? (j.trigger(e, [e.deltaY, e.deltaX, e.deltaY]), t.val && t.val(P.str()), A.trigger("changedatetime.xdsoft"), !1) : void 0)
            }), A.on("changedatetime.xdsoft", function(t) {
                if (C.onChangeDateTime && e.isFunction(C.onChangeDateTime)) {
                    var a = A.data("input");
                    C.onChangeDateTime.call(A, P.currentTime, a, t), delete C.value, a.trigger("change")
                }
            }).on("generate.xdsoft", function() {
                C.onGenerate && e.isFunction(C.onGenerate) && C.onGenerate.call(A, P.currentTime, A.data("input")), B && (A.trigger("afterOpen.xdsoft"), B = !1)
            }).on("click.xdsoft", function(e) {
                e.stopPropagation()
            }), s = 0, Y = function(e, t) {
                do {
                    if (!(e = e.parentNode) || !1 === t(e)) break
                } while ("HTML" !== e.nodeName)
            }, u = function() {
                var t, a, r, n, o, i, s, u, d, l, f, c, m;
                if (t = (u = A.data("input")).offset(), a = u[0], l = "top", r = t.top + a.offsetHeight - 1, n = t.left, o = "absolute", d = e(C.contentWindow).width(), c = e(C.contentWindow).height(), m = e(C.contentWindow).scrollTop(), C.ownerDocument.documentElement.clientWidth - t.left < j.parent().outerWidth(!0)) {
                    var h = j.parent().outerWidth(!0) - a.offsetWidth;
                    n -= h
                }
                "rtl" === u.parent().css("direction") && (n -= A.outerWidth() - u.outerWidth()), C.fixed ? (r -= m, n -= e(C.contentWindow).scrollLeft(), o = "fixed") : (s = !1, Y(a, function(e) {
                    return null !== e && ("fixed" === C.contentWindow.getComputedStyle(e).getPropertyValue("position") ? (s = !0, !1) : void 0)
                }), s ? (o = "fixed", r + A.outerHeight() > c + m ? (l = "bottom", r = c + m - t.top) : r -= m) : r + A[0].offsetHeight > c + m && (r = t.top - A[0].offsetHeight + 1), r < 0 && (r = 0), n + a.offsetWidth > d && (n = d - a.offsetWidth)), i = A[0], Y(i, function(e) {
                    if ("relative" === C.contentWindow.getComputedStyle(e).getPropertyValue("position") && d >= e.offsetWidth) return n -= (d - e.offsetWidth) / 2, !1
                }), (f = {
                    position: o,
                    left: n,
                    top: "",
                    bottom: ""
                })[l] = r, A.css(f)
            }, A.on("open.xdsoft", function(t) {
                var a = !0;
                C.onShow && e.isFunction(C.onShow) && (a = C.onShow.call(A, P.currentTime, A.data("input"), t)), !1 !== a && (A.show(), u(), e(C.contentWindow).off("resize.xdsoft", u).on("resize.xdsoft", u), C.closeOnWithoutClick && e([C.ownerDocument.body, C.contentWindow]).on("touchstart mousedown.xdsoft", function t() {
                    A.trigger("close.xdsoft"), e([C.ownerDocument.body, C.contentWindow]).off("touchstart mousedown.xdsoft", t)
                }))
            }).on("close.xdsoft", function(t) {
                var a = !0;
                J.find(".xdsoft_month,.xdsoft_year").find(".xdsoft_select").hide(), C.onClose && e.isFunction(C.onClose) && (a = C.onClose.call(A, P.currentTime, A.data("input"), t)), !1 === a || C.opened || C.inline || A.hide(), t.stopPropagation()
            }).on("toggle.xdsoft", function() {
                A.is(":visible") ? A.trigger("close.xdsoft") : A.trigger("open.xdsoft")
            }).data("input", t), G = 0, A.data("xdsoft_datetime", P), A.setOptions(C), P.setCurrentTime(q()), t.data("xdsoft_datetimepicker", A).on("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart", function() {
                t.is(":disabled") || t.data("xdsoft_datetimepicker").is(":visible") && C.closeOnInputClick || C.openOnFocus && (clearTimeout(G), G = setTimeout(function() {
                    t.is(":disabled") || (B = !0, P.setCurrentTime(q(), !0), C.mask && X(C), A.trigger("open.xdsoft"))
                }, 100))
            }).on("keydown.xdsoft", function(t) {
                var a, r = t.which;
                return -1 !== [p].indexOf(r) && C.enterLikeTab ? (a = e("input:visible,textarea:visible,button:visible,a:visible"), A.trigger("close.xdsoft"), a.eq(a.index(this) + 1).focus(), !1) : -1 !== [T].indexOf(r) ? (A.trigger("close.xdsoft"), !0) : void 0
            }).on("blur.xdsoft", function() {
                A.trigger("close.xdsoft")
            })
        }, s = function(t) {
            var a = t.data("xdsoft_datetimepicker");
            a && (a.data("xdsoft_datetime", null), a.remove(), t.data("xdsoft_datetimepicker", null).off(".xdsoft"), e(C.contentWindow).off("resize.xdsoft"), e([C.contentWindow, C.ownerDocument.body]).off("mousedown.xdsoft touchstart"), t.unmousewheel && t.unmousewheel())
        }, e(C.ownerDocument).off("keydown.xdsoftctrl keyup.xdsoftctrl").on("keydown.xdsoftctrl", function(e) {
            e.keyCode === h && (F = !0)
        }).on("keyup.xdsoftctrl", function(e) {
            e.keyCode === h && (F = !1)
        }), this.each(function() {
            var t, n = e(this).data("xdsoft_datetimepicker");
            if (n) {
                if ("string" === e.type(r)) switch (r) {
                    case "show":
                        e(this).select().focus(), n.trigger("open.xdsoft");
                        break;
                    case "hide":
                        n.trigger("close.xdsoft");
                        break;
                    case "toggle":
                        n.trigger("toggle.xdsoft");
                        break;
                    case "destroy":
                        s(e(this));
                        break;
                    case "reset":
                        this.value = this.defaultValue, this.value && n.data("xdsoft_datetime").isValidDate(a.parseDate(this.value, C.format)) || n.data("changed", !1), n.data("xdsoft_datetime").setCurrentTime(this.value);
                        break;
                    case "validate":
                        n.data("input").trigger("blur.xdsoft");
                        break;
                    default:
                        n[r] && e.isFunction(n[r]) && (u = n[r](o))
                } else n.setOptions(r);
                return 0
            }
            "string" !== e.type(r) && (!C.lazyInit || C.open || C.inline ? i(e(this)) : (t = e(this)).on("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart", function e() {
                t.is(":disabled") || t.data("xdsoft_datetimepicker") || (clearTimeout(P), P = setTimeout(function() {
                    t.data("xdsoft_datetimepicker") || i(t), t.off("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart", e).trigger("open.xdsoft")
                }, 100))
            }))
        }), u
    }, e.fn.datetimepicker.defaults = t
};
! function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "jquery-mousewheel"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(datetimepickerFactory),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
}(function(e) {
    var t, a, r = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        n = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        o = Array.prototype.slice;
    if (e.event.fixHooks)
        for (var i = r.length; i;) e.event.fixHooks[r[--i]] = e.event.mouseHooks;
    var s = e.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var t = n.length; t;) this.addEventListener(n[--t], u, !1);
            else this.onmousewheel = u;
            e.data(this, "mousewheel-line-height", s.getLineHeight(this)), e.data(this, "mousewheel-page-height", s.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var t = n.length; t;) this.removeEventListener(n[--t], u, !1);
            else this.onmousewheel = null;
            e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(t) {
            var a = e(t),
                r = a["offsetParent" in e.fn ? "offsetParent" : "parent"]();
            return r.length || (r = e("body")), parseInt(r.css("fontSize"), 10) || parseInt(a.css("fontSize"), 10) || 16
        },
        getPageHeight: function(t) {
            return e(t).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };

    function u(r) {
        var n, i = r || window.event,
            u = o.call(arguments, 1),
            f = 0,
            c = 0,
            m = 0,
            h = 0,
            g = 0;
        if ((r = e.event.fix(i)).type = "mousewheel", "detail" in i && (m = -1 * i.detail), "wheelDelta" in i && (m = i.wheelDelta), "wheelDeltaY" in i && (m = i.wheelDeltaY), "wheelDeltaX" in i && (c = -1 * i.wheelDeltaX), "axis" in i && i.axis === i.HORIZONTAL_AXIS && (c = -1 * m, m = 0), f = 0 === m ? c : m, "deltaY" in i && (f = m = -1 * i.deltaY), "deltaX" in i && (c = i.deltaX, 0 === m && (f = -1 * c)), 0 !== m || 0 !== c) {
            if (1 === i.deltaMode) {
                var p = e.data(this, "mousewheel-line-height");
                f *= p, m *= p, c *= p
            } else if (2 === i.deltaMode) {
                var D = e.data(this, "mousewheel-page-height");
                f *= D, m *= D, c *= D
            }
            if (n = Math.max(Math.abs(m), Math.abs(c)), (!a || n < a) && (a = n, l(i, n) && (a /= 40)), l(i, n) && (f /= 40, c /= 40, m /= 40), f = Math[f >= 1 ? "floor" : "ceil"](f / a), c = Math[c >= 1 ? "floor" : "ceil"](c / a), m = Math[m >= 1 ? "floor" : "ceil"](m / a), s.settings.normalizeOffset && this.getBoundingClientRect) {
                var v = this.getBoundingClientRect();
                h = r.clientX - v.left, g = r.clientY - v.top
            }
            return r.deltaX = c, r.deltaY = m, r.deltaFactor = a, r.offsetX = h, r.offsetY = g, r.deltaMode = 0, u.unshift(r, f, c, m), t && clearTimeout(t), t = setTimeout(d, 200), (e.event.dispatch || e.event.handle).apply(this, u)
        }
    }

    function d() {
        a = null
    }

    function l(e, t) {
        return s.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0
    }
    e.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    })
});