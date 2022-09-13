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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../src/app"));
jest.mock('mysql2/promise', function () {
    var connectionError = new Error("Neste requisito de validação, não é necessário conectar com o banco de dados");
    var connectionMock = jest.fn().mockImplementation(function () { return ({
        execute: jest.fn().mockRejectedValue(connectionError),
        query: jest.fn().mockRejectedValue(connectionError),
    }); });
    return {
        createPool: connectionMock,
        createConnection: connectionMock, createPoolCluster: connectionMock
    };
});
describe('7 - Crie as validações para as pessoas usuárias', function () {
    it('Será validado que o campo "username" é obrigatório', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/users').send({
                            level: 2,
                            classe: 'classe',
                            password: 'senha1234',
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(400);
                        expect(result.body.message).toEqual('\"username\" is required');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que o campo "username" tem o tipo string', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/users').send({
                            username: 1,
                            password: 'senha1234',
                            level: 2,
                            classe: 'classe',
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(422);
                        expect(result.body.message).toEqual('\"username\" must be a string');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que o campo "username" é uma string com mais de 2 caracteres', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/users').send({
                            username: 'Lê',
                            password: 'senha1234',
                            level: 2,
                            classe: 'classe',
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(422);
                        expect(result.body.message).toEqual('\"username\" length must be at least 3 characters long');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que o campo "classe" é obrigatório', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/users').send({
                            username: 'username',
                            password: 'senha1234',
                            level: 2,
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(400);
                        expect(result.body.message).toEqual('\"classe\" is required');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que o campo "classe" tem o tipo string', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/users').send({
                            username: 'username',
                            password: 'senha1234',
                            level: 2,
                            classe: 1,
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(422);
                        expect(result.body.message).toEqual('\"classe\" must be a string');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que o campo "classe" é uma string com mais de 2 caracteres', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/users').send({
                            username: 'username',
                            password: 'senha1234',
                            level: 2,
                            classe: 'el',
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(422);
                        expect(result.body.message).toEqual('\"classe\" length must be at least 3 characters long');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que o campo "level" é obrigatório', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/users').send({
                            username: 'username',
                            password: 'senha1234',
                            classe: 'classe',
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(400);
                        expect(result.body.message).toEqual('\"level\" is required');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que o campo "level" tem o tipo number', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/users').send({
                            username: 'username',
                            password: 'senha1234',
                            level: 'um',
                            classe: 'classe',
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(422);
                        expect(result.body.message).toEqual('\"level\" must be a number');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que o campo "level" deve ser um número maior que 0', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/users').send({
                            username: 'username',
                            password: 'senha1234',
                            level: 0,
                            classe: 'classe',
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(422);
                        expect(result.body.message).toEqual('\"level\" must be greater than or equal to 1');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que o campo "password" é obrigatório', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/users').send({
                            username: 'username',
                            level: 2,
                            classe: 'classe',
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(400);
                        expect(result.body.message).toEqual('\"password\" is required');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que o campo "password" tem o tipo string', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/users').send({
                            username: 'username',
                            password: 12345678,
                            level: 2,
                            classe: 'classe',
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(422);
                        expect(result.body.message).toEqual('\"password\" must be a string');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que o campo "password" é uma string com 8 ou mais caracteres', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/users').send({
                            username: 'username',
                            password: '1234567',
                            level: 2,
                            classe: 'classe',
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(422);
                        expect(result.body.message).toEqual('\"password\" length must be at least 8 characters long');
                        return [2 /*return*/];
                }
            });
        });
    });
});
