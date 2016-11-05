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
.controller('SearchDetailCtrl', function($scope, $stateParams, Books) {
  $scope.book = Books.get($stateParams.isbnId);
});
