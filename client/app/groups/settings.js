angular.module('jam.groupSettings', [])

.controller('SettingsController', ['$scope', '$timeout', 'Upload', 'Auth', 'Groups', function($scope, to, Up, Auth, Groups) {
  $scope.user = {};
  $scope.group = {};

  Auth.getUserData()
  .then(function (user) {
    $scope.user = user;
    $scope.group = user.currentGroup;
  })
  .catch(console.error);

  $scope.sendInvite = function() {
    Groups.sendInvite($scope.group.name, $scope.invite);
    console.log($scope.invite);
  };

  $scope.updateGroupProfile = function() {
    Groups.updateInfo($scope.group)
    .then(function(resp) {
      console.log(resp.data);
      $scope.user.currentGroup = resp.data;
    })
    .catch(console.error);
  };

  $scope.removeBanner = function() {
    Groups.updateInfo({
      id: $scope.group.id,
      bannerUrl: ''
    })
    .then(function(resp) {
      console.log(resp.data);
      $scope.user.currentGroup = resp.data;
    })
    .catch(console.error);
  };

  $scope.upload = function (dataUrl, name) {
    Up.upload({
      url: '/api/upload',
      data: {
        file: Up.dataUrltoBlob(dataUrl, name)
      },
    }).then(function (response) {
      to(function () {
        $scope.result = response.data;
        $scope.group.bannerUrl = name;
        $scope.updateGroupProfile($scope.group);
      });
    }, function (response) {
      if (response.status > 0) {
        $scope.errorMsg = response.status + ': ' + response.data; 
      } 
    }, function (evt) {
      $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
    });
  };
  
}]);