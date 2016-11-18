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
})
.factory('History', function() {
  if(localStorage["history"]!== undefined)
    histories = JSON.parse(localStorage["history"]);
  else
    histories = [];

  return {
    all: function() {
      return histories;
    },update: function(data=""){
      if(!localStorage["history"]){
        console.log("first time");
        localStorage["history"] = "[" + JSON.stringify(response.data) + "]";
      } else{
        console.log("second time");
  
        var db = localStorage["history"];
        var _isbn = data["isbn"];
        console.log(data["isbn"]);
        
        var find = true;
        for(var item in histories) {
          console.log(histories[item]["isbn"], _isbn);
          if(histories[item]["isbn"] == _isbn){
            find = false;
            console.log("not saved");
          }
        }
        if(find){
          console.log("upload");
          while(histories.length>=5){
            histories.shift();
          }
          console.log("saved");
          histories.push(data);
        }
    }

    }
  };
});