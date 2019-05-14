const Peliharaan = require('../models/peliharaan');
const User = require('../models/user');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports ={
  index: async (req, res,next)=>{

    const peliharaans = await Peliharaan.find({});
    res.status(200).json(peliharaans);
},

    newPeliharaan: async (req, res, next) =>{
        const newPeliharaan = new Peliharaan(req.body);
        const peliharaans = await newPeliharaan.save();
        res.status(201).json(peliharaans);
},

    getPeliharaan:  async (req, res, next) =>{
        const {peliharaanId} = req.body;
        const peliharaans = await Peliharaan.find(peliharaanId);
        res.status(200).json(peliharaans);
        
    },
    replacePeliharaan:  async (req, res, next) =>{
      // enforce that req.body must contain all the fields
      const { peliharaanId } = req.params;
      const newPeliharaan = req.body;


      const result = await Peliharaan.findByIdAndUpdate(peliharaanId, newPeliharaan);
      console.log('result', result);
      //res.status(200).json(result);
      res.status(200).json({success: true});

  },

  updatePeliharaan:  async (req, res, next) =>{
      // req.body may contain any number of fields
      const { peliharaanId } = req.params;
      const newPeliharaan = req.body;


      const result = await Peliharaan.findByIdAndUpdate(peliharaanId, newPeliharaan);
      console.log('result', result);
      //res.status(200).json(result);
      res.status(200).json({success: true});

  },

  deletePeliharaan:  async (req, res, next) =>{
      // req.body may contain any number of fields
      const { peliharaanId } = req.params;
     
     const result = await Peliharaan.findByIdAndRemove(peliharaanId);
     res.send(204);
  },

  getUser:  async (req, res, next) =>{
    const { userId } = req.params;
    const user = await User.findById(userId).populate('peliharaans');
    console.log('user' , user);
    res.status(200).json(user.peliharaans);
  },

  newUser:  async (req, res, next) =>{
  const { userId } = req.params;
  //create a user
  const newPeliharaan = new Peliharaan(req.body);
  //Get User
  const user = await User.findById(userId);
  //Assign user
  newPeliharaan.iduser = user._id;
  console.log('user._id' , user._id);
  // // //Save the car
  //  await newPeliharaan.save();
  // // res.status(201).json(users);

  // //add car to the user's selly array 'peliharaans'
  // user.peliharaans.push(newPeliharaan);

  // //Save the user
  // await user.save();
  // res.status(201).json(newPeliharaan);
}

};