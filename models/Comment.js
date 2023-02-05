const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'user',
        //         key: 'id',
        //       },
        // },
        // postId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'post',
        //         key: 'id',
        //       },
        // },
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