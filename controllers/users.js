const JWT = require('jsonwebtoken');
const User = require('../models/user');
const Peliharaan = require('../models/peliharaan');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ email });
    if (foundUser) { 
      return res.status(403).json({ error: 'Email is already in use'});
    }

    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    // Generate the token
    const token = signToken(newUser);

    // Respond with token
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ secret: "resource" });
  },

  getUserPeliharaan:  async (req, res, next) =>{
    const { userId } = req.params;
    const user = await User.findById(userId).populate('peliharaans');
    console.log('user' , user);
    res.status(200).json(user.peliharaans);
  },

  newUserPeliharaan:  async (req, res, next) =>{
  const { userId } = req.params;
  //create a user
  const newPeliharaan = new Peliharaan(req.body);
  //Get User
  const user = await User.findById(userId);
  //Assign seller
  newPeliharaan.iduser = user._id;
  console.log('user' , user);
  // //Save the car
  //  await newPeliharaan.save();
  // // res.status(201).json(users);

  // //add car to the user's selly array 'peliharaans'
  // user.peliharaans.push(newPeliharaan);

  // //Save the user
  // await user.save();
  // res.status(201).json(newPeliharaan);
}
}