const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/User');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

require('./controllers/index')(app);
// require('./controllers/authController')(app);
// require('./controllers/projectController')(app);

app.set('view-engine', 'ejs')
app.get('/', (req,res) => {
    res.render ('registration.ejs')
})

app.post('/registration', async (req, res) => {

    console.log('pre try');
    try {
        console.log('entrou no try');
      var user = new User({
        name: req.body.name,
        email: req.body.email,
        telefone: req.body.telefone,
        dataN: req.body.dataN,
        cep: req.body.cep,
        nacionalidade: req.body.nacionalidade,
        endereço: req.body.end,
        genero: req.body.genero,
        password: req.body.password
      })
      console.log(user);
      res.redirect('/auth/register')
    } catch {
        console.log('caiu no catch')
      res.redirect('/registration')
    }
    // console.log(users)
  })



app.listen(3000);