const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
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
    
        if(userExist){
            return res.status(422).json({error: "email already exists"});
        }

        const user = new User({name , email, phone, work , password, cpassword});
        //yahan pe dalenge hashing ka code
         
   
        await user.save();
        // console.log(`${user} user registered succesfully`)
        // console.log(userRegister)
        res.status(201).json({message: "user registered successsfuly"});


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

             token =  await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            });


        if(!isMatch){
            res.status(400).json({error: "invalid credentials : "});
        }else{
            res.json({message: "user signin successfully"});
        }    
        }else{
            res.json({error:"invalid credentials :"});

        }
    }catch(err){
        console.log(err);

    }
});


module.exports = router;
