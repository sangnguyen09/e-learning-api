import {notification} from '../services/index'

let getHome = async(req, res) => {
     let notifications = await notification.getNotifications(req.user._id)
    return res.render("main/home/home", // been file cau hình đã định nghĩa đường dẫn src/view
        {
            errors: req.flash("errors"), // lay tu req ben duoi
            success: req.flash("success"),
            user: req.user,
            notifications
        })
    
}

module.exports = {
    getHome
};