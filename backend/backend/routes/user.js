const express = require('express');

const zod = require('zod');
const authMiddleware = require('../middleware/authMiddleware.js');

// importing the user model
const { User, Accounts } = require('../db.js');
const jwt = require('jsonwebtoken');


const  JWT_SECRET  = process.env.JWT_SECRET;
// console.log("JWT_SECRET in user.js:", process.env.JWT_SECRET);


// singup
const signupBody = zod.object({
    username:zod.string().email(),
    firstName:zod.string().min(3).max(50),
    lastName:zod.string().min(3).max(50),
    password:zod.string().min(3).max(50)    
})


const router = express.Router();
router.use(express.json());



router.post('/signup', async(req, res) => {
    const result = signupBody.safeParse(req.body)
    if(!result.success) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }
    const existingUser = await User.findOne({
        username:req.body.username 
    })
    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password 
    })
    const userId = user._id;
    // create an account for the user
    await Accounts.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    
    const token = jwt.sign({
        userId
    }, JWT_SECRET);
    
    
    res.json({
        message: "User created successfully",
        token:token
    })
});


// signin
signinBody = zod.object({
    username:zod.string().email(),
    password:zod.string().min(3).max(50) 
})


router.post('/signin', async(req, res) => {
    const result = signinBody.safeParse(req.body)
    if(!result.success) {
        return res.status(411).json({
            message:"Incorrect inputs, please try again"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    
    if(user) {
        const token = jwt.sign({
            userId: user._id 
        }, JWT_SECRET);

        res.json({
            message: "User signed in successfully",
            token: token
        });
        return;
    }
    res.status(411).json({
        message: "Incorrect username or password"
    });
})

// user dashboard route

router.get('/', authMiddleware, async(req, res) => {
    try {
        const user = await User.findOne({_id:req.userId});
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const account = await Accounts.findOne({userId:req.userId});
        res.json({
            user:{
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                balance: account.balance
            }
        });
        return;     
    } catch (err) {     
        return res.status(500).json({
            message: "Internal server error"
        });
    }
    res.send("User route accessed");    
});
// update user

updateUser = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/update", authMiddleware, async(req, res) => {
    const result = updateUser.safeParse(req.body);
    if(!result.success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({_id:req.userId}, req.body);

    res.json({
        message: "User information updated successfully"
    })
})

// find the user
router.get('/bulk', async(req, res) => {
    const filter = req.query.filter || "";

    const users  = await User.find({
        $or:[{
            firstName: {"$regex": filter}
        }, {
            lastName: {
                "$regex":filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id:user._id
        }))
    })
})

module.exports = router;