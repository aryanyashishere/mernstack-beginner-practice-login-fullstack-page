const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const authenticate = require("../middleware/authenticate");
const cookieParser = require('cookie-parser')

router.use(cookieParser());


require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res)=>{
    res.send(`Hello world from the server homme : `); 
});

router.post('/register', async (req, res)=>{
    // console.log(req.body); //purana tarika 
    
    const {name , email, phone, work , password, cpassword} = req.body;
    
    if( !name || !email|| !phone|| !work || !password|| !cpassword){
        return res.status(422).json({error: "pls fill all the fields properly: "});

    }

    //USING FETCH AND CATCH 
    // User.findOne({email:email})
    // .then((userExist)=> {
    //     if(userExist){
    //         return res.status(422).json({error: "email already exists"});
    //     }

    //     const user = new User({name , email, phone, work , password, cpassword});
    //     user.save().then(()=>{
    //             res.status(201).json({message: "user registered successsfulyy: "});

    //     }).catch((err) => res.status(500).json({error: "failed to register "}));
    // }).catch(err => {console.log(err);});

    

    //using ASYNC AND AWAIT
    try{

      const userExist = await User.findOne({email:email});
    
      if (userExist) {
        return res.status(422).json({ error: "Email already Exist" });
   } else if (password != cpassword) {
        return res.status(422).json({ error: "password are not matching" });
   } else {
        const user = new User({ name, email, phone, work, password, cpassword });
       // yeha pe 
       await user.save();
       res.status(201).json({ message: "user registered successfuly" });
   }


    }catch(err){
        console.log(err);
    }


    // res.json({message: req.body}); //to get response in json form user is giving on postman

    //res.send("mera register page: ");   //but it will not work cause it's a post request

});


//login route 

router.post('/signin', async (req, res )=>{
    try{  
        let token;  
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(400).json({error: "plz fill the data proper: "});
            
        }
        
        
        const userLogin = await User.findOne({ email : email});
        // console.log(userLogin);
        if (userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

        if(!isMatch){
            res.status(400).json({error: "invalid credentials : "});
            console.log("invalid credentials in login");
        }else{
             // need to genereate the token and stored cookie after the password match 
             token = await userLogin.generateAuthToken();
             console.log(token);
 
             res.cookie("jwtoken", token, {
                 expires: new Date(Date.now() + 25892000000),
                 httpOnly:true
             });
             
             res.json({ message: "user Signin Successfully" });
             console.log("user login success");
         }
         }else{
            res.status(400).json({error:"email wrong hai bsdk"});
            console.log("email wrong hai bsdk");

        }
    }catch(err){
        console.log(err);
        

    }

    
});


router.get('/about', authenticate ,(req, res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
});


router.get('/getdata', authenticate ,(req, res) => {
    console.log(`Hello my data retrieved`);
    res.send(req.rootUser);
});


router.post('/contact', authenticate,  async (req, res) =>{
    try {
        const {name, email, phone, message} = req.body;
        if (!name || !email || !phone || !message) {
            return res.json({error: "pls fill the contact form whole "});
            console.log("form unfilled");
        } 
        

        const userContact = await User.findOne({_id: req.userID});
        
        if(userContact){
            const userMessage = await userContact.addMessage(name , email, phone , message);
            await userContact.save();
            res.status(201).json({message:"user contact succesfull"});
            console.log("user contact succeessful ");
        }

    } catch (error) {
        console.log(error);
    }
})


router.get('/logout', authenticate ,(req, res) => {
    console.log(`Hello my logout`);
    res.clearCookie('jwtoken', {path: '/'});
    res.status(200).send("user logout successful");
});

module.exports = router;
