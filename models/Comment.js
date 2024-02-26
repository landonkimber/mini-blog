
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection'); 


class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Post',
        key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'User',
        key: 'id',
    },
  }
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'Comment'
});

module.exports = Comment;
