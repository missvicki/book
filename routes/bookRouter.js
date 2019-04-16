/* eslint-disable no-param-reassign */
const express = require('express');
const booksController = require('../controllers/booksController');

const routes = (Book) => {
  const bookRouter = express.Router();
  const controller = booksController(Book);

  bookRouter.route('/books')
    .post(controller.post)
    .get(controller.get);
  bookRouter.use('/books/:bookId', (request, response, next) => {
    Book.findById(request.params.bookId, (error, book) => {
      if (error) {
        return response.send(error);
      }
      if (book) {
        request.book = book;
        return next();
      }
      return response.sendStatus(404);
    });
  });
  bookRouter.route('/books/:bookId')
    .get((request, response) => {
      const returnBook = request.book.toJSON();
      returnBook.links = {};
      const genre = request.book.genre.replace(' ', '%20');
      returnBook.links.FilterByThisGenre = `http://${request.headers.host}/api/books/?genre=${genre}`;
      response.json(returnBook);
    })
    .put((request, response) => {
      const { book } = request;
      book.title = request.body.title;
      book.author = request.body.author;
      book.genre = request.body.genre;
      book.read = request.body.read;
      request.book.save((error) => {
        if (error) {
          return response.send(error);
        }
        return response.json(book);
      });
    })
    .patch((request, response) => {
      const { book } = request;
      // eslint-disable-next-line no-underscore-dangle
      if (request.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete request.body._id;
      }
      Object.entries(request.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      request.book.save((error) => {
        if (error) {
          return response.send(error);
        }
        return response.json(book);
      });
    })
    .delete((request, response) => {
      request.book.remove((error) => {
        if (error) {
          return response.send(error);
        }
        return response.sendStatus(204);
      });
    });
  return bookRouter;
};

module.exports = routes;
