const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {};

Post.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        creator_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
              },
        },

    },
    {
        sequelize,
        // timestamps: false,
        // freezeTableName: true,
        // underscored: true,
        // modelName: 'post',
      }
);

module.exports = Post;
