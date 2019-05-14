const Profile = require('../models/profiles');
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

                const profiles = await Profile.find({});
                res.status(200).json(profiles);
    },


    newProfile: async (req, res, next) =>{
            const newProfile = new Profile(req.body);
            const profiles = await newProfile.save();
            res.status(201).json(profiles);
    },

    getProfile:  async (req, res, next) =>{
        const {profilesId} = req.params;
        const profiles = await Profile.findById(profilesId);
        res.status(200).json(profiles);
        
    },
    replaceProfile:  async (req, res, next) =>{
        // enforce that req.body must contain all the fields
        const { profilesId } = req.params;
        const newProfile = req.body;


        const result = await Profile.findByIdAndUpdate(profilesId, newProfile);
        console.log('result', result);
        //res.status(200).json(result);
        res.status(200).json({success: true});

    },

    updateProfile:  async (req, res, next) =>{
        // req.body may contain any number of fields
        const { profilesId } = req.params;
        const newProfile = req.body;


        const result = await Profile.findByIdAndUpdate(profilesId, newProfile);
        console.log('result', result);
        //res.status(200).json(result);
        res.status(200).json({success: true});

    }
};