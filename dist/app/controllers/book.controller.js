"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const createBook = async (req, res, next) => {
    try {
        const book = await book_model_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createBook = createBook;
const getAllBooks = async (req, res, next) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
        const query = {};
        if (filter)
            query.genre = filter;
        const books = await book_model_1.default.find(query)
            .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
            .limit(Number(limit));
        res.json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllBooks = getAllBooks;
const getBookById = async (req, res, next) => {
    try {
        const book = await book_model_1.default.findById(req.params.bookId);
        if (!book) {
            res.status(404).json({ success: false, message: 'Book not found', error: 'Not Found' });
            return;
        }
        res.json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getBookById = getBookById;
const updateBook = async (req, res, next) => {
    try {
        const book = await book_model_1.default.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
        if (!book) {
            res.status(404).json({ success: false, message: 'Book not found', error: 'Not Found' });
            return;
        }
        res.json({
            success: true,
            message: 'Book updated successfully',
            data: book
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res, next) => {
    try {
        const book = await book_model_1.default.findByIdAndDelete(req.params.bookId);
        if (!book) {
            res.status(404).json({ success: false, message: 'Book not found', error: 'Not Found' });
            return;
        }
        res.json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteBook = deleteBook;
