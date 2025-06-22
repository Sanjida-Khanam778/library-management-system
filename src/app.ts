import express from 'express';
import bookRoutes from './app/routes/book.route';
import borrowRoutes from './app/routes/borrow.route';
import errorHandler from './app/middlewares/error.middleware';

const app = express();

app.use(express.json());

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

app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.use(errorHandler);

export default app;
