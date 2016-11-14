root = 'https://isbn-api-123.herokuapp.com/';//'https://library-api-a4geru.c9users.io/';

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
  $scope.isbn = $stateParams.isbnId;
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
})
.controller('RequestDetailCtrl', function($scope, $stateParams, $http) {
  $scope.reason = "";
  function changeUniversityView(buttonIndex) {
    if(buttonIndex == 2)return;
    $http({
        method: 'GET',
        url: root + "request/" + $stateParams.isbnId
      }).then(function successCallback(response) {
        url = "https://mylibrary.ritsumei.ac.jp/opac-service/srv_bok_req.php?LANG=0&psp=1&LOGIN_FIRST=1";
        url += "&ISBN=" + $stateParams.isbnId;
        url += "&DMDCRSPND=" + $scope.reason;
        url += "&TR=" + response["data"]["title"];
        url += "&AL=" + response["data"]["author"];
        url += "&PLANPRI=" + response["data"]["itemPrice"];
        url += "&PYEAR=" + response["data"]["salesDate"];
        url += "&PUB=" + response["data"]["publisherName"];           
        window.open(url, '_system', 'location=yes,enableViewportScale=yes');
              
      }, function errorCallback(response) {
          console.log(response);
    });
    
    // do something
  }

  $scope.want = function(reason){
     $scope.reason = reason;
      navigator.notification.confirm(
        '外部リンクへ飛びます',  // message
        changeUniversityView,         // callback
        '確認画面',            // title
        ['外部へ飛ぶ','戻る']     // buttonLabels
      );
  } 
});
