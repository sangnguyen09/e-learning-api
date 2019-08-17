import multer from 'multer';
import {
    app
} from '../config/app';
import {
    transErrors,
    transSuccess
} from '../../lang/vi';
import randomId from 'random-id'
import {
    user
} from '../services';
import fsExtra from 'fs-extra' // xu ly file ho tro bat dong bo
import { validationResult } from "express-validator/check";





let storageAvatar = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, app.avatar_directory)
    },
    filename: (req, file, callback) => {
        let math = app.avatar_type;
        if (math.indexOf(file.mimetype) === -1) {
            return callback(transErrors.avatar_type, null)
        }

        let avatarName = `${Date.now()}-${randomId(5, 'aA0')}-${file.originalname}`
        callback(null, avatarName)
    }
});
let avatarUploadFile = multer({
    storage: storageAvatar,
    limits: {
        fileSize: app.avatar_limit_size
    }
}).single('avatar') //avatar trung voi formData o file js  formData.append('avatar', fileData);

let updateAvatar = (req, res) => {

    avatarUploadFile(req, res, async (err) => {
        if (err) {
            console.log(err);
            if (err.message) {
                return res.status(500).send(transErrors.avatar_size)
            }
            return res.status(500).send(err)
        }
        try {
            let updateUserItem = {
                avatar: req.file.filename,
                updatedAt: Date.now()
            }
            // update user
            let userUpdate = await user.updateUser(req.user._id, updateUserItem)

            // renmove avatar old
            await fsExtra.remove(`${app.avatar_directory}/${userUpdate.avatar}`)
            let result = {
                message: transSuccess.user_info_updated,
                imageSrc: `/images/users/${req.file.filename}`
            }
            return res.status(200).send(result)

        } catch (error) {
            return res.status(500).send(error)
        }
    })
}

let updateInfo = async (req, res) =>{
    try {
        let errorArr = [];
        let validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
          let errors = Object.values(validationErrors.mapped()); // laay gia tri cua object gan vao mot cai mang
          errors.map(item => {
            errorArr = [...errorArr, item.msg]; // dung push vao mang
          });
      
          return res.status(500).send(errorArr);
        }

        let updateUserItem = req.body
         // update user
        await user.updateUser(req.user._id, updateUserItem)
         let result = {
            message: transSuccess.user_info_updated,
        }
         return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send(error)
    }
}
module.exports = {
    updateAvatar,
    updateInfo
}
