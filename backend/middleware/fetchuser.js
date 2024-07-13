const jwt = require("jsonwebtoken");

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token)
    {
        console.log("token nahi mila")
        res.status(401).send({error : "please authenticate yourself with a valid token"})
    }
    try {
        //ye wahi data decode hoke milega jo hamne token sign karate time use kiya tha 
        const data = jwt.verify(token,process.env.JWT_SECRET);
        // console.log(req.user)
        //req object me ye data add ho gaya 
        req.user = data.user;
        console.log(req.user)
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}
module.exports = fetchuser