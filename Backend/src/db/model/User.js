const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error(`Email is invalid. Try again!`);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), isAdmin: user.isAdmin },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};
UserSchema.statics.findByCredentials = async function ({
  password,
  email,
  username,
} = {}) {
  try {
    if ((!email && !username) || !password) {
      throw Error(`Email/ username and password are required to login!`);
    }
    let user;
    if (email) user = await User.findOne({ email });
    if (username) user = await User.findOne({ username });
    if (!user) {
      throw Error(`Sorry, we can't find an account with this email address.`);
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) throw Error(`Incorrect password.`);

    return user;
  } catch (error) {
    throw error;
  }
};

UserSchema.statics.getProperty = async function () {
  return Object.keys(this.schema.obj);
};

UserSchema.pre("save", async function (next) {
  const user = this;

  // users changed new password
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
    console.log(`New password saved!`);
  }

  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
