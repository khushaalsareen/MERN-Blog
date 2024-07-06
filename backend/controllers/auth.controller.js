const  User  = require("../models/user.model.js");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

const signin = async (req,res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password)
            return res.status(400).json({
        success: false,
        message: "Please enter all the fields"     
    })

    const validUser = await User.findOne({email})
    if(!validUser)
        return res.status(400).json({
    success:false,
    message: 'No such user exists'
})
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword)
        return res.status(400).json({
    success: false,
    message: 'Invalid Password'
    })

    const token = jwt.sign(
        {id: validUser._id}, process.env.JWT_SECRET
    )

    const {password: pass, ...rest} = validUser._doc;

    res.status(200).cookie('access_token',token,{
        httpOnly: true
    }).json(rest)
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const google = async (req, res) => {
    try {
        const { email, name, googlePhotoUrl } = req.body;

        const user = await User.findOne({ email });

        if(user){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

            const {password: pass, ...rest} = user._doc;

            res.status(200).cookie('access_token',token,{
                httpOnly: true
            }).json(rest)
        } else{
            const generatedPassword = Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(4),
                email,
                password:hashedPassword,
                profilePicture: googlePhotoUrl
            })
            await newUser.save()
            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);

            const {password: pass, ...rest} = newUser._doc;

            res.status(200).cookie('access_token',token,{
                httpOnly: true
            }).json(rest)
        }


        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}


module.exports = {signup,signin,google}