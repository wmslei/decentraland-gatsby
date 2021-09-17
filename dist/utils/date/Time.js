"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs_1 = __importDefault(require("dayjs"));
var utc_1 = __importDefault(require("dayjs/plugin/utc"));
var isToday_1 = __importDefault(require("dayjs/plugin/isToday"));
var isTomorrow_1 = __importDefault(require("dayjs/plugin/isTomorrow"));
var isYesterday_1 = __importDefault(require("dayjs/plugin/isYesterday"));
var isBetween_1 = __importDefault(require("dayjs/plugin/isBetween"));
var isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
var isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
var pluralGetSet_1 = __importDefault(require("dayjs/plugin/pluralGetSet"));
var customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
var relativeTime_1 = __importDefault(require("dayjs/plugin/relativeTime"));
require("dayjs/plugin/utc");
require("dayjs/plugin/isToday");
require("dayjs/plugin/isTomorrow");
require("dayjs/plugin/isYesterday");
require("dayjs/plugin/isBetween");
require("dayjs/plugin/isSameOrAfter");
require("dayjs/plugin/isSameOrBefore");
require("dayjs/plugin/pluralGetSet");
require("dayjs/plugin/customParseFormat");
require("dayjs/plugin/relativeTime");
require("./plugin");
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(isToday_1.default);
dayjs_1.default.extend(isTomorrow_1.default);
dayjs_1.default.extend(isYesterday_1.default);
dayjs_1.default.extend(isBetween_1.default);
dayjs_1.default.extend(isSameOrAfter_1.default);
dayjs_1.default.extend(isSameOrBefore_1.default);
dayjs_1.default.extend(pluralGetSet_1.default);
dayjs_1.default.extend(customParseFormat_1.default);
dayjs_1.default.extend(relativeTime_1.default);
dayjs_1.default.extend(function (_options, Dayjs, factory) {
    var Constants = {
        Millisecond: 1,
        Second: 1000 /* milliseconds */,
        Minute: 1000 /* milliseconds */ * 60 /* seconds */,
        Hour: 1000 /* milliseconds */ * 60 /* seconds */ * 60 /* minutes */,
        Day: 1000 /* milliseconds */ *
            60 /* seconds */ *
            60 /* minutes */ *
            24 /* hours */,
        Week: 1000 /* milliseconds */ *
            60 /* seconds */ *
            60 /* minutes */ *
            24 /* hours */ *
            7 /* days */,
    };
    var Formats = Object.freeze({
        GoogleCalendar: 'YYYYMMDDTHHmmss[Z]',
        InputDate: 'YYYY-MM-DD',
        InputTime: 'HH:mm',
    });
    function date(value) {
        if (value === null || value === undefined) {
            return null;
        }
        if (value instanceof Date) {
            return value;
        }
        return dayjs_1.default(value).toDate();
    }
    Object.assign(factory, Constants, {
        Formats: Formats,
        isTime: factory.isDayjs,
        date: date,
        from: factory,
    });
    // console.log(Dayjs.prototype as any)
    var parse = Dayjs.prototype.parse;
    Object.assign(Dayjs.prototype, {
        parse: function (cfg) {
            if (typeof cfg.date === 'string' &&
                typeof cfg.args[0] === 'string' &&
                cfg.args[1] === Formats.InputTime) {
                cfg.date = '1970-01-01 ' + cfg.date;
                cfg.utc = true;
                cfg.args[0] = cfg.date;
                cfg.args[1] = Formats.InputDate + ' ' + Formats.InputTime;
            }
            parse.bind(this)(cfg);
        },
    });
    Dayjs.prototype.getTime = function timeGetTime() {
        return this.toDate().getTime();
    };
    Dayjs.prototype.toJSON = function timeToJSON() {
        return this.toDate().toJSON();
    };
});
exports.default = dayjs_1.default;
