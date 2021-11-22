const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/User');
const Bounty = require('./models/Bounty');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

require('./controllers/index')(app);

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
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyP = await Bounty.find({ creator: email });
  console.log(bountyP)
  
  // if(bountyP !== []){
    try{
      try{
       res.render('perfil.ejs', {name: user.name, genero: user.genero, bio: user.bio,
         bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions,
         bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions,
         bountyName3: bountyP[2].name,bountyDescription3: bountyP[2].description,bountyRestrictions3: bountyP[2].restrictions,
         bountyName4: bountyP[3].name,bountyDescription4: bountyP[3].description,bountyRestrictions4: bountyP[3].restrictions});
      }catch(err){
        console.log('primeiro try');
      }

      try{
        res.render('perfil.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions,
          bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions,
          bountyName3: bountyP[2].name,bountyDescription3: bountyP[2].description,bountyRestrictions3: bountyP[2].restrictions,
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: ''});
      }catch(err){
       console.log('segundo try');
      }

      try{
        res.render('perfil.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions,
          bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions,
          bountyName3: '',bountyDescription3: '',bountyRestrictions3: '',
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: ''});
      }catch(err){
       console.log('terceiro try');
      }

      try{
        res.render('perfil.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions,
          bountyName2: '',bountyDescription2: '',bountyRestrictions2: '',
          bountyName3: '',bountyDescription3: '',bountyRestrictions3: '',
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: ''});
      }catch(err){
       console.log('quarto try');
      }

      try{
        res.render('perfil.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: '',bountyDescription: '',bountyRestrictions: '',
          bountyName2: '',bountyDescription2: '',bountyRestrictions2: '',
          bountyName3: '',bountyDescription3: '',bountyRestrictions3: '',
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: ''});
      }catch(err){
       console.log('quinto try');
      }
     
   }catch(err){
     console.log('finally')
   }
    
});
    
  // }

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
  const bounty = await Bounty.find();
  // const homeBounty = await Bounty.find();
  // console.log(bounty.map(bounty => bounty.name).sort());
     try{
       try{
        res.render('home.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bounty[0].name,bountyDescription: bounty[0].description,bountyRestrictions: bounty[0].restrictions,
          bountyName2: bounty[1].name,bountyDescription2: bounty[1].description,bountyRestrictions2: bounty[1].restrictions,
          bountyName3: bounty[2].name,bountyDescription3: bounty[2].description,bountyRestrictions3: bounty[2].restrictions});
       }catch(err){
         console.log('primeiro try');
       }

       try{
        res.render('home.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bounty[0].name,bountyDescription: bounty[0].description,bountyRestrictions: bounty[0].restrictions,
          bountyName2: bounty[1].name,bountyDescription2: bounty[1].description,bountyRestrictions2: bounty[1].restrictions,
          bountyName3: '',bountyDescription3: '',bountyRestrictions3: ''});
       }catch(err){
        console.log('segundo try');
       }

       try{
        res.render('home.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bounty[0].name,bountyDescription: bounty[0].description,bountyRestrictions: bounty[0].restrictions,
          bountyName2: '',bountyDescription2: '',bountyRestrictions2: '',
          bountyName3: '',bountyDescription3: '',bountyRestrictions3: ''});
       }catch(err){
        console.log('terceiro try');
       }
      
    }catch(err){
      res.render('home.ejs', {name: user.name, genero: user.genero, bio: user.bio,
        bountyName:'',bountyDescription: '',bountyRestrictions: '',
        bountyName2: '',bountyDescription2: '',bountyRestrictions2: '',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: ''});
    }
     
});

app.get('/criarBounty', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  res.render('criarBounty.ejs', {name: user.name, genero: user.genero, bio: user.bio, email: user.email});
});

app.post('/createBounty', async (req,res) => {
  // const  email  = usermail;
  const bounty = await Bounty.create(req.body);
  res.redirect('/home');
});

app.listen(3000);