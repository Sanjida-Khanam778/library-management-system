# Library Management API

A robust RESTful API for managing a library's book inventory and borrowing system, built with Express, TypeScript, and MongoDB.

## Features

- **CRUD Operations for Books**: Full support for creating, reading, updating, and deleting books.
- **Advanced Filtering**: Filter books by genre, sort results, and limit the number of records returned.
- **Borrowing System**: Borrow books with validation for availability and automatic inventory updates.
- **Aggregation Pipeline**: Get a summary of all borrowed books, grouped by book title and total quantity.
- **Strong Validation**: Enforces data integrity with Mongoose schema validation.
- **Custom Error Handling**: Standardized and detailed error responses.

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/library-management.git
    cd library-management
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables.

    ```env
    PORT=5000
    MONGODB_URI=mongodb://127.0.0.1:27017/library-management
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000`.

5.  **Build for production:**
    ```bash
    npm run build
    ```

6.  **Start the production server:**
    ```bash
    npm start
    ```

## API Endpoints

### Book Endpoints

---

#### 1. Create a New Book
- **POST** `/api/books`
- **Description**: Adds a new book to the library.
- **Request Body**:
  ```json
  {
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Book created successfully",
    "data": { ... }
  }
  ```

#### 2. Get All Books
- **GET** `/api/books`
- **Description**: Retrieves a list of all books. Supports filtering, sorting, and pagination.
- **Query Parameters**:
  - `filter`: (string) Filter by genre (e.g., `FANTASY`).
  - `sortBy`: (string) Field to sort by (e.g., `createdAt`).
  - `sort`: (string) Sort order: `asc` or `desc`.
  - `limit`: (number) Number of results to return.
- **Example Query**: `/api/books?filter=SCIENCE&sort=desc&limit=5`
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Books retrieved successfully",
    "data": [ ... ]
  }
  ```

#### 3. Get a Single Book
- **GET** `/api/books/:bookId`
- **Description**: Retrieves a single book by its ID.
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Book retrieved successfully",
    "data": { ... }
  }
  ```

#### 4. Update a Book
- **PUT** `/api/books/:bookId`
- **Description**: Updates a book's details.
- **Request Body**:
  ```json
  {
    "copies": 50
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Book updated successfully",
    "data": { ... }
  }
  ```

#### 5. Delete a Book
- **DELETE** `/api/books/:bookId`
- **Description**: Deletes a book from the database.
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Book deleted successfully",
    "data": null
  }
  ```

### Borrow Endpoints

---

#### 1. Borrow a Book
- **POST** `/api/borrow`
- **Description**: Borrows a specified quantity of a book if available.
- **Request Body**:
  ```json
  {
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Book borrowed successfully",
    "data": { ... }
  }
  ```

#### 2. Get Borrowed Books Summary
- **GET** `/api/borrow`
- **Description**: Retrieves a summary of all borrowed books, grouped by book, using an aggregation pipeline.
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
      {
        "book": {
          "title": "The Theory of Everything",
          "isbn": "9780553380163"
        },
        "totalQuantity": 5
      }
    ]
  }
  ``` 