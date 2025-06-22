"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.borrowBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const borrowBook = async (req, res, next) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = await book_model_1.default.findById(bookId);
        if (!book) {
            res.status(404).json({ success: false, message: 'Book not found', error: 'Not Found' });
            return;
        }
        if (book.copies < quantity) {
            res.status(400).json({ success: false, message: 'Not enough copies available', error: 'Insufficient copies' });
            return;
        }
        book.copies -= quantity;
        book.updateAvailability();
        await book.save();
        const borrow = await borrow_model_1.default.create({ book: bookId, quantity, dueDate });
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        });
    }
    catch (err) {
        next(err);
    }
};
exports.borrowBook = borrowBook;
const getBorrowSummary = async (req, res, next) => {
    try {
        const summary = await borrow_model_1.default.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo'
                }
            },
            { $unwind: '$bookInfo' },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn'
                    },
                    totalQuantity: 1
                }
            }
        ]);
        res.json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getBorrowSummary = getBorrowSummary;
