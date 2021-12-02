const express = require('express');
const bodyParser = require('body-parser');
const filepond = require('filepond');
const formidable = require('formidable');
const fs = require('fs');
const app = express();
const User = require('./models/User');
const Bounty = require('./models/Bounty');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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

  
  try{
    try{
      return res.render('perfil.ejs', {name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bounty1: '/bounty1',
        bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions, bounty2: '/bounty2',
        bountyName3: bountyP[2].name,bountyDescription3: bountyP[2].description,bountyRestrictions3: bountyP[2].restrictions, bounty3: '/bounty3',
        bountyName4: bountyP[3].name,bountyDescription4: bountyP[3].description,bountyRestrictions4: bountyP[3].restrictions, bounty4: '/bounty4'});
    }catch(err){
      console.log('primeiro try');
    }

    try{
      return res.render('perfil.ejs', {name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bounty1: '/bounty1',
        bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions, bounty2: '/bounty2',
        bountyName3: bountyP[2].name,bountyDescription3: bountyP[2].description,bountyRestrictions3: bountyP[2].restrictions, bounty3: '/bounty3',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bounty4: ''});
    }catch(err){
      console.log('segundo try');
    }

    try{
      return res.render('perfil.ejs', {name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bounty1: '/bounty1',
        bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions, bounty2: '/bounty2',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bounty3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bounty4: ''});
    }catch(err){
      console.log('terceiro try');
    }

    try{
      return res.render('perfil.ejs', {name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bounty1: '/bounty1',
        bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', bounty2: '',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bounty3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bounty4: ''});
    }catch(err){
      console.log('quarto try');
    }

    try{
      return res.render('perfil.ejs', {name: user.name, genero: user.genero, bio: user.bio,
        bountyName: '',bountyDescription: '',bountyRestrictions: '', bounty1: '',
        bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', bounty2: '',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bounty3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bounty4: ''});
    }catch(err){
      console.log('quinto try');
    }
     
  }catch(err){
    console.log('finally')
  }
    
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

app.get('/bounty1', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  
  const bountyP = await Bounty.findOne({ _id: bounty1ID });
  console.log(bountyP)
  try{

    try{
      return res.render('bounty.ejs', {name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

  
});

app.get('/bounty2', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  
  const bountyP = await Bounty.findOne({ _id: bounty2ID });
  console.log(bountyP)
  try{

    try{
      
      return res.render('bounty.ejs', {name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

  
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
  var bounty = await Bounty.find();
  // var bountyC = [];
  // try {
    
  //   bounty.forEach((el)=>{
  //     let temp = [];
  //     temp.push(el._id.toHexString());
  //     temp.push(el.name);
  //     temp.push(el.description);
  //     temp.push(el.restrictions);
  //     bountyC.push(temp);
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
  
  
  try{
      try{
        return res.render('home.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bounty[0].name,bountyDescription: bounty[0].description,bountyRestrictions: bounty[0].restrictions, home1: '/home1',
          bountyName2: bounty[1].name,bountyDescription2: bounty[1].description,bountyRestrictions2: bounty[1].restrictions, home2: '/home2',
          bountyName3: bounty[2].name,bountyDescription3: bounty[2].description,bountyRestrictions3: bounty[2].restrictions, home3: '/home3',
          bountyName4: bounty[3].name,bountyDescription4: bounty[3].description,bountyRestrictions4: bounty[3].restrictions, home4: '/home4'});
      }catch(err){
        console.log('primeiro try');
      }

      try{
        return res.render('home.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bounty[0].name,bountyDescription: bounty[0].description,bountyRestrictions: bounty[0].restrictions, home1: '/home1',
          bountyName2: bounty[1].name,bountyDescription2: bounty[1].description,bountyRestrictions2: bounty[1].restrictions, home2: '/home2',
          bountyName3: bounty[2].name,bountyDescription3: bounty[2].description,bountyRestrictions3: bounty[2].restrictions, home3: '/home3',
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', home4: ''});
      }catch(err){
        console.log('segundo try');
      }

      try{
        return res.render('home.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bounty[0].name,bountyDescription: bounty[0].description,bountyRestrictions: bounty[0].restrictions, home1: '/home1',
          bountyName2: bounty[1].name,bountyDescription2: bounty[1].description,bountyRestrictions2: bounty[1].restrictions, home2: '/home2',
          bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', home3: '',
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', home4: ''});
      }catch(err){
        console.log('terceiro try');
      } 

      try{
        return res.render('home.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bounty[0].name,bountyDescription: bounty[0].description,bountyRestrictions: bounty[0].restrictions, home1: '/home1',
          bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', home2: '',
          bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', home3: '',
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', home4: ''});
      }catch(err){
        console.log('quarto try');
      }
      
      try{
        return res.render('home.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: '',bountyDescription: '',bountyRestrictions: '', home1: '',
          bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', home2: '',
          bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', home3: '',
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', home4: ''});
      }catch(err){
        console.log('quinto try');
      }

    }catch(err){
      console.log('erro try maior ');
     }
     
});

app.get('/home1', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  
  const bountyP = await Bounty.find();
  try{

    try{
      return res.render('bounty.ejs', {name: user.name, bountyName: bountyP[0].name, bountyPrazoFinal: bountyP[0].dataFinal, bountyRestricoes: bountyP[0].restrictions, bountyDescricao: bountyP[0].description});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}
  
});

app.get('/home2', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  
  const bountyP = await Bounty.find();
  try{

    try{
      return res.render('bounty.ejs', {name: user.name, bountyName: bountyP[1].name, bountyPrazoFinal: bountyP[1].dataFinal, bountyRestricoes: bountyP[1].restrictions, bountyDescricao: bountyP[1].description});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

  
});

app.get('/home3', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  
  const bountyP = await Bounty.find();
  try{

    try{
      return res.render('bounty.ejs', {name: user.name, bountyName: bountyP[2].name, bountyPrazoFinal: bountyP[2].dataFinal, bountyRestricoes: bountyP[2].restrictions, bountyDescricao: bountyP[2].description});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

  
});

app.get('/home4', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  
  const bountyP = await Bounty.find();
  try{

    try{
      return res.render('bounty.ejs', {name: user.name, bountyName: bountyP[3].name, bountyPrazoFinal: bountyP[3].dataFinal, bountyRestricoes: bountyP[3].restrictions, bountyDescricao: bountyP[3].description});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

  
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

app.post("/upload", function(req, res){
  console.log("BEGIN /upload");
  const form = formidable({ multiples: false });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    let theFile = files.filepond.path;
    console.log("theFile: " + theFile);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(theFile);
  });
  console.log('save');
  console.log(`req: ${JSON.stringify(req.body)}`);
})

app.listen(3000);