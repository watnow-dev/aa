root = 'https://isbn-api-123.herokuapp.com/';//'https://library-api-a4geru.c9users.io/';

app = angular.module('starter.controllers', [])

app.controller('TopCtrl', function($scope, $http, $ionicSlideBoxDelegate) {
  var dt = new Date();
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  $scope.month = month[dt.getMonth()]
  $scope.day = dt.getDate();
  $scope.weekday = weekday[dt.getDay()];
  
  $scope.link_news = function(url){
    window.open('http://www.ritsumei.ac.jp/'+url, '_system', 'location=yes,enableViewportScale=yes');
  }
  
  $scope.judge = function(date){
    var month = dt.getMonth();
    var year = dt.getFullYear();
    if(date.substring(0,7) > year + "." + ( '0' + (dt.getMonth()-1) ).slice( -2 ))return true;
    else return false;
  }
  $http({
      method: 'GET',
      url: root + "info"
    }).then(function successCallback(response) {
      $scope.info = response['data'];
      console.log(JSON.stringify($scope.info['open']));
      create_calendar_DB();
      $ionicSlideBoxDelegate.update();
      return response['data'];
    }, function errorCallback(response) {
        
    }); 
})
.controller('OptionCtrl', function($scope) {
  $scope.link_to_term = function(){
    location.href="#/tab/option/term";
  }
  $scope.link_to_report = function(){
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSc9o4uPtPYwq2IS9eRnPKGrzLHGyu_YNomgG1ZybTyDVieCug/viewform');
  }
})
.controller('TermCtrl', function($scope) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  }
})
.controller('SearchsCtrl', function($scope) {
  $scope.remove = function(book) {
    Books.remove(book);
  };
  $scope.link_to_detail = function(isbn){
     location.href="#/tab/searchs/"+isbn;
  };
  $scope.link_to_library = function(){
     location.href="#/tab/search/library/";
  };
  $scope.link_to_all = function(){
     location.href="#/tab/search/all/";
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
    $scope.link_to_request = function(isbn){
     location.href="#/tab/request/"+isbn;
  };

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
})
.controller('TabSearchLibraryCtrl', function($scope, $stateParams, $http, Books){
  $scope.loading=0;
  $scope.want = function(word){
    $scope.loading=1;
    console.log(word);
    $http({
        method: 'GET',
        url: root + "search_library/" + word
      }).then(function successCallback(response) {
         console.log(response["data"]);
         Books.update(response["data"]['result'].map(function(e){return JSON.parse(e)}));
         location.href="#/tab/result/";
         console.log(Books.all());
      }, function errorCallback(response) {
          console.log(response);
    });  
    $scope.loading=0;
  }
})
.controller('TabSearchAllCtrl', function($scope, $stateParams, $http, Books){
  
  $scope.loading=0;
  $scope.want = function(word){
    $scope.loading=1;
    $http({
        method: 'GET',
        url: root + "search_all/" + word
      }).then(function successCallback(response) {
         console.log(response["data"]);
         Books.update(response["data"]);
         location.href="#/tab/result/";
      }, function errorCallback(response) {
          console.log(response);
    });  
    $scope.loading=0;
  }
})
.controller('ResultCtrl', function($scope, Books){
  console.log("result",Books.all());
  $scope.books = Books.all();
  console.log($scope.books);
  $scope.link_to_detail = function(isbn){
     location.href="#/tab/searchs/"+isbn;
  };
});