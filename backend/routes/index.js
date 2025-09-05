const express = require('express');

// creating a new router instance
const router = express.Router();


// add the routes here
router.get('/', (req, res) => {
    res.send("Welcome to this api");
});

router.get('/products', function (req, res) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})


// export the router, this line makes the router available to be used in other files
module.exports = router;