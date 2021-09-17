"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var prom_client_1 = require("prom-client");
var cluster_1 = require("./cluster");
var types_1 = require("./types");
var mock = {
    addEventListener: jest.spyOn(cluster_1.ClusterRegistry, 'addEventListener'),
    removeEventListener: jest.spyOn(cluster_1.ClusterRegistry, 'removeEventListener'),
    sendMessage: jest.spyOn(cluster_1.ClusterRegistry, 'sendMessage'),
    getCurrentWorkerId: jest.spyOn(cluster_1.ClusterRegistry, 'getCurrentWorkerId'),
    getWorkers: jest.spyOn(cluster_1.ClusterRegistry, 'getWorkers'),
    getWorker: jest.spyOn(cluster_1.ClusterRegistry, 'getWorker'),
    isMaster: jest.spyOn(cluster_1.ClusterRegistry, 'isMaster'),
    createId: jest.spyOn(cluster_1.ClusterRegistry, 'createId'),
    worker: { id: 1, send: jest.fn() },
};
function mockClusterRegistry(test) {
    var _this = this;
    return function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mock.getWorkers.mockReturnValue([mock.worker]);
                    mock.getCurrentWorkerId.mockReturnValue(1);
                    mock.getWorker.mockReturnValue(mock.worker);
                    mock.createId.mockReturnValue('1::1');
                    return [4 /*yield*/, test(mock)];
                case 1:
                    _a.sent();
                    mock.addEventListener.mockReset();
                    mock.removeEventListener.mockReset();
                    mock.sendMessage.mockReset();
                    mock.getWorkers.mockReset();
                    mock.isMaster.mockReset();
                    mock.worker.send.mockReset();
                    return [2 /*return*/];
            }
        });
    }); };
}
describe('./src/entities/Prometheus/cluster', function () {
    describe('merge', function () {
        test("shoudl return a new instance", mockClusterRegistry(function (mock) { return __awaiter(void 0, void 0, void 0, function () {
            var registry, clusterRegistry;
            return __generator(this, function (_a) {
                mock.isMaster.mockReturnValue(true);
                mock.addEventListener.mockReturnValue();
                registry = cluster_1.ClusterRegistry.merge([]);
                expect(registry).toBeInstanceOf(cluster_1.ClusterRegistry);
                expect(mock.addEventListener.mock.calls).toEqual([[registry]]);
                mock.isMaster.mockReturnValue(false);
                clusterRegistry = cluster_1.ClusterRegistry.merge([]);
                expect(clusterRegistry).toBeInstanceOf(cluster_1.ClusterRegistry);
                expect(mock.addEventListener.mock.calls).toEqual([
                    [registry],
                    [clusterRegistry],
                ]);
                return [2 /*return*/];
            });
        }); }));
    });
    describe("metrics", function () {
        test("on master should return the metrics", mockClusterRegistry(function (mock) { return __awaiter(void 0, void 0, void 0, function () {
            var registry, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mock.isMaster.mockReturnValue(true);
                        mock.addEventListener.mockReturnValue();
                        registry = new cluster_1.ClusterRegistry();
                        registry.registerMetric(new prom_client_1.Counter({
                            name: 'master_counter',
                            help: 'description',
                        }));
                        _a = expect;
                        return [4 /*yield*/, registry.metrics()];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toBe([
                            '# HELP master_counter description',
                            '# TYPE master_counter counter',
                            'master_counter 0',
                            '',
                        ].join('\n'));
                        return [2 /*return*/];
                }
            });
        }); }));
        test("on fork should send a requet message to the master instance", mockClusterRegistry(function (mock) { return __awaiter(void 0, void 0, void 0, function () {
            var registry, secondary, metricRequest, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        mock.isMaster.mockReturnValue(false);
                        mock.addEventListener.mockReturnValue();
                        registry = new cluster_1.ClusterRegistry();
                        secondary = new prom_client_1.Registry();
                        secondary.registerMetric(new prom_client_1.Counter({
                            name: 'fork_counter',
                            help: 'description',
                        }));
                        metricRequest = registry.metrics();
                        expect(mock.sendMessage.mock.calls).toEqual([
                            [
                                {
                                    id: '1::1',
                                    worker: 1,
                                    type: types_1.ClusterMessageType.RequestMetric,
                                },
                            ],
                        ]);
                        _b = (_a = registry).resolveForkMetrics;
                        _c = {
                            id: '1::1'
                        };
                        return [4 /*yield*/, secondary.getMetricsAsJSON()];
                    case 1:
                        _b.apply(_a, [(_c.metrics = _e.sent(),
                                _c.type = types_1.ClusterMessageType.ResponsetMetric,
                                _c)]);
                        _d = expect;
                        return [4 /*yield*/, metricRequest];
                    case 2:
                        _d.apply(void 0, [_e.sent()]).toBe([
                            '# HELP fork_counter description',
                            '# TYPE fork_counter counter',
                            'fork_counter 0',
                            '',
                        ].join('\n'));
                        return [2 /*return*/];
                }
            });
        }); }));
    });
});
