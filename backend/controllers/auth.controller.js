const  User  = require("../models/user.model.js");
const bcryptjs = require('bcryptjs')

const signup = async(req,res)=>{
    try{
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: 'All fields are needed'
            })
        }
        const hashedPassword = bcryptjs.hashSync(password,10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save();

        return res.status(200).json({
            success: true,
            message: 'Signup succcessful'
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {signup}