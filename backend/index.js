
const express = require("express");
const router = express.Router();
const  cors = require("cors");

require('dotenv').config({ path: __dirname + '/.env' }); // Load from backend/.env

const rootRouter = require('./routes/index.js');
const userRouter = require('./routes/user.js');
const accountRouter = require('./routes/account.js');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1', rootRouter);
app.use('/user', userRouter);
app.use('/account', accountRouter);


app.listen(3000, () => {
    console.log("server is running on port 3000");
});
