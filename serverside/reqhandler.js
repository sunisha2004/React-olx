import userSchema from './model/usermodel.js'
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const { sign } =pkg

export async function register(req, res) {
    const { username, email, password, confirmpass } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      if (!(username && email && password&& confirmpass))
        return res.status(500).send({ msg: "fields are empty" });
      if (password !== confirmpass) return res.status(500).send({ msg: "password not match" });
      bcrypt
        .hash(password, 10)
        .then((hpwd) => {
          userSchema.create({ username, email, password: hpwd });
          res.status(201).send({ msg: "Successfull" });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({ msg: "Error creating user." });
        });
    } else {
      res.status(500).send({ msg: "email already used" });
    }
  }

  export async function login(req, res) {
    const { email, password } = req.body
    if (!(email && password))
      return res.status(500).send({ msg: "fields are empty" })
    const user = await userSchema.findOne({ email })
    if (!user) return res.status(500).send({ msg: "email donot exist" })
    const success = await bcrypt.compare(password, user.password)
    if (success !== true)
      return res.status(500).send({ msg: "email or password not exist" })
    const token = await sign({ UserID: user._id }, process.env.JWT_KEY, {expiresIn: "24h",})
    res.status(201).send({ token })
  }
