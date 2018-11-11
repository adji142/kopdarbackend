var mongosee = require('mongoose');

var userschema = new mongosee.Schema({
    name: String,
    userid: String,
    updated_at: {type: Date,default:Date.now},
});

userschema.statics.FindOrCreate = require('find-or-create');


module.exports = mongosee.model('users',userschema);