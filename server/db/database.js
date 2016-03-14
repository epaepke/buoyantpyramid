var config = require('../config/config.js'); 
var Sequelize = require('sequelize');

// Define table schemas
var User = config.db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {isEmail: {msg: 'Invalid email'}}
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salt: Sequelize.STRING,
  avatarURL: {
    type: Sequelize.STRING,
    defaultValue: "" // Complete
  }
});

var Group = config.db.define('group', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bannerUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://imgur.com/gallery/QI8f5gx' // Update
  }
});

var Song = config.db.define('song', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateRecorded: {
    type: Sequelize.DATE,
    allowNull: false
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'http://imgur.com/gallery/QI8f5gx' // Update
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://imgur.com/gallery/QI8f5gx' // Update
  }
});

var Playlist = config.db.define('playlist', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
  }
});

// Define join tables
var UserGroups = config.db.define('userGroups', {
  role: {
    type: Sequelize.STRING,
  }}, 
  {timestamps: false}
);

// Define associations
Group.belongsToMany(User, {through: UserGroups});
User.belongsToMany(Group, {through: UserGroups});

Group.hasMany(Song);
Song.belongsTo(Group);

// Sync models to define postgres tables and capture associations
User.sync()
  .then(Group.sync())
  .then(Song.sync())
  .then(Playlist.sync())
  .then(UserGroups.sync({force: true}));

module.exports = {
  User: User,
  Group: Group,
  Song: Song,
  Playlist: Playlist
};
