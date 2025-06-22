import mongoose from 'mongoose';
import Book from '../app/models/book.model';
import 'dotenv/config';

const sampleBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    genre: 'Fiction',
    publicationYear: 1925,
    copies: 5,
    available: true
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0446310789',
    genre: 'Fiction',
    publicationYear: 1960,
    copies: 3,
    available: true
  },
  {
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0451524935',
    genre: 'Dystopian',
    publicationYear: 1949,
    copies: 4,
    available: true
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0141439518',
    genre: 'Romance',
    publicationYear: 1813,
    copies: 2,
    available: true
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '978-0547928241',
    genre: 'Fantasy',
    publicationYear: 1937,
    copies: 6,
    available: true
  }
];

const seedDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/library-management';
    
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Insert sample data
    const books = await Book.insertMany(sampleBooks);
    console.log(`Inserted ${books.length} books`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 