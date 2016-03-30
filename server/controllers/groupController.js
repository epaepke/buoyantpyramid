var path = require('path');
var UserModel = require('../models/userModel');
var Group = require('../models/groupModel');

var addUser = function(req, res, next) {
  // roles:
  //  admin, member, pending
  var groupId = req.params.id;
  var userId = req.body.userId;
  var role = req.body.role;

  Group.addUser(groupId, userId, role)
  .then(function(user) {
    res.json(user);
  })
  .catch(function (error) {
    next(error);
  });
};

var createGroup = function(req, res, next) {
  var name = req.body.name;

  Group.createGroup(name)
  .then(function(group) {
    res.json(group);
  })
  .catch(function (error) {
    next(err);
  });
};

var getUsers = function(req, res, next) {
  // roles:
  //  admin, member, pending
  var groupId = req.params.id;

  Group.getUsers(groupId)
  .then(function (users) {
    res.json(users);
  })
  .catch(function(err) {
    next(err);
  });
};

var getPlaylists = function(req, res, next) {
  var groupId = req.params.id;

  Group.getGroup(groupId)
  .then(function(group) {
    group.getPlaylists()
    .then(function (playlists) {
      res.json(playlists);
    });
  })
  .catch(function(err) {
    next(err);
  });
};

var getSongs = function(req, res, next) {
  var groupId = req.params.id;

  Group.getGroup(groupId)
  .then(function(group) {
    group.getSongs()
    .then(function (songs) {
      res.json(songs);   
    });
  })
  .catch(function(err) {
    next(err);
  });
};

var removeUser = function(req, res, next) {
  var groupId = req.params.gid;
  var userId = req.params.uid;

  Group.removeUser(groupId, userId)
  .then(function(response) {
    res.json(response);
  })
  .catch(function(error) {
    next(error);
  });
};

var deleteGroup = function(req, res, next) {
  var groupId = req.params.id;

  Group.deleteGroup(groupId)
  .then(function(response) {
    res.json(respons);
  })
  .catch(function(error) {
    next(error);
  });
};

// Redirects to either send email invite or add user function
var sendInvite = function(req, res, next) {
  var email = req.body.email;
  var groupId = req.params.id;

  UserModel.getUser({email: email})
  .then(function (user) {
    if (user) {
      return Group.getUserGroup(user.id, groupId)
      .then(function (userGroup) {
        if (userGroup) {
          res.status(400).json('User is already a member');
        } else {
          Group.addUser(groupId, user.id, 'pending')
          .then(function (user) {
            res.json(user);
          });
        }
      });
    } else {
      return Group.sendEmailInvite(groupId, email)
      .then(function (result) {
        res.json(result);
      });
    }
  })
  .catch(function (error) {
    res.json(error);
  });
};

var updateGroupInfo = function(req, res, next) {
  var groupId = req.body.id;
  var fields = req.body;

  Group.updateInfo(groupId, fields)
  .then(function(result) {
    res.json(result[1][0]);
  })
  .catch(function(error) {
    next(error);
  });
};

var updateUserRole = function(req, res, next) {
  var groupId = req.params.gid;
  var userId = req.params.uid;
  var role = req.body.role;

  Group.updateUserRole(groupId, userId, role)
  .then(function(response) {
    res.json(response);
  })
  .catch(function(error) {
    next(error);
  });
};

module.exports = {
  addUser: addUser,
  createGroup: createGroup,
  // getBanner: getBanner,
  getUsers: getUsers,
  getPlaylists: getPlaylists,
  getSongs: getSongs,
  removeUser: removeUser,
  deleteGroup: deleteGroup,
  sendInvite: sendInvite,
  updateGroupInfo: updateGroupInfo,
  updateUserRole: updateUserRole
};
