const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const createToken = (_id) => {
  return jwt.sign({ _id }, secret, { expiresIn: "3d" });
};

//login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const user_id = user._id;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const picturePath = user.picturePath;
    const friends = user.friends;
    const location = user.location;
    const occupation = user.occupation;
  

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token,user_id,firstName,lastName,picturePath,friends,location,occupation  });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//signup user

const signupUser = async (req, res) => {
  
  const { email, password,firstName,lastName,picturePath,friends,location,occupation  } = req.body;

  try {
    const user = await User.signup(email, password,firstName,lastName,picturePath,friends,location,occupation );

    //create a token
    const token = createToken(user._id);
    const user_id = user._id;

    res.status(200).json({ email, token ,user_id,firstName,lastName,picturePath,friends,location,occupation });
  } catch (error) {
    
    res.status(400).json({ error: error.message });
  }
};


module.exports = { loginUser, signupUser };
