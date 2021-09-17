"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var htmlmin_1 = __importDefault(require("htmlmin"));
var fs_1 = require("fs");
var utils_1 = require("./utils");
describe("src/entities/Gatsby/utils", function () {
    describe("replaceHelmetMetadata", function () {
        var initial = fs_1.readFileSync(__dirname + '/__data__/initial.html', 'utf8');
        var empty = fs_1.readFileSync(__dirname + '/__data__/expected.empty.html', 'utf8');
        var injected = fs_1.readFileSync(__dirname + '/__data__/expected.injected.html', 'utf8');
        test("should remove title and meta[data-react-helmet] tags", function () {
            expect(htmlmin_1.default(utils_1.replaceHelmetMetadata(initial))).toBe(htmlmin_1.default(empty));
        });
        test("should inject new metadata", function () {
            var meta = {
                title: 'Injected title',
                description: 'injected description',
                image: 'image',
                'twitter:card': 'summary_large_image',
                url: 'url',
                'og:type': 'website',
            };
            expect(htmlmin_1.default(utils_1.replaceHelmetMetadata(initial, meta))).toBe(htmlmin_1.default(injected));
        });
    });
});
