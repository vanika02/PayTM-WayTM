const express = require('express');
const { Accounts } = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const { default: mongoose } = require('mongoose');

const router = express.Router();

// adding the account routes here

router.get('/balance', authMiddleware, async(req, res) => {
    const account = await Accounts.findOne({
        userId:req.userId
    });

    res.json({
            balance : account.balance
    })
});

router.post('/transfer' , authMiddleware ,async(req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // fetch the accounts within the transaction
    const account = await Accounts.findOne({userId: req.userId}).session(session);

    if (!account || account.balance < amount ) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        });
    }

    const toAccount = await Accounts.findOne({userId:to}).session(session)

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        });
    }
   
    // perform the transfer
    await Accounts.updateOne({userId:req.userId}, {$inc:{balance:-amount}}).session(session);
    await Accounts.updateOne({userId:to}, {$inc:{balance:amount}}).session(session)

    // commit the transaction
    await session.commitTransaction();
    res.json({
        message:"Transfer Successful"
    });
});


// export the module
module.exports = router;