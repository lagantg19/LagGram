const express=require('express');
const router=express.Router();
const requireAuth=require('../middleware/requireAuth');  
const {getUser,getUserFriends,addRemoveFriend}=require('../controllers/user');


//middleware
router.use(requireAuth);

//get particular user

router.get('/:id',getUser);

//get User Friends

router.get('/:id/friends',getUserFriends);

addRemoveFriend

router.patch('/:id/:friendId',addRemoveFriend);

module.exports = router;
