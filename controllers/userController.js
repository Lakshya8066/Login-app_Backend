const express = require('express');
const bcrypt = require('bcryptjs');
var router = express.Router();
var ObjectId=require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

var { users } = require('../models/user');


//localhost:3000/user
// router.get('/', (req, res) => {
//     users.find((err, docs) => {
//         if (!err) { res.send(docs); }
//         else { console.log("Error in retriving user: ", JSON.stringify(err, undefined, 2)); }
//     });
// });


//for user registration
router.post('/', async (req, res) => {
    console.log(req.body);

    const {name, phoneNumber, emailId, organizationName, username, password: plainTextPassword} = req.body;

    const password = await bcrypt.hash(plainTextPassword, 10);
    await users.create({name, phoneNumber, emailId, organizationName, username, password})
    .then((user) => {
        console.log("User Created");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err))
});


//for user login
router.get('/auth', async (req,res) => {
    console.log("connected to login");
    const { username, password } = req.body;

    const user = await users.findOne({username}).lean();
    //console.log(user._id);
    if(await bcrypt.compare(password, user.password))
    {//username password combination is success
        console.log("Comparision success");

        const JWT_SECRET = 'grqewghdfsbvafdhetrwhgrswev32541%$&@#Pyurfkjyru:I*Y)O{$#513fgreFGEQRWg@ggasedghr@sdbadf';
        const token = jwt.sign({
            id: user._id, 
            username: user.username
        }, JWT_SECRET
        );
        
        return res.json({status: 'ok', data: token});

    }
});

module.exports = router;