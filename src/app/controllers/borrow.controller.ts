import { Request, Response, NextFunction, RequestHandler } from 'express';
import Book from '../models/book.model';
import Borrow from '../models/borrow.model';

export const borrowBook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = await Book.findById(bookId);
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
    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });
    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow
    });
  } catch (err) {
    next(err);
  }
};

export const getBorrowSummary: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await Borrow.aggregate([
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
  } catch (err) {
    next(err);
  }
}; 