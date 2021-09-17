"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Land_1 = __importDefault(require("./Land"));
describe('utils/api/Land', function () {
    var e_1, _a, e_2, _b;
    var cases = [
        [0, 0, '0'],
        [1, 0, '340282366920938463463374607431768211456'],
        [1, 1, '340282366920938463463374607431768211457'],
        [0, 1, '1'],
        [0, -1, '340282366920938463463374607431768211455'],
        [
            -1,
            0,
            '115792089237316195423570985008687907852929702298719625575994209400481361428480',
        ],
        [
            -1,
            -1,
            '115792089237316195423570985008687907853269984665640564039457584007913129639935',
        ],
        [24, 24, '8166776806102523123120990578362437074968'],
        [24, -24, '8507059173023461586584365185794205286376'],
        [
            -24,
            -24,
            '115792089237316195423570985008687907845443490226458979379799968036982460776424',
        ],
        [
            -24,
            24,
            '115792089237316195423570985008687907845103207859538040916336593429550692565016',
        ],
        [120, 120, '40833884030512615615604952891812185374840'],
        [120, -120, '41174166397433554079068327499243953586056'],
        [
            -120,
            -120,
            '115792089237316195423570985008687907812776383002048886887316005723532712476552',
        ],
        [
            -120,
            120,
            '115792089237316195423570985008687907812436100635127948423852631116100944265336',
        ],
    ];
    var _loop_1 = function (x, y, id) {
        test(".encodeParcelId(x: " + x + ", y: " + y + ") => \"" + id + "\"", function () {
            expect(Land_1.default.get().encodeParcelId([x, y])).toBe(id);
        });
    };
    try {
        for (var cases_1 = __values(cases), cases_1_1 = cases_1.next(); !cases_1_1.done; cases_1_1 = cases_1.next()) {
            var _c = __read(cases_1_1.value, 3), x = _c[0], y = _c[1], id = _c[2];
            _loop_1(x, y, id);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (cases_1_1 && !cases_1_1.done && (_a = cases_1.return)) _a.call(cases_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var _loop_2 = function (x, y, id) {
        test(".decodeParcelId(id: \"" + id + "\") => [" + x + ", " + y + "]", function () {
            expect(Land_1.default.get().decodeParcelId(id)).toEqual([x, y]);
        });
    };
    try {
        for (var cases_2 = __values(cases), cases_2_1 = cases_2.next(); !cases_2_1.done; cases_2_1 = cases_2.next()) {
            var _d = __read(cases_2_1.value, 3), x = _d[0], y = _d[1], id = _d[2];
            _loop_2(x, y, id);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (cases_2_1 && !cases_2_1.done && (_b = cases_2.return)) _b.call(cases_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
});
