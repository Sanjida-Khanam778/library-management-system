import { Request, Response, NextFunction, RequestHandler } from 'express';
import Book from '../models/book.model';

export const createBook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book
    });
  } catch (err) {
    next(err);
  }
};

export const getAllBooks: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
    const query: any = {};
    if (filter) query.genre = filter;
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(Number(limit));
    res.json({
      success: true,
      message: 'Books retrieved successfully',
      data: books
    });
  } catch (err) {
    next(err);
  }
};

export const getBookById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found', error: 'Not Found' });
      return;
    }
    res.json({
      success: true,
      message: 'Book retrieved successfully',
      data: book
    });
  } catch (err) {
    next(err);
  }
};

export const updateBook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found', error: 'Not Found' });
      return;
    }
    res.json({
      success: true,
      message: 'Book updated successfully',
      data: book
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found', error: 'Not Found' });
      return;
    }
    res.json({
      success: true,
      message: 'Book deleted successfully',
      data: null
    });
  } catch (err) {
    next(err);
  }
}; 