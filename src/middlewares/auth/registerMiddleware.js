const User = require("../../db/user");
const Class = require("../../db/class")

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
        Class.findById(user.classes[0], (err, data2) => {
          if(err) throw errl
          else {
            res.json({
              success:true,
              new: false,
              user: user,
              cType: data2.classType
            })
          }
        })
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
