const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const avatarsController = require("../controllers/avatar");
const { imageFilter } = require("../../misc/helper");
const multer  = require('multer')
const path = require('path')

const dest = path.join(__dirname, "../dist/public/assets/images/avatars/")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dest)
  },
  filename: function (req, file, cb) {
    const userId = req.user.id
    file.savedFilename = userId + "_" + Date.now() + path.extname(file.originalname)
    cb(null, file.savedFilename) 
  }
})


const upload = multer({ storage: storage, dest, fileFilter: imageFilter })

const authMiddleware = require("../middlewares/auth");
const authTeacherMiddleware = require("../middlewares/authTeacher");

router.get("/all", authTeacherMiddleware,  async (req, res) => {
  const allUsers = await usersController.getUsers();

  res.json(allUsers);
});

router.post("/changepassword", authMiddleware,  async (req, res) => {
  const data = {
    id: req.user.id,
    currentPassword: req.body.currentPassword,
    newPassword: req.body.newPassword,
  };

  const passwordChange = await usersController.updatePassword(data);

  res.json(passwordChange);
});

router.get("/students/all", authTeacherMiddleware, async (req, res) => {
  const allUsers = await usersController.getAllStudents();

  res.json(allUsers);
});

router.get("/", authMiddleware, async (req, res) => {
  const user = await usersController.getUser(req.user.id);

  res.json(user);
});

router.put("/", authMiddleware, async (req, res) => {
  const data = {
    id: req.user.id,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
  };

  const user = await usersController.updateUser(data);

  res.json(user)
});

router.post('/avatar', [authMiddleware, upload.single('avatar')], async function (req, res, next) {
  const savedFilename = req.file.savedFilename
  const userId = req.user.id 

  const data = {savedFilename, userId}

  const insertAvatar = await avatarsController.insertAvatar(data)
  const updateAvatar = await avatarsController.updateAvatar({...insertAvatar.response, userId})

  res.json(insertAvatar)
})

router.put('/avatar', authMiddleware, async function (req, res, next) {
  const mimeId = req.file.mimeId
  const userId = req.user.id 

  const data = {mimeId, userId}

  const updateAvatar = await avatarsController.updateAvatar(data)

  res.json(updateAvatar)
})

module.exports = router;
