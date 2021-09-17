"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isMobile_1 = __importDefault(require("../isMobile"));
var context = null;
function segment(tracker) {
    if (typeof window !== 'undefined') {
        if (window.analytics) {
            if (!context) {
                var ethereum = window === null || window === void 0 ? void 0 : window.ethereum;
                context = {
                    mobile: isMobile_1.default(),
                    wallet: !ethereum
                        ? 'none'
                        : (ethereum === null || ethereum === void 0 ? void 0 : ethereum.isMetaMask) ? 'metamask'
                            : (ethereum === null || ethereum === void 0 ? void 0 : ethereum.isDapper) ? 'dapper'
                                : (ethereum === null || ethereum === void 0 ? void 0 : ethereum.isCucumber) ? 'cucumber'
                                    : (ethereum === null || ethereum === void 0 ? void 0 : ethereum.isTrust) ? 'trust'
                                        : (ethereum === null || ethereum === void 0 ? void 0 : ethereum.isToshi) ? 'coinbase'
                                            : (ethereum === null || ethereum === void 0 ? void 0 : ethereum.isGoWallet) ? 'goWallet'
                                                : (ethereum === null || ethereum === void 0 ? void 0 : ethereum.isAlphaWallet) ? 'alphaWallet'
                                                    : (ethereum === null || ethereum === void 0 ? void 0 : ethereum.isStatus) ? 'status'
                                                        : 'other',
                };
            }
            tracker(window.analytics, context);
        }
    }
}
exports.default = segment;
