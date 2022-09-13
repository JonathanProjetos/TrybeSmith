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
var connection_1 = __importDefault(require("../src/models/connection"));
var recreateDatabase_1 = __importDefault(require("./recreateDatabase"));
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
describe('8 - Crie um endpoint para o cadastro de um pedido', function () {
    var _this = this;
    var token;
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, recreateDatabase_1.default)(connection_1.default)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/login').send({
                            username: 'yraa',
                            password: 'valarmorg',
                        })];
                case 2:
                    result = _a.sent();
                    token = result.body.token;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () {
        connection_1.default.end();
    });
    it('Será validado que não é possível cadastrar pedidos sem token', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/orders').send({
                            productsIds: [1, 2],
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(401);
                        expect(result.body.message).toEqual('Token not found');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que não é possível cadastrar um pedido com token inválido', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/orders').send({
                            productsIds: 'amount',
                        }).set('Authorization', 'Bearer 123')];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(401);
                        expect(result.body.message).toEqual('Invalid token');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que o campo "productsIds" é obrigatório"', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/orders').send({}).set('Authorization', token)];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(400);
                        expect(result.body.message).toEqual('\"productsIds\" is required');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que não é possível criar um pedido com o campo "productsIds" não sendo um array', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/orders').send({
                            productsIds: 'products',
                        }).set('Authorization', token)];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(422);
                        expect(result.body.message).toEqual('\"productsIds\" must be an array');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que não é possível criar um pedido com o campo "productsIds" vazio', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/orders').send({
                            productsIds: [],
                        }).set('Authorization', token)];
                    case 1:
                        result = _a.sent();
                        expect(result.statusCode).toEqual(422);
                        expect(result.body.message).toEqual('\"productsIds\" must include only numbers');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que é possível criar um pedido com sucesso com 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            var loggedUserId, fakeProductId, fakeProduct, result, selected, orders, selectedProducts, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loggedUserId = 3;
                        fakeProductId = 6;
                        fakeProduct = {
                            name: 'café sem açúcar daquele naipão',
                            amount: 'meio pão de queijo',
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/products').send(fakeProduct).set('Authorization', token)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/orders').send({
                                productsIds: [fakeProductId],
                            }).set('Authorization', token)];
                    case 2:
                        result = _a.sent();
                        expect(result.statusCode).toBe(201);
                        expect(result.body).toBeDefined();
                        expect(result.body.userId).toBeDefined();
                        expect(result.body.userId).toBe(3);
                        expect(result.body.productsIds).toBeDefined();
                        expect(result.body.productsIds).toEqual([fakeProductId]);
                        return [4 /*yield*/, connection_1.default.execute('SELECT * FROM Trybesmith.Orders')];
                    case 3:
                        selected = (_a.sent())[0];
                        orders = selected;
                        expect(orders).toEqual(expect.arrayContaining([expect.objectContaining({ userId: loggedUserId, id: 4 })]));
                        return [4 /*yield*/, connection_1.default.execute('SELECT * FROM Trybesmith.Products')];
                    case 4:
                        selectedProducts = (_a.sent())[0];
                        products = selectedProducts;
                        expect(products).toEqual(expect.arrayContaining([expect.objectContaining(__assign(__assign({}, fakeProduct), { id: fakeProductId, orderId: 4 }))]));
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Será validado que é possível criar um pedido com sucesso com vários itens', function () {
        return __awaiter(this, void 0, void 0, function () {
            var loggedUserId, orderId, fakeProductId, fakeProduct2Id, fakeProduct, fakeProduct2, result, selected, orders, selectedProducts, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loggedUserId = 3;
                        orderId = 4;
                        fakeProductId = 6;
                        fakeProduct2Id = 7;
                        fakeProduct = {
                            name: 'Mate Couro em garrafa de ouro',
                            amount: '0.5 diamante',
                        };
                        fakeProduct2 = {
                            name: 'Porção de Falafel +7',
                            amount: '1 moeda de prata',
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/products').send(fakeProduct).set('Authorization', token)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/products').send(fakeProduct2).set('Authorization', token)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/orders').send({
                                productsIds: [fakeProductId, fakeProduct2Id],
                            }).set('Authorization', token)];
                    case 3:
                        result = _a.sent();
                        expect(result.statusCode).toBe(201);
                        expect(result.body).toBeDefined();
                        expect(result.body.userId).toBeDefined();
                        expect(result.body.userId).toBe(loggedUserId);
                        expect(result.body.productsIds).toBeDefined();
                        expect(result.body.productsIds).toEqual([fakeProductId, fakeProduct2Id]);
                        return [4 /*yield*/, connection_1.default.execute('SELECT * FROM Trybesmith.Orders')];
                    case 4:
                        selected = (_a.sent())[0];
                        orders = selected;
                        expect(orders).toEqual(expect.arrayContaining([expect.objectContaining({ userId: loggedUserId, id: orderId })]));
                        return [4 /*yield*/, connection_1.default.execute('SELECT * FROM Trybesmith.Products')];
                    case 5:
                        selectedProducts = (_a.sent())[0];
                        products = selectedProducts;
                        expect(products).toEqual(expect.arrayContaining([
                            expect.objectContaining(__assign(__assign({}, fakeProduct), { id: fakeProductId })),
                            expect.objectContaining(__assign(__assign({}, fakeProduct2), { id: fakeProduct2Id })),
                        ]));
                        return [2 /*return*/];
                }
            });
        });
    });
});
