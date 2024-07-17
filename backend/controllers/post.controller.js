const Post = require("../models/post.model.js");

const create = async(req,res)=>{
    try{
        if(!req.user.isAdmin){
            return res.status(403).json({
                success: false,
                message: 'You are not allowed to create a post'
            })
        }
            if(!req.body.title || !req.body.content){
                return res.status(403).json({
                    success: false,
                    message: 'Please provide all required details'
                })
            }
            const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost)
        } 
        catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {create}