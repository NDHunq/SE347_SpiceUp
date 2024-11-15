const connectToDb = require('../../config/db/db')
const Recipe = require('../../models/recipe/recipe')
const RecipeStep = require('../../models/recipe/recipeStep')
const Comment = require('../../models/feedBack/comment')
//const FeedBack = require("../../models/feedBack/feedBack")

class RecipeCommentController {
    async postComment(req,res) {
        try {
            await connectToDb()

            const {recipeId, email, content, image} = req.body

            const comment = new Comment({
                recipeId: recipeId,
                email: email,
                content: content,
                image: image
            })

            await comment.save()

            console.log(comment)

            res.status(200).send("post comment successfully")
        } catch(e) {
            console.log("Some errors happen", e)
        }        
    }

    async getComment(req,res) {
        try {
            await connectToDb()

            const {id} = req.query

            const comment = await Comment.find({
                recipeId: id,
                isDeleted: false
            })



            console.log(comment)

            res.status(200).json({
                comments: comment
            })
        } catch(e) {
            console.log("Some errors happen", e)
        }        
    }


    async editComment(req, res) {
        try {
            await connectToDb()

            const {id} = req.params
            const {content} = req.body
            const updateTime = new Date()

            await Comment.updateOne({_id: id},{
                content: content,
                updatedAt: updateTime
            })

            res.status(200).send("Edit comment successfully")
        } catch(e) {
            console.log("Some errors happen", e)
        }
    }

    async deleteComment(req,res) {
        try {
            connectToDb()
            const {id} = req.params
            const comment = await Comment.findOne({_id:id})

            comment.isDeleted = true
            comment.save()

            res.status(200).send("Delete comment successfully")
        } catch(e) {
            res.status(500).send("Internal server error")
            console.log("Error", e)
        }
    }
}

module.exports = new RecipeCommentController