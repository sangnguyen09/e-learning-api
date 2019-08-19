import {notification} from '../services/index'

let getHome = async(req, res) => {
    // only 10 items one time
     let notifications = await notification.getNotifications(req.user._id)
     // get amount notiificaitons unread
     let countNofifUnread = await notification.countNofifUnread(req.user._id)
    return res.render("main/home/home", // been file cau hình đã định nghĩa đường dẫn src/view
        {
            errors: req.flash("errors"), // lay tu req ben duoi
            success: req.flash("success"),
            user: req.user,
            notifications,
            countNofifUnread
        })
    
}

module.exports = {
    getHome
};