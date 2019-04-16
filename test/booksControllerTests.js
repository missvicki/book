require('should');
const sinon = require('sinon');
const bookController = require('../controllers/booksController');

describe('Book Controller Tests', () => {
  describe('Post Tests', () => {
    it('should not allow an empty title on post', () => {
      const Book = function (book) { this.save = () => { }; };

      const request = {
        body: {
          author: 'Vicky'
        }
      };
      const response = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };
      const controller = bookController(Book);
      controller.post(request, response);

      response.status.calledWith(400).should.equal(true, `Bad Status ${response.status.args[0][0]}`);
      response.send.calledWith('Title is required').should.equal(true);
    });
    it('should not allow an empty author on post', () => {
      const Book = function (book) { this.save = () => { }; };

      const request = {
        body: {
          title: 'Vicky'
        }
      };
      const response = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };
      const controller = bookController(Book);
      controller.post(request, response);

      response.status.calledWith(400).should.equal(true, `Bad Status ${response.status.args[0][0]}`);
      response.send.calledWith('Author is required').should.equal(true);
    });
    it('should not allow an empty genre on post', () => {
      const Book = function (book) { this.save = () => { }; };

      const request = {
        body: {
          title: 'My Book',
          author: 'Vicky'
        }
      };
      const response = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };
      const controller = bookController(Book);
      controller.post(request, response);

      response.status.calledWith(400).should.equal(true, `Bad Status ${response.status.args[0][0]}`);
      response.send.calledWith('Genre is required').should.equal(true);
    });
  });
});
