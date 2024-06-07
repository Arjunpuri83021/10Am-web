const router =require('express').Router()
const cApi=require('../controlers/controler')
const multer=require('multer')


let storage = multer.diskStorage({
    /// This is for file upload
    destination: function (req, file, cb) {
      cb(null, "./public/upload"); /// file destination
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname); // file name
    },
  });
  
  let upload = multer({
    storage: storage,
    limits: { files: 1024 * 1024 * 6 }, // file limit
  });



router.post('/register',upload.single("profile"),cApi.register)
router.post('/login',cApi.login)
router.get("/getRegUsers",cApi.getRegUser)
router.delete('/userDelete/:id',cApi.deleteUser)
router.put('/useredit/:id',cApi.userEdit)

router.get('/profileDetails')






module.exports = router