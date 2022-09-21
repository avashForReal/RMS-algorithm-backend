const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

//VALIDATION OF USER INPUTS PREREQUISITES
const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  fname: Joi.string().min(3).required(),
  lname: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

//SIGNUP USER
const userRegister = async (req, res) => {
  //CHECKING IF USER EMAIL ALREADY EXISTS
  const emailExist = await User.findOne({ email: req.body.email });
  // IF EMAIL EXIST THEN RETURN
  if (emailExist) {
    res.status(400).send("Email already exists");
    return;
  }

  //HASHING THE PASSWORD

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //ON PROCESS OF ADDING NEW USER

  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    //VALIDATION OF USER INPUTS

    const { error } = await registerSchema.validateAsync(req.body);
    //WE CAN JUST GET THE ERROR(IF EXISTS) WITH OBJECT DECONSTRUCTION

    //   IF ERROR EXISTS THEN SEND BACK THE ERROR
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    } else {
      //NEW USER IS ADDED

      const saveUser = await user.save();
      res.status(200).send("user created");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

//LOGIN USER

const userLogin = async (req, res) => {
  console.log("called")
  //CHECKING IF USER EMAIL EXISTS
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send({ message: "email not found" });

  //CHECKING IF USER PASSWORD MATCHES

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ message: "incorrect password" });

  try {
    //VALIDATION OF USER INPUTS

    const { error } = await loginSchema.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      //SENDING BACK THE TOKEN
      const token = jwt.sign({ _id: user._id, fname: user.fname, lname: user.lname, email: user.email }, process.env.TOKEN_SECRET, {
        expiresIn: '3d'
      });
      return res.status(200).json({ accessToken:token, user});
      // res.header("auth-token", token).send(token);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  userRegister,
  userLogin
};