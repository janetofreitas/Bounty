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
    res.render ('login.ejs');
})

app.get('/registration', (req,res) => {
  res.render('registration.ejs');
})

app.get('/perfil', async (req,res) => {
  // console.log(`${usermail} aiai`);
  const  email  = usermail;
  // console.log(email)
  const user = await User.findOne({ email: email });
  // user.bio = 'ola ola ola ola';
  res.render('perfil.ejs', {name: user.name, genero: user.genero, bio: user.bio});
  // console.log(user.name)
  // console.log(user)
})

app.get('/editarPerfil', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  res.render('editarPerfil.ejs', {name: user.name, genero: user.genero, bio: user.bio});
})

app.listen(3000);