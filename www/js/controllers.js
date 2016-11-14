root = 'https://isbn-api-123.herokuapp.com/';//https://library-api-a4geru.c9users.io/';

angular.module('starter.controllers', [])

.controller('TopCtrl', function($scope) {})

.controller('OptionCtrl', function($scope) {
})

.controller('TermCtrl', function($scope) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  }
})
.controller('SearchsCtrl', function($scope, Books) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.books = Books.all();
  $scope.remove = function(book) {
    Books.remove(book);
  };
})
.controller('SearchDetailCtrl', function($scope, $stateParams, Books, $http) {
  $scope.book = "";
  $http({
    method: 'GET',
    url: root + "isbn/" + $stateParams.isbnId
  }).then(function successCallback(response) {
    $scope.book = response.data;
    console.log(response.data);
    console.log("success");
          
  }, function errorCallback(response) {
    $scope.book = {  
      id: -1,
      title: 'Server connect error',
      introduction: response,
      img: ''
    }

  });
});
