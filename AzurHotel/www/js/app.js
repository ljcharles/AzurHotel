// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.controller('ListController',['$scope','$http',function($scope,$http, $ionicLoading) {
  $http.get('http://androidfreshbtssio.esy.es/AzurHotelHTML5/hoteldata.php').then(function (response) {
      $scope.hotels = response.data.records;
  });
}])

.controller('InfoController',['$scope','$http',function($scope,$http) {
  var url = window.location.search;
  var param = url.substring(url.lastIndexOf("=")+1);
  $http.get('http://androidfreshbtssio.esy.es/AzurHotelHTML5/hoteldatasingle.php?id='+param).then(function (response) {
      $scope.hotel = response.data.records;
  });
}])

.controller('ReservationCtrl', function($scope, $http) {
    $scope.data = {};

    $scope.submit = function(){
        var link = 'http://androidfreshbtssio.esy.es/AzurHotelHTML5/reservation.php';

        $http.post(link, {numres : $scope.data.numres, codeacess : $scope.data.codeacess}).then(function (res){
            $scope.response = res.data;
        });
    };
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
