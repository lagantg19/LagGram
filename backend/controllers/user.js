const mongoose = require("mongoose");
const User = require("../models/User");

//getUser

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//get all user


const getAll=async(req,res)=>{
  
  try{
    const users=await User.find({});
    
    res.status(200).json(users);
  }catch(err){
    res.status(400).json({error:err.message})
  }
}

//getUserFriends

const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => {
        return User.findById(id);
      })
    );
    const formattedFriends = friends.map((friend) => {
      return {
        firstName: friend.firstName,
        lastName: friend.lastName,
        picturePath: friend.picturePath,
        user_id: friend._id,
      };
    });
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => {
        return id != friendId;
      });
      friend.friends = friend.friends.filter((id) => {
        return id != id;
      });
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => {
        return User.findById(id);
      })
    );
    const formattedFriends = friends.map((friend) => {
      return {
        firstName: friend.firstName,
        lastName: friend.lastName,
        picturePath: friend.picturePath,
        user_id: friend._id,
      };
    });
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getAll

};
