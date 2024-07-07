const bcryptjs = require('bcryptjs')
const User = require('../models/user.model.js')
const test = (req,res)=>{
    res.json({
        message: 'API is working',
    })
}

const updateUser = async(req,res,next)=>{
    try{
    // console.log(req.user)
    if(req.user.id !== req.params.userId){
        return res.status(400).json({
            success:false,
            message: 'You are not allowed to update this user'
        })
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return res.status(400).json({
                success: false,
                message: 'Password must be atleast 6 characters',
            })
        }
        req.body.password = bcryptjs.hashSync(req.body.password,10
        );
    }
    if(req.body.username){
        if(req.body.username.length<7 || req.body.username.length>20)
            return res.status(400).json({
        success: false,
        message: 'Username must be between 7 and 20 characters'
    })
    if(req.body.username.includes(' '))
        return res.status(400).json({
            success:false,
            message: 'Username cannot have spaces'
    })
    if(req.body.username !== req.body.username.toLowerCase())
        return res.status(400).json({
    success: false,
    message: 'Username must be lowercase'})
    if(req.body.username.match(/^[a-zA-Z0-9]+$/) === false)
        return res.status(400).json({
            success: false,
            message: 'Username can only have letters and numbers'
        })
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
        $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password
        }
    },{new:true})
    const {password, ...rest} = updatedUser._doc;
    res.status(200).json(rest);

    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {test,updateUser}