const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer');
const authConfig = require('../config/auth');

const User = require('../models/User');
const BountyG = require('../models/Bounty');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req,res) => {
    const { email } = req.body;
    try{
        if(await User.findOne({ email })){
            return res.status(400).send({ error: 'User already exists'});
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.redirect('/');
        
    }catch(err){
        console.log(err);
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.post('/authenticate', async (req,res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return res.status(400).send({ error: 'User not found' });
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({ error: 'Invalid password' });
    }

    user.password = undefined;
    usermail = user.email;
    // try {
    //     const bountyP = await BountyG.find({ creator: usermail, status: 'andamento' });
    //     bounty1ID = bountyP[0]._id.toHexString();
    //     bounty2ID = bountyP[1]._id.toHexString();
    //     bounty3ID = bountyP[2]._id.toHexString();
    //     bounty4ID = bountyP[3]._id.toHexString();
    // }catch(error){error}

    
    // try {
    //     let bounty = await BountyG.find();
    //     bountyHOME = [];
    //     bounty.forEach((el)=>{
    //         bountyHOME.push(el._id.toHexString());
    //     });
    //     console.log(bountyHOME)
    // }catch(error){console.log(error);}

    return res.redirect('/home');
})

router.post('/forgotPassword', async (req,res) => {
    const { email } = req.body;

    try{
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).send({ error: 'User not found'});
        }

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set':{
                passwordResetToken: token,
                passwordResetExpires: now
            }
        });

        mailer.sendMail({
            to: email,
            from: 'ruhdra@gmail.com',
            template: 'auth/forgotPassword',
            context: { token }
        }, (err) => {
            if(err){
                return res.status(400).send({ error: 'Cannot send forgot password email'});
            }

            return res.send();
        })

    }catch(err){
        res.status(400).send({ error: 'Error on forgot password, try again' })
    }
})

router.post('/resetPassword', async (req,res) => {
    const { email, token, password } = req.body;

    try{
        const user =  await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires');

        if(!user){
            return res.status(400).send({ error: 'User not found' });
        }

        if(token !== user.passwordResetToken){
            return res.status(400).send({ error: 'Token invalid' })
        }

        const now = new Date();

        if(now > user.passwordResetExpires){
            return res.status(400).send({ error: 'Token expired, generate a new one' });
        }

        user.password = password;

        await user.save();
        res.send();

    }catch(err){
        res.status(400).send({ error: 'Cannot reset password, try again' })
    }
});

module.exports = app => app.use('/auth', router);