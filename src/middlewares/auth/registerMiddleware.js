const User = require("../../db/user");
const crypto = require("crypto");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
        const { _id, name, email, classes, imageUrl } = user;
        res.json({
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
