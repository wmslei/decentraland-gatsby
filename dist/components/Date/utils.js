"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCalendarDate = exports.fromUTCInputTime = exports.fromInputTime = exports.toUTCInputTime = exports.toInputTime = exports.fromUTCInputDate = exports.fromInputDate = exports.toUTCInputDate = exports.toInputDate = exports.toTimezoneName = exports.toMonthName = exports.toDayName = exports.toDayNumber = exports.toPrefixedNumber = exports.toFixedNumber = exports.today = exports.now = exports.date = exports.toDateOptions = exports.Time = void 0;
var Time;
(function (Time) {
    Time[Time["Millisecond"] = 1] = "Millisecond";
    Time[Time["Second"] = 1000] = "Second";
    Time[Time["Minute"] = 60000] = "Minute";
    Time[Time["Hour"] = 3600000] = "Hour";
    Time[Time["Day"] = 86400000] = "Day";
    Time[Time["Week"] = 604800000] = "Week";
})(Time = exports.Time || (exports.Time = {}));
var days = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
];
var months = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
];
function toDateOptions(date) {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        milliseconds: date.getMilliseconds(),
    };
}
exports.toDateOptions = toDateOptions;
function date(options) {
    if (options === void 0) { options = {}; }
    var final = __assign(__assign({}, toDateOptions(new Date())), options);
    return new Date(final.year, final.month - 1, final.day, final.hours, final.minutes, final.seconds, final.milliseconds);
}
exports.date = date;
function now() {
    return new Date();
}
exports.now = now;
function today() {
    return date({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
}
exports.today = today;
function short(value) {
    return value.slice(0, 3);
}
function capitalize(value) {
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
}
/** @deprecated use `toPrefixedNumber` instead */
function toFixedNumber(value) {
    return toPrefixedNumber(value, 2);
}
exports.toFixedNumber = toFixedNumber;
/** @deprecated use `utils/number/pad` instead */
function toPrefixedNumber(value, length) {
    if (length === void 0) { length = 0; }
    var raw = String(value);
    var result = '';
    if (raw.startsWith('-')) {
        result += '-';
        raw = raw.slice(1);
    }
    var _a = __read(raw.split('.'), 2), integer = _a[0], decimals = _a[1];
    var prefix = '0'.repeat(Math.max(length - integer.length, 0));
    result += prefix + integer;
    if (decimals) {
        result += '.' + decimals;
    }
    return result;
}
exports.toPrefixedNumber = toPrefixedNumber;
/** @deprecated use `utils/Datetime#getDatePadded` instead */
function toDayNumber(date, options) {
    if (options === void 0) { options = {}; }
    var day = options.utc ? date.getUTCDate() : date.getDate();
    return day;
}
exports.toDayNumber = toDayNumber;
/** @deprecated use `utils/Datetime#getDateName` instead */
function toDayName(date, options) {
    if (options === void 0) { options = {}; }
    var day = options.utc ? date.getUTCDay() : date.getDay();
    var result = days[day];
    if (options.short) {
        result = short(result);
    }
    if (options.capitalized) {
        result = capitalize(result);
    }
    return result;
}
exports.toDayName = toDayName;
/** @deprecated use `utils/Datetime#getMonthName` instead */
function toMonthName(date, options) {
    if (options === void 0) { options = {}; }
    var month = options.utc ? date.getMonth() : date.getMonth();
    var result = months[month];
    if (options.short) {
        result = short(result);
    }
    if (options.capitalized) {
        result = capitalize(result);
    }
    return result;
}
exports.toMonthName = toMonthName;
/** @deprecated use `utils/Datetime#getTimezoneName` instead */
function toTimezoneName(value) {
    var offset = value.getTimezoneOffset();
    var hour = toFixedNumber(Math.floor(offset / 60));
    var minutes = toFixedNumber(offset % 60);
    var diff = offset > 0 ? '-' : '+';
    return "GMT" + diff + hour + ":" + minutes;
}
exports.toTimezoneName = toTimezoneName;
/** @deprecated use `utils/Datetime#toInputDate` instead */
function toInputDate(date) {
    if (!date || Number.isNaN(date.getTime())) {
        return '';
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return [year, toFixedNumber(month), toFixedNumber(day)].join('-');
}
exports.toInputDate = toInputDate;
/** @deprecated use `utils/Datetime#toInputDate` instead */
function toUTCInputDate(date) {
    if (!date || Number.isNaN(date.getTime())) {
        return '';
    }
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    return [year, toFixedNumber(month), toFixedNumber(day)].join('-');
}
exports.toUTCInputDate = toUTCInputDate;
/** @deprecated use `utils/Datetime@fromInputDate` instead */
function fromInputDate(value, base) {
    if (base === void 0) { base = today(); }
    if (!value) {
        return base;
    }
    var _a = __read(value.split('-').map(Number), 3), year = _a[0], month = _a[1], day = _a[2];
    var newDate = new Date(base.getTime());
    newDate.setFullYear(year);
    newDate.setMonth(month - 1);
    newDate.setDate(day);
    return newDate;
}
exports.fromInputDate = fromInputDate;
/** @deprecated use `utils/Datetime@fromInputDate` instead */
function fromUTCInputDate(value, base) {
    if (base === void 0) { base = today(); }
    if (!value) {
        return base;
    }
    var _a = __read(value.split('-').map(Number), 3), year = _a[0], month = _a[1], day = _a[2];
    var newDate = new Date(base.getTime());
    newDate.setUTCFullYear(year);
    newDate.setUTCMonth(month - 1);
    newDate.setUTCDate(day);
    return newDate;
}
exports.fromUTCInputDate = fromUTCInputDate;
/** @deprecated use `utils/Datetime#toInputTime` instead */
function toInputTime(date) {
    if (!date || Number.isNaN(date.getTime())) {
        return '';
    }
    var hours = date.getHours();
    var minutes = date.getMinutes();
    return [toFixedNumber(hours), toFixedNumber(minutes)].join(':');
}
exports.toInputTime = toInputTime;
/** @deprecated use `utils/Datetime#toInputTime` instead */
function toUTCInputTime(date) {
    if (!date || Number.isNaN(date.getTime())) {
        return '';
    }
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    return [toFixedNumber(hours), toFixedNumber(minutes)].join(':');
}
exports.toUTCInputTime = toUTCInputTime;
/** @deprecated use `utils/Datetime@fromInputTime` instead */
function fromInputTime(value, base) {
    if (base === void 0) { base = today(); }
    if (!value) {
        return base;
    }
    var _a = __read(value.split(':').map(Number), 2), hours = _a[0], minutes = _a[1];
    var newDate = new Date(base.getTime());
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    return newDate;
}
exports.fromInputTime = fromInputTime;
/** @deprecated use `utils/Datetime@fromInputTime` instead */
function fromUTCInputTime(value, base) {
    if (base === void 0) { base = today(); }
    if (!value) {
        return base;
    }
    var _a = __read(value.split(':').map(Number), 2), hours = _a[0], minutes = _a[1];
    var newDate = new Date(base.getTime());
    newDate.setUTCHours(hours);
    newDate.setUTCMinutes(minutes);
    return newDate;
}
exports.fromUTCInputTime = fromUTCInputTime;
/** @deprecated use `utils/Datetime#toGoogleCalendar` instead */
function toCalendarDate(date) {
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var seconds = date.getUTCSeconds();
    return [
        year,
        toFixedNumber(month),
        toFixedNumber(day),
        'T',
        toFixedNumber(hours),
        toFixedNumber(minutes),
        toFixedNumber(seconds),
        'Z',
    ].join('');
}
exports.toCalendarDate = toCalendarDate;
