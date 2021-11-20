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
  res.render('perfil.ejs');
})

app.get('/perfil', async (req,res) => {
  console.log(`${usermail} aiai`);
  const  email  = usermail;
  console.log(email)
  const user = await User.findOne({ email: email });
  res.render('perfil.ejs', {name: user.name, genero: user.genero});
  console.log(user.name)
  // console.log(user)
})

app.listen(3000);