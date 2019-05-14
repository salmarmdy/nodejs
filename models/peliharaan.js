const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peliharaanSchema = new Schema({
    jenis_peliharaan   : String,
    nama_peliharaan    : String,
    jenis_kelamin      : String,
    umur               : String,
    token              : String,
    warna_peliharaan   : String,
    iduser        :[{
        type    : Schema.Types.ObjectId,
        ref     :'user'
    }]
});


const Peliharaan = mongoose.model('peliharaan', peliharaanSchema);

module.exports = Peliharaan;