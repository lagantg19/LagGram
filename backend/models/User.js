const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    friends: {
      type: Array,
      default: [],
    },
    picturePath: {
      type: String,
      default: "",
    },
    location: String,
    occupation: String,
  },

  { timestamps: true }
);

//static signup method

userSchema.statics.signup = async function (email, password,firstName,lastName,picturePath,friends,location,occupation ) {
  //you cant use arrow function when your using this.-->ur using this cause to use the model..thats why

  //validation
  if (!email || !password) {
    throw Error("All field must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10); //extra things to password(append)
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash,firstName,lastName,picturePath,friends,location,occupation});

  return user;
};

//static login method

userSchema.statics.login = async function (email, password) {
  //not arrow function causeu will use keyword this

  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
