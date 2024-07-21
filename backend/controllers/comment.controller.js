const Comment = require("../models/comment.model");

const createComment = async(req,res)=>{
    try{
        const {content, postId, userId} = req.body;
        if(userId !== req.user.id){
            return res.status(403).json({
                success: false,
                message: 'You are not allowed to create this comment'
            })  
        }

        const newComment = new Comment({
            content,
            postId,
            userId
        })
        await newComment.save()

        return res.status(200).json(newComment)
        
    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getPostComments = async(req,res)=>{
    try{
      const comments = await Comment.find({postId: req.params.postId}).sort({
        createdAt: -1, // sorts comments in descending order based on createdAt timesatmp
      })
      return res.status(200).json(comments)

    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {createComment,getPostComments}