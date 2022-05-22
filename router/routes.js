const  router  = require("express").Router()
const { postBlog, getBlogByID, getAllBlog, postRating, getBlogByCategory } = require("../controller/Blog");


router.post("/post",postBlog)
router.get("/get/:id",getBlogByID)
router.get("/getblog",getAllBlog)
router.patch("/postRating/:id",postRating)
router.get("/getBlogByCategory/:id",getBlogByCategory)
router.put("/update/:id",updateBlog)



module.exports={router}