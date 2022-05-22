const {
    knex
} = require("../model/dbTable")
const path = require("path")
require('dotenv').config()
const fileUplod = require("express-fileupload")
postBlog = async (req, res) => {
    if (req.files) {
        var file = req.files.blog_image
        var file_2 = req.files.author_image
        a = path.join(__dirname, '..', 'public', 'images/')
        b = path.join(__dirname, '..', 'public', 'author/')
        await file_2.mv(b + file_2.name)
        file.mv(a + file.name)
    } else {
        console.log("got error while saving image")
    }
    let user = {
        blog_title: req.body.blog_title,
        blog_content: req.body.blog_content,
        author: req.body.author,
        author_image: process.env.APIURL + '/author/' + file_2.name,
        category_name: req.body.category_name,
        blog_image: process.env.APIURL + "/images/" + file.name,
    }
    console.log(user.author_image);
    console.log(user);
    knex('Blogs').insert(user)
        .then(() => {
            res.json({
                "success": true,
                status: 200,
                data: [user]
            })
        })
        .catch((err) => {
            console.log(err);
            res.send({
                message: err
            });

        })
}

getBlogByID = async (req, res) => {
    let id = req.params.id
    knex('Blogs').select("*").where("blog_id", "=", id)
        .then((data) => {

            
            if (data[0].views == null) {
                knex('Blogs').select("*").where("blog_id", "=", id).update({
                        views: 1
                    })
                    .then((data) => {
                        console.log(data)
                    }).catch((err) => {
                        console.log(err)
                    })
            } else {
                knex('Blogs').select("*").where("blog_id", "=", id).update({
                        views: (data[0].views) + 1
                    })
                    .then((data) => {

                        
                        knex('Blogs').select("*").where("blog_id", "=", id)
                            .then((data) => {
                                res.send(data)
                            }).catch((err) => {
                                console.log(err)
                            })
                    }).catch((err) => {
                        console.log(err)
                    })
            }

        })
        .catch((err) => {
            console.log(err);
        })
}



postRating = (req, res) => {
    let id = req.params.id
    let rating = req.body.rating
    knex('Blogs').select("*").where("blog_id", "=", id)
        .then((data) => {
            if (rating <= 5) {
                if (data[0].rating == null) {
                    knex('Blogs').select("*").where("blog_id", "=", id).update({
                            rating: rating
                        })
                        .then((data) => {
                            // console.log(data)
                            res.send("ok")
                        }).catch((err) => {
                            console.log(err)
                        })
                    // res.send(data)
                } else {
                    average_rating = (rating + data[0].rating) / 2
                    console.log(average_rating)
                    knex('Blogs').select("*").where("blog_id", "=", id).update({
                            rating: average_rating
                        })
                        .then((data) => {
                            // console.log(data)
                            res.send("ok")
                        }).catch((err) => {
                            console.log(err)
                        })
                    // res.send(data)
                }
            } else {
                res.send("rating should be less than or equal to 5")
            }
        })

        .catch((err) => {
            console.log(err);
        })
}

getAllBlog = (req, res) => {
    const page = req.query.page
    const limit = req.query.limit
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    knex.select("*").from("Blogs")
        .then((data) => {
            const result = data.slice(startIndex, endIndex)
            console.log(data);
            res.json({
                "success": true,
                status: 200,
                data: result
            })
        })

        .catch((er) => {
            console.log(er);
        })
}

getBlogByCategory = (req, res) => {
    let id = req.params.id
    knex('Blogs').select("*").where("category_name", "=", id).then((data) => {
        console.log(data);
        res.send({
            "success": true,
            status: 200,
            data: data
        })
    }).catch((err) => {
        // console.log(err);
        res.json({
            message: err
        })
    })
}


updateBlog = async (req, res) => {
    if (req.files) {
        var file = req.files.blog_image
        var file_2 = req.files.author_image
        a = path.join(__dirname, '..', 'public', 'images/')
        b = path.join(__dirname, '..', 'public', 'author/')
        await file_2.mv(b + file.name)
        file.mv(a + file.name)
    } else {
        console.log("got error while saving image")
    }
    let id = req.params.id
    knex('Blogs').update({
            blog_title: req.body.blog_title,
            blog_content: req.body.blog_content,
            author: req.body.author,
            author_image: process.env.APIURL + '/author/' + file_2.name,
            blog_image: process.env.APIURL + "/images/" + file.name,
        }).where("blog_id", "=", id)
        .then((data) => {
            console.log(data);
            res.send(200)
        }).catch((err) => {
            console.log(err);
            res.json({
                message: err
            })
        })
}


module.exports = {
    getBlogByID,
    postBlog,
    getAllBlog,
    postRating,
    getBlogByCategory,
    updateBlog
}