"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = __importDefault(require("./app/routes/book.route"));
const borrow_route_1 = __importDefault(require("./app/routes/borrow.route"));
const error_middleware_1 = __importDefault(require("./app/middlewares/error.middleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Library Management API',
        version: '1.0.0',
        endpoints: {
            books: '/api/books',
            borrow: '/api/borrow'
        }
    });
});
app.use('/api/books', book_route_1.default);
app.use('/api/borrow', borrow_route_1.default);
app.use(error_middleware_1.default);
exports.default = app;
