const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'creator_id'
});

User.belongsToMany(Post, {through: Comment});
Post.belongsToMany(User, {through: Comment});



module.exports = { User, Post };