// importing moongose
const mongoose = require('mongoose');
const { string, Schema } = require('zod');

// connecting to the database
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // no quotes, no extra options needed
    console.log('Connected to the database successfully');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

connectDB();
const db = mongoose.connection;

const user = new mongoose.Schema({
    username: {type: String, required: true, trim: true, unique: true, lowercase: true, minLength: 3, maxLength: 30},
    firstName: {type: String, required: true, trim: true, unique: true, maxLength: 50},
    lastName: {type: String, required: true, maxLength: 50},
    password: {type: String, required: true, minLength: 3}
});

const accounts = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user", required:true},
    balance: {type: Number, required:true},
})

module.exports = {
    db,
    User: mongoose.model('User', user),
    Accounts: mongoose.model('Accounts', accounts)
};
