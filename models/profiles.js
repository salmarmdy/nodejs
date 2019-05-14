const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    email   : String,
    name    : String,
    no_hp   : String
});


const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;