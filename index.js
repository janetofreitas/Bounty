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
});

app.get('/registration', (req,res) => {
  res.render('registration.ejs');
});

app.get('/forgotPassword', (req,res) => {
  res.render('forgotPassword.ejs');
})

app.get('/perfil', async (req,res) => {
  // console.log(`${usermail} aiai`);
  const  email  = usermail;
  // console.log(email)
  const user = await User.findOne({ email: email });
  // user.bio = 'ola ola ola ola';
  res.render('perfil.ejs', {name: user.name, genero: user.genero, bio: user.bio});
});

app.get('/editarPerfil', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  res.render('editarPerfil.ejs', {name: user.name, genero: user.genero, bio: user.bio});
});

app.post('/editarPerfil', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  await User.updateOne({ email: email }, {
      bio: req.body.bio,
      cep: req.body.cep,
      endereco: req.body.endereco,
      name: req.body.name,
      email: req.body.email 
  });

  res.redirect('/perfil')
});

app.get('/historico', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  res.render('historico.ejs', {name: user.name, genero: user.genero, bio: user.bio});
});

app.get('/favoritos', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  res.render('favoritos.ejs', {name: user.name, genero: user.genero, bio: user.bio});
});

app.get('/faq', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  res.render('faq.ejs', {name: user.name, genero: user.genero, bio: user.bio});
});

app.get('/home', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  res.render('home.ejs', {name: user.name, genero: user.genero, bio: user.bio});
});

app.listen(3000);