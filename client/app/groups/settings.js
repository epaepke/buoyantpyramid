angular.module('jam.groupSettings', [])

.controller('SettingsController', ['$scope', '$timeout', 'Upload', 'Users', 'Groups', 'UploadFactory', 'Songs', function ($scope, to, Up, Users, Groups, UploadFactory, Songs) {
  $scope.user = {};
  $scope.group = {};
  $scope.sendingInvite = false;
  $scope.playable = Songs.getPlayable();
  $scope.inviteError = '';

  Users.getUserData()
  .then(function (user) {
    $scope.user = user;
    $scope.group = user.currentGroup;
  })
  .catch(console.error);

  $scope.showBannerModal = function (file) {
    $scope.file = file;
    $scope.bannerModalShown = true;
  };

  $scope.hideBannerModal = function () {
    $scope.bannerModalShown = false;
  };

  $scope.sendInvite = function () {
    $scope.inviteError = '';
    $scope.sendingInvite = true;
    Groups.sendInvite($scope.group, $scope.invite)
    .then(function (res) {
      $scope.invite = "";
      $scope.inviteForm.$setPristine();
      Groups.getGroupsData($scope.user, true)
      .then(function () {
        $scope.sendingInvite = false;
      })
      .catch(console.error);
    })
    .catch(function (error) {
      $scope.inviteError = error.data;
      $scope.sendingInvite = false;
      console.error(error);
    });
  };

  $scope.updateGroupProfile = function () {
    Groups.updateInfo($scope.group)
    .then(function (updatedGroup) {
      _.extend($scope.user.currentGroup, updatedGroup);
    })
    .catch(console.error);
  };

  $scope.removeBanner = function () {
    Groups.updateInfo({
      id: $scope.group.id,
      bannerUrl: ''
    })
    .then(function (res) {
      _.extend($scope.user.currentGroup, res.data);
    })
    .catch(console.error);
  };

  var progressCallback = function (file, evt) {
    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
  };

  var errorCallback = function (response) {
    $scope.errorMsg = response.status + ': ' + response.data;
  };

  var successCallback = function (file, response) {
    $scope.result = response.data;
    $scope.group.bannerUrl = file.s3url;
    $scope.hideBannerModal();
    $scope.updateGroupProfile($scope.group);
  };

  $scope.upload = function (dataUrl, name) {
    var file = Up.dataUrltoBlob(dataUrl, name);
    $scope.file = file;
    if (file) {
      UploadFactory.upload(file, 'images', successCallback, errorCallback, progressCallback);
    }
  }; 
  
}]);
