"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
exports.TYPE_VALIDATION = {
    STRING: 'STRING',
    NUMBER: 'NUMBER',
    BOOLEAN: 'BOOLEAN',
    OBJECT: 'OBJECT',
    ARRAY: function (T) {
        if (!(T) || !(['STRING', 'NUMBER', 'BOOLEAN', 'OBJECT', 'ARRAY'].includes(T))) {
            return 'ARRAY';
        }
        return "ARRAY_OF_" + T;
    }
};
var Validator = (function () {
    function Validator() {
    }
    Validator.setRule = function (rules) {
        this._rules = rules;
        return this;
    };
    Validator.isEmpty = function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return JSON.stringify(obj) === JSON.stringify({});
    };
    Validator._validate = function (rule, input, inputName) {
        return __awaiter(this, void 0, void 0, function () {
            var inputData, typeValidation, evaluateResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputData = input[inputName];
                        if (rule.hasOwnProperty('required')) {
                            if (rule.required[0] && inputData === undefined) {
                                return [2, rule.required[1]];
                            }
                        }
                        else {
                            return [2, "Validation rule for " + inputName + " must include \"required\" validation"];
                        }
                        if (!(inputData !== undefined)) return [3, 3];
                        if (rule.hasOwnProperty('type')) {
                            if (inputData !== null) {
                                typeValidation = rule.type[0];
                                if ((typeValidation === exports.TYPE_VALIDATION.STRING && typeof inputData !== 'string') ||
                                    (typeValidation === exports.TYPE_VALIDATION.NUMBER && typeof inputData !== 'number') ||
                                    (typeValidation === exports.TYPE_VALIDATION.BOOLEAN && typeof inputData !== 'boolean') ||
                                    (typeValidation === exports.TYPE_VALIDATION.OBJECT && typeof inputData !== 'object') ||
                                    (typeValidation === exports.TYPE_VALIDATION.ARRAY() && inputData.constructor !== Array) ||
                                    (typeValidation === exports.TYPE_VALIDATION.ARRAY(exports.TYPE_VALIDATION.STRING) && (inputData.constructor !== Array || inputData.filter(function (i) { return typeof i !== 'string'; }).length > 0)) ||
                                    (typeValidation === exports.TYPE_VALIDATION.ARRAY(exports.TYPE_VALIDATION.NUMBER) && (inputData.constructor !== Array || inputData.filter(function (i) { return typeof i !== 'number'; }).length > 0)) ||
                                    (typeValidation === exports.TYPE_VALIDATION.ARRAY(exports.TYPE_VALIDATION.BOOLEAN) && (inputData.constructor !== Array || inputData.filter(function (i) { return typeof i !== 'boolean'; }).length > 0)) ||
                                    (typeValidation === exports.TYPE_VALIDATION.ARRAY(exports.TYPE_VALIDATION.OBJECT) && (inputData.constructor !== Array || inputData.filter(function (i) { return typeof i !== 'object'; }).length > 0)) ||
                                    (typeValidation === exports.TYPE_VALIDATION.ARRAY(exports.TYPE_VALIDATION.ARRAY()) && (inputData.constructor !== Array || inputData.filter(function (i) { return i.constructor !== Array; }).length > 0))) {
                                    return [2, rule.type[1]];
                                }
                            }
                        }
                        else {
                            return [2, "Validation rule for \"" + inputName + "\" must include \"type\" validation"];
                        }
                        if (rule.min) {
                            if (typeof inputData === 'string') {
                                if (inputData.length < rule.min[0]) {
                                    return [2, rule.min[1]];
                                }
                            }
                            else if (typeof inputData === 'number') {
                                if (inputData < rule.min[0]) {
                                    return [2, rule.min[1]];
                                }
                            }
                        }
                        if (rule.max) {
                            if (typeof inputData === 'string') {
                                if (inputData.length > rule.max[0]) {
                                    return [2, rule.max[1]];
                                }
                            }
                            else if (typeof inputData === 'number') {
                                if (inputData > rule.max[0]) {
                                    return [2, rule.max[1]];
                                }
                            }
                        }
                        if (rule.match) {
                            if (typeof inputData === 'string') {
                                if (!rule.match[0].test(inputData)) {
                                    return [2, rule.match[1]];
                                }
                            }
                        }
                        if (rule.in) {
                            if (!(rule.in[0].indexOf(inputData) > -1)) {
                                return [2, rule.in[1]];
                            }
                        }
                        if (!rule.evaluate) return [3, 2];
                        return [4, rule.evaluate(rule, input)];
                    case 1:
                        evaluateResult = _a.sent();
                        if (typeof evaluateResult !== 'boolean' || (typeof evaluateResult === 'boolean' && !evaluateResult)) {
                            return [2, evaluateResult];
                        }
                        _a.label = 2;
                    case 2: return [2, true];
                    case 3: return [2];
                }
            });
        });
    };
    Validator.validateWithRule = function (rule, input) {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = {};
                        return [4, Object.keys(rule).reduce(function (p, inputName) { return __awaiter(_this, void 0, void 0, function () {
                                var result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, p];
                                        case 1:
                                            _a.sent();
                                            return [4, this._validate(rule[inputName], input, inputName)];
                                        case 2:
                                            result = _a.sent();
                                            if (typeof result === 'string') {
                                                error[inputName] = result;
                                            }
                                            return [2];
                                    }
                                });
                            }); }, Promise.resolve())];
                    case 1:
                        _a.sent();
                        return [2, {
                                isValid: Validator.isEmpty(error),
                                error: error
                            }];
                }
            });
        });
    };
    return Validator;
}());
exports.default = Validator;
