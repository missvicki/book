const booksController = (Book) => {
  const post = (request, response) => {
    const book = new Book(request.body);
    if (!request.body.title) {
      response.status(400);
      return response.send('Title is required');
    }
    if (!request.body.author) {
      response.status(400);
      return response.send('Author is required');
    }
    if (!request.body.genre) {
      response.status(400);
      return response.send('Genre is required');
    }
    book.save();
    response.status(201);
    return response.json(book);
  };
  const get = (request, response) => {
    const query = {};
    if (request.query.genre) {
      query.genre = request.query.genre;
    }
    Book.find(query, (error, books) => {
      if (error) {
        return response.send(error);
      }
      const returnBooks = books.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${request.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      return response.json(returnBooks);
    });
  };
  return { post, get };
};

module.exports = booksController;
