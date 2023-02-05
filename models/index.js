const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const sequelize = require('../config/connection');
const { DataTypes} = require('sequelize');

// User.hasMany(Post, {
//     onDelete: 'CASCADE',
// });



module.exports = { User, Post, Comment };