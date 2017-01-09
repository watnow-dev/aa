angular.module('starter.services', [])

.factory('Books', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var books = [];

  return {
    all: function() {
      return books;
    },
    remove: function(book) {
      books.splice(books.indexOf(book), 1);
    },
    get: function(isbnId) {
      for (var i = 0; i < books.length; i++) {
        if (books[i].id === parseInt(isbnId)) {
          return books[i];
        }
      }
      return null;
    },
    update: function(data){
      books = data;
    }
  };
});