const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

require('./controllers/authController')(app);
require('./controllers/projectController')(app);

app.set('view-engine', 'ejs')
app.get('/', (req,res) => {
    res.render ('login.ejs')
})


app.listen(3000);