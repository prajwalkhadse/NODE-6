const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here


router.get('/blog',async(req,res)=>{
    const page=Number(req.query.page), search= req.query.search;
    const data=await Blog.find({topic:search}).skip((page-1)*5).limit(5);
    res.json(200).json({status:"sucess", result: data})
})


// for post 
router.post('/blog', async (req, res) => {
    const { topic, description, posted_at, posted_by } = req.body;
    const data = new Blog({
        topic: topic,
        description: description,
        posted_at: posted_at,
        posted_by: posted_by,
    });
    await data.save();
    res.status(200).json({
        status: "success",
        result: data,
    });
})

// for put the post
router.put('/blog/:id', async (req, res) => {
    const id = req.params.id;
    const { topic, description, posted_at, posted_by } = req.body;
    const data = await Blog.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                topic: topic,
                description: description,
                posted_at: posted_at,
                posted_by: posted_by,
            }
        },
        { new: true }
    );
    res.status(200).json({
        status: "success",
        result: data,
    });
})

// for delete the post
router.delete('/blog/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Blog.findOneAndDelete(
        { _id: id }
    );
    res.status(200).json({
        status: "success",
        result: data,
    });
})



module.exports = router;