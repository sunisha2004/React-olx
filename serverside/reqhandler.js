import userSchema from './model/usermodel.js'
import userDataSchema from './model/userData.model.js'
import postSchema from './model/post.model.js'
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const { sign } =pkg

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "sunishams2004@gmail.com",
    pass: "xgrj cojw wpfl stau",
  },
});

export async function register(req, res) {
    const { username, email, password, confirmpass,phone } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      if (!(username && email && password&& confirmpass&&phone))
        return res.status(500).send({ msg: "fields are empty" });
      if (password !== confirmpass) return res.status(500).send({ msg: "password not match" });
      bcrypt
        .hash(password, 10)
        .then((hpwd) => {
          userSchema.create({ username, email, password: hpwd,phone });
          res.status(200).send({ msg: "Successfull" });
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
    res.status(200).send({ token })
  }

  export async function display(req, res) {
    // console.log(req.user);
    const usr = await userSchema.findOne({ _id: req.user.UserID })
    // console.log(usr);
    res.status(200).send({ userid: usr._id, name: usr.username });
  
  
  }


  export async function verifyEmail(req, res) {
    const { email } = req.body;
    console.log(email);
  
    if (!email) {
      return res.status(500).send({ msg: "fields are empty" });
    }
  
    const user = await userSchema.findOne({ email });
  
    if (!user) {
      const info = await transporter.sendMail({
        from: 'sunishams2004@gmail.com',
        to: email,
        subject: "Verify Your Email",
        text: "Please verify your email to continue",
        html: `
        <div style="
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
          font-family: Arial, sans-serif; 
          background-color: #f9f9f9; 
          border: 1px solid #e0e0e0; 
          border-radius: 10px; 
          text-align: center;">
          <h2 style="color: #333;">Email Verification</h2>
          <p style="color: #555; font-size: 16px;">
            Hi there! Click the button below to verify your email address and complete the registration process.
          </p>
          <a href="http://localhost:5173/register" style="
            display: inline-block; 
            margin-top: 20px; 
            padding: 10px 20px; 
            font-size: 16px; 
            color: #ffffff; 
            background-color: #007BFF; 
            text-decoration: none; 
            border-radius: 5px;
            font-weight: bold;">
            Verify Email
          </a>
          <p style="color: #999; font-size: 14px; margin-top: 20px;">
            If you did not request this email, you can safely ignore it.
          </p>
        </div>
        `,
      });
  
      console.log("Message sent: %s", info.messageId);
      res.status(201).send({ msg: "Verification email sent" });
    } else {
      return res.status(500).send({ msg: "Email already exists" });
    }
  }
  
  export async function getUserData(req, res) {
    const usr = await userSchema.findOne({ _id: req.user.UserID })
    const data = await userDataSchema.findOne({ userId: req.user.UserID })
    if (!data) res.status(200).send({ usr })
    else {
      res.status(200).send({ usr, data })
    }
  }

  export async function addUserData(req, res) {
    
    try {
      const { district, place, pin, pic } = req.body
    await userDataSchema.create({userId:req.user.UserID, district, place, pin, pic})
      res.status(200).send({ msg: "Data added successfully!" })
    } catch (error) {
      console.error(error)
      res.status(500).send({ msg: "Failed to add data. Please try again." })
    }
}

export async function editUserData(req, res) {
  try {
    const { district, place, pin } = req.body
    const updatedData = await userDataSchema.updateOne({ userId: req.user.UserID },{ $set: { district, place, pin } },)
    res.status(200).send({ msg: "Data updated successfully!", data: updatedData })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: "Failed to update data. Please try again." })
  }
}

export async function deleteUser(req, res) {
  try {
    await userDataSchema.deleteOne({userId:req.user.UserID})
    await postSchema.delete({userId:req.user.UserID})
    await userSchema.deleteOne({ _id: req.user.UserID })
    res.status(200).send({ msg: "Data deleted successfully!"})
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: "Failed to delete data. Please try again." })
  }
} 


export async function addPost(req, res) {
  try {
    // console.log(req.user.UserID)
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString(); 

    const {title,category,images,description,price}=req.body
    const post = await postSchema.create({userId: req.user.UserID, title, category, images, description, price, date, time});
    res.status(201).send({ msg: "Post added successfully!", data: post })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: "Failed to add data. Please try again." })
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await postSchema.find({ userId: req.user.UserID });
    if (!posts || posts.length === 0) {
      return res.status(200).send({ msg: "No posts found", data: [] });
    }
    res.status(200).send({ data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Failed to fetch posts. Please try again." });
  }
}