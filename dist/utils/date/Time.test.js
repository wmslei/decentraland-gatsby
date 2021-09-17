"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Time_1 = __importDefault(require("./Time"));
describe("utils/date/Time", function () {
    test("parse time input", function () {
        expect(Time_1.default('00:00', 'HH:mm').getTime()).toBe(0);
        expect(Time_1.default('00:01', 'HH:mm').getTime()).toBe(Time_1.default.Minute);
        expect(Time_1.default('01:00', 'HH:mm').getTime()).toBe(Time_1.default.Hour);
        expect(Time_1.default('23:59', 'HH:mm').getTime()).toBe(23 * Time_1.default.Hour + 59 * Time_1.default.Minute);
        expect(Time_1.default('24:00', 'HH:mm').getTime()).toBe(Time_1.default.Day);
        expect(Time_1.default.utc('00:00', 'HH:mm').getTime()).toBe(0);
        expect(Time_1.default.utc('00:01', 'HH:mm').getTime()).toBe(Time_1.default.Minute);
        expect(Time_1.default.utc('01:00', 'HH:mm').getTime()).toBe(Time_1.default.Hour);
        expect(Time_1.default.utc('23:59', 'HH:mm').getTime()).toBe(23 * Time_1.default.Hour + 59 * Time_1.default.Minute);
        expect(Time_1.default.utc('24:00', 'HH:mm').getTime()).toBe(Time_1.default.Day);
    });
    test("parse date input", function () {
        expect(Time_1.default.utc('2020-02-20', 'YYYY-MM-DD').toJSON()).toBe("2020-02-20T00:00:00.000Z");
    });
    test("combine date input and time input", function () {
        var time = Time_1.default.utc('23:59', Time_1.default.Formats.InputTime).getTime();
        var date = Time_1.default.utc('2020-02-20', Time_1.default.Formats.InputDate).getTime();
        expect(new Date(date + time).toJSON()).toBe("2020-02-20T23:59:00.000Z");
    });
    test("helper for apis", function () {
        expect(Time_1.default.date()).toBe(null);
        expect(Time_1.default.date(undefined)).toBe(null);
        expect(Time_1.default.date(null)).toBe(null);
        var date = new Date('2020-02-20T23:59:00.000Z');
        expect(Time_1.default.date(date)).toBe(date);
        expect(Time_1.default.date(date.toJSON())).toEqual(date);
        expect(Time_1.default.date(date.getTime())).toEqual(date);
        expect(Time_1.default.date(Time_1.default(date.getTime()))).toEqual(date);
        expect(Time_1.default.date(Time_1.default.utc(date.getTime()))).toEqual(date);
    });
});
