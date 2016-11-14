angular.module('starter.services', [])

.factory('Books', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var books = [{
    id: 9784873117584,
    title: 'Ben Sparrow',
    introduction: 'You on your way?',
    img: 'http://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/7584/9784873117584.jpg?_ex=200x200'
  }, {
    id: 9784764905160,
    title: 'Max Lynx',
    introduction: 'Hey, it\'s me',
    img: 'http://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/5160/9784764905160.jpg?_ex=200x200'
  }, {
    id: 9784339028515,
    title: 'Adam Bradleyson',
    introduction: 'I should buy a boat',
    img: 'http://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/8515/9784339028515.jpg?_ex=200x200'
  }, {
    id: 9784873117683,
    title: 'Perry Governor',
    introduction: 'Look at my mukluks!',
    img: 'http://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/7683/9784873117683.jpg?_ex=200x200'
  }, {
    id: 9784873117560,
    title: 'Mike Harrington',
    introduction: 'This is wicked good ice cream.',
    img: 'http://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/7560/9784873117560.jpg?_ex=200x200'
  }, {
    id: 9784822277420,
    title: 'Mike Harrington',
    introduction: 'This is wicked good ice cream.',
    img: 'http://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/7420/9784822277420.jpg?_ex=200x200'
    
  }];

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
    }
  };
});
