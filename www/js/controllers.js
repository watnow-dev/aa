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
.controller('SearchsCtrl', function($scope, Books, $cordovaBarcodeScanner) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var vm = this;

  vm.scan = function(){
    $ionicPlatform.ready(function() {
      $cordovaBarcodeScanner
      .scan()
      .then(function(result) {
        // Success! Barcode data is here
        vm.scanResults = "We got a barcode\n" +
        "Result: " + result.text + "\n" +
        "Format: " + result.format + "\n" +
        "Cancelled: " + result.cancelled;
      }, function(error) {
        // An error occurred
        vm.scanResults = 'Error: ' + error;
      });
    });
  };

  vm.scanResults = '';

  $scope.books = Books.all();
  $scope.remove = function(book) {
    Books.remove(book);
  };
})
.controller('SearchDetailCtrl', function($scope, $stateParams, Books, $http) {
  var book = {};
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
