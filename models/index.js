// user has many posts
// relate through user id

// post belong to user
// relate through user id

// comment belongs to post and user
// relate through relevant

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id'
})

Post.belongsTo(User, {
  foreignKey: 'user_id'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})
  
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})
  
Comment.belongsTo(User, {
    foreignKey: 'user_id'
})


module.exports = {
  User, Post, Comment
};
