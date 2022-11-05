import { UserProfileController } from '@controllers/api/user'
import FileStoreServices from '@services/FileStoreServices'
import ProfileService from '@services/ProfileService'
import express from 'express'
import multer from 'multer'
import { isAuth } from 'src/middlewares/auth.middleware'
const upload = multer({ dest: 'uploads/' })

const UserRouter = express.Router()

UserRouter.get('/user/:user_id/profile', (req, res) => UserProfileController.getProfile(req, res))
UserRouter.post('/user/:user_id/profile', FileStoreServices.uploadFile.single('file'), (req, res) =>
    UserProfileController.updateProfile(req, res)
)
UserRouter.get('/user', isAuth, UserProfileController.getProfile)



export default UserRouter