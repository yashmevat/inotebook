const express= require("express")
const { body,validationResult } = require("express-validator");
const router = express.Router()
const User = require('../models/User')
const bcrypt= require('bcrypt');
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

//creating a user using POST request at /api/auth/createuser  no login required
router.post('/createuser',[
    body('name','enter a valid name').isLength({ min: 2 }),
    body('password','password must be atleast 5 characters').isLength({ min: 5 }),
    body('email','enter a valid email').isEmail()
],async(req,res)=>{
//check validation error
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors : errors.array()});
    }
 //check if user exist or not
 try {
     let user = await User.findOne({email : req.body.email})
     if(user)
       {
         return res.status(400).send({success,error:"email already exist"})
       }
      let salt = await bcrypt.genSalt(10)
      let secPass = await bcrypt.hash(req.body.password , salt)
    //   console.log(secPass)
      user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : secPass
        })
        // console.log(user)
      const data = {
             user:{
                id : user.id
             }
        }
      const authtoken = jwt.sign(data,process.env.JWT_SECRET) 
      success=true;
      res.json({success,authtoken});
    } catch (error) {
       console.log(error)
       res.status(500).send("some error occured")
    }
});

//login a user using POST request at /api/auth/login  no login required
router.post('/login',[
    body('password','password must be atleast 5 characters').exists(),
    body('email','enter a valid email').isEmail()
],async(req,res)=>{
    let success = false;
    const error = validationResult(req)
    if(!error.isEmpty())
    {
        res.status(400).json({success,error:error.array()})
    }

    const {email,password}= req.body;
    try {
        const user = await User.findOne({email:email})
        if(!user){
            success = false;
            return res.status(400).json({success,error:"enter valid login credentials"})
        }
        const comaparepasswords = await bcrypt.compare(password,user.password)
        if(!comaparepasswords){
            success = false;
            return res.status(400).json({success,error:"enter valid login credentials"})
        }
        const data = {
            user:{
               id : user.id
            }
       }
       const authtoken = jwt.sign(data,process.env.JWT_SECRET)
       success=true;
       res.json({success,authtoken});
    } 
    
    catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal Server Error")
     }
})



// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required

router.post("/getuser",fetchuser,async(req,res)=>{
     try {
        const userId = req.user.id;
        // console.log(userId)
        const user = await User.findById(userId).select("-password")
        res.send(user)
     } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
     }
})
module.exports = router