const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error(`Email is invalid. Try again!`);
        }
      },
    },
    fname: {
      type: String,
      trim: true,
      default: "",
      validator(val) {
        if (val.length >= 64) {
          throw new Error(`Only 64 characters for first name`);
        }
      },
    },
    lname: {
      type: String,
      trim: true,
      default: "",
      validator(val) {
        if (val.length > 64) {
          throw new Error(`Only 64 characters for last name`);
        }
      },
    },
    bio: {
      type: String,
      trim: true,
      default: "",
      validator(val) {
        if (val.length > 256) {
          throw new Error(`Only 256 characters for bio`);
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    profileImg: {
      file: { type: String, default: "" },
      fileRef: {
        type: String,
        default: "",
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    watchList: {
      type: Array,
      default: [],
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
      // expiresIn: "60000",
      expiresIn: "1h",
    }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  // return { token, expIn: +jwt.decode(token).exp * 1000 };
  return { token };
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
  username,
} = {}) {
  try {
    if (!username || !password) {
      throw Error(`Email/ username and password are required to login!`);
    }
    let user = await User.findOne({ email: username });
    if (!user) user = await User.findOne({ username });
    if (!user) {
      throw Error(
        `Sorry, we can't find your account with this email/ username.`
      );
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      throw Error(`Your email/ username or password is incorrect!`);

    return user;
  } catch (error) {
    throw error;
  }
};
UserSchema.statics.getProperty = async function () {
  return Object.keys(this.schema.obj);
};
// pre vs post middleware
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
