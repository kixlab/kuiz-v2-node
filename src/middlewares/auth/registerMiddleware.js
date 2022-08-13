const User = require("../../db/user");

const registerMiddleware = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const imageUrl = req.body.image;
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "This user doesn't exist. Sign up first",
      });
    } else {
      if (user) {
        console.log("CID:",user.classes[0])
        const { _id, name, email, classes, imageUrl } = user;
        res.json({
          success:true,
          new: false,
          user: { _id, name, email, classes, imageUrl },
        });
      } else {
        let newUser = new User({ name, email, imageUrl });
        newUser.save((err, data) => {
          if (err) {
            return res.status(400).json({
              error: "something wrong",
            });
          } else {
                res.json({
                    new: true,
                    user: newUser,
                    success: true
                });
          }
        });
      }
    }
  });
};

module.exports = registerMiddleware;
