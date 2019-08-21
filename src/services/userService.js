import UserModel  from '../models/userModel'
import { transErrors } from '../../lang/vi';
import bcrypt from "bcrypt";

const saltRounds =7;
/**
 *
 * @param {userID} id
 * @param {data update} item
 */
let updateUser= (id, item) =>{
    return UserModel.updateUser(id, item);
}
/**
 * Update password for user
 * @param {userID} id
 * @param {*} dataUpdate
 */
let updatePassword= (id, dataUpdate) =>{
    return  new Promise(async (resolve, reject) =>{
        let currentUser = await UserModel.findUserByIdToUpdatePassword(id);
        if (!currentUser) {
            return reject(transErrors.account_undifined)
        }
        let checkCurrentPassword = await currentUser.comparePassword(dataUpdate.currentPassword)
        if (!checkCurrentPassword) {
            return reject(transErrors.user_current_password_failed)
        }
        let salt  = bcrypt.genSaltSync(saltRounds);
        await UserModel.updatePassword(id,bcrypt.hashSync(dataUpdate.newPassword, salt));
        resolve(true)
    })
}
module.exports ={updateUser,updatePassword}
