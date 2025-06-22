import mongoose from 'mongoose';
import app from './app';
import 'dotenv/config';
import { Request, Response, NextFunction, RequestHandler } from 'express';

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/library-management';

mongoose.connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
    process.exit(1);
  });

export const getBookById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  // ...
};
