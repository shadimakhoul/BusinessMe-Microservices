const bodyParser = require('body-parser');
const cors = require('cors')
const router = require('./routes/router');

module.exports = async (app) => {
    app.use(bodyParser.json())
    app.use(cors())
    app.use('/', router)
}