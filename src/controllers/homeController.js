let getHome = (req, res) => {
    return res.render("main/home/home", // been file cau hình đã định nghĩa đường dẫn src/view
        {
            errors: req.flash("errors"), // lay tu req ben duoi
            success: req.flash("success"),
            user: req.user
        })
}

module.exports = {
    getHome
};