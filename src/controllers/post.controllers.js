const express = require('express');
const protect = require('../middlewares/protect');
const router= express.Router();

const Post= require('../model/post.model');

router.get("/",protect, async (req,res)=>{
    try{
        const per_page = req.query.per_page || 2;
        const page = req.query.page || 1;
        const skip = page < 0 ? 0 : (page - 1)*per_page;

        const posts = await Post.find().skip(skip).limit(per_page);

        if(!posts) return res.status(400).json({msg: "No posts found"}) 
        return res.status(200).json(posts);
        // return res.render("posts",{posts: posts})
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})




router.post("/", async (req,res)=>{
    try{
        // * Create post
        const doesPostExist= await Post.findOne({title: req.body.title})
        if(doesPostExist) return res.status(400).json({msg: "Duplicate post found"})
        const post = await Post.create({
            title: req.body.title,
            body: req.body.body,
            useremail: req.body.useremail
        })

        if(!post) return res.status(400).json({msg: "Post not created"})

        //200 ok
        return res.status(200).json(post)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})

module.exports = router;