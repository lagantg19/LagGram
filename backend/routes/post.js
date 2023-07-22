const express=require('express');
const router=express.Router();
const {getPosts,createPost,getuserPosts,likePost,deletePost,addComment}=require('../controllers/post');
const requireAuth = require('../middleware/requireAuth');



//middleware
router.use(requireAuth);


//get all posts
router.get('/',getPosts);

//create post
router.post('/',createPost);

//get user posts
router.get('/:id',getuserPosts);
//delete post
router.delete('/:id',deletePost);

//like post
router.patch('/:id/like',likePost);

//add comment

router.patch('/:id/comment',addComment);


module.exports=router;
