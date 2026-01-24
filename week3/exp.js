const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ashish02aks_db_user:YAm0rPQt3i003MSm@cluster0.n5wh1v8.mongodb.net/userappnew');

const User = mongoose.model('Users',{name: String,email: String, password: String});

const user = new User({name:'Ashish Singh',email:"ahsih2@gmai.com",password:"123"});
user.save();