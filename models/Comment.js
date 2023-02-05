const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        //     references: {
        //         model: 'post',
        //         key: 'id',
        //       },
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        //     references: {
        //         model: 'post',
        //         key: 'id',
        //       },
        },
        comment_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
    },
);


module.exports = Comment;