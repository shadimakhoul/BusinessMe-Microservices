const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

router.use(bodyParser.json())

router.get("/", (req, res) => {
    return res.send('Hi, Main Microservice is working');
})


module.exports = router;

