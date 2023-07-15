const express=require('express');
const router=express.Router();
const {getPosts,createPost,getuserPosts,likePost}=require('../controllers/post');
const requireAuth = require('../middleware/requireAuth');



//middleware
router.use(requireAuth);


//get all posts
router.get('/',getPosts);

//create post
router.post('/',createPost);

//get user posts
router.get('/:id',getuserPosts);

//like post
router.patch('/:id/like',likePost);

module.exports=router;
