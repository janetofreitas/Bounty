const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, usermail + path.extname(file.originalname))
  }
})

const storageBounty = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, idB + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage});
const uploadBounty = multer({storage: storageBounty});
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
  const bountyP = await Bounty.find({ creator: email, status: 'andamento' });

  
  try{
    try{
      return res.render('perfil.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bountyPerfil1: '/bountyPerfil1',
        bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions, bountyPerfil2: '/bountyPerfil2',
        bountyName3: bountyP[2].name,bountyDescription3: bountyP[2].description,bountyRestrictions3: bountyP[2].restrictions, bountyPerfil3: '/bountyPerfil3',
        bountyName4: bountyP[3].name,bountyDescription4: bountyP[3].description,bountyRestrictions4: bountyP[3].restrictions, bountyPerfil4: '/bountyPerfil4'});
    }catch(err){
      console.log('primeiro try');
    }

    try{
      return res.render('perfil.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bountyPerfil1: '/bountyPerfil1',
        bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions, bountyPerfil2: '/bountyPerfil2',
        bountyName3: bountyP[2].name,bountyDescription3: bountyP[2].description,bountyRestrictions3: bountyP[2].restrictions, bountyPerfil3: '/bountyPerfil3',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyPerfil4: ''});
    }catch(err){
      console.log('segundo try');
    }

    try{
      return res.render('perfil.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bountyPerfil1: '/bountyPerfil1',
        bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions, bountyPerfil2: '/bountyPerfil2',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bountyPerfil3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyPerfil4: ''});
    }catch(err){
      console.log('terceiro try');
    }

    try{
      return res.render('perfil.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bountyPerfil1: '/bountyPerfil1',
        bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', bountyPerfil2: '',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bountyPerfil3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyPerfil4: ''});
    }catch(err){
      console.log('quarto try');
    }

    try{
      return res.render('perfil.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: '',bountyDescription: '',bountyRestrictions: '', bountyPerfil1: '',
        bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', bountyPerfil2: '',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bountyPerfil3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyPerfil4: ''});
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
  res.render('editarPerfil.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio});
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
  
  console.log(`req: ${JSON.stringify(req.body)}`);
  res.redirect('/perfil')
});

app.get('/bountyPerfil1', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'andamento' });
  const bountyP = await Bounty.findOne({ _id: bountyC[0]._id.toHexString()});
  
  try{

    try{
      return res.render('bountyPerfil.ejs', {name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, ID: bountyC[0]._id.toHexString(), comentarios: bountyC[0].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

  
});

app.get('/bountyPerfil2', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'andamento' });
  const bountyP = await Bounty.findOne({ _id: bountyC[1]._id.toHexString()});
  try{

    try{
      
      return res.render('bountyPerfil.ejs', {name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, ID: bountyC[1]._id.toHexString(), comentarios: bountyC[1].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

  
});

app.get('/bountyPerfil3', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'andamento' });
  const bountyP = await Bounty.findOne({ _id: bountyC[2]._id.toHexString()});
  try{

    try{
      
      return res.render('bountyPerfil.ejs', {name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, ID: bountyC[2]._id.toHexString(), comentarios: bountyC[2].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

  
});

app.get('/bountyPerfil4', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'andamento' });
  const bountyP = await Bounty.findOne({ _id: bountyC[3]._id.toHexString()});
  try{

    try{
      
      return res.render('bountyPerfil.ejs', {name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, ID: bountyC[3]._id.toHexString(), comentarios: bountyC[3].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

});

app.post('/editarBounty', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  
  const bountyP = await Bounty.findOne({_id: req.body.ID });
  idB = bountyP._id;

  try{
    try{
      return res.render('editarBounty.ejs', {name: user.name, ID: req.body.ID, NOME: bountyP.name, RESTRICAO: bountyP.restrictions, DESCRICAO: bountyP.description});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

});

app.post('/editarBountyF', async (req,res) => {
  
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  
  try {
    await Bounty.updateOne({ _id: req.body.ID }, {
      name: req.body.name,  
      dataFinal: req.body.prazoF,
      restrictions: req.body.restrictions,
      description: req.body.description,
    });
  } catch (error) {
    console.log(error);
  }
  
  const bountyP = await Bounty.findOne({_id: req.body.ID });
  
  res.render('bountyPerfil.ejs', {name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, ID: bountyP._id.toHexString(), comentarios: bountyP.comments});
});

app.get('/historico', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyP = await Bounty.find({ creator: email, status: 'finalizada' });

  
  try{
    try{
      return res.render('historico.ejs', {name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bountyHistorico1: '/bountyHistorico1',
        bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions, bountyHistorico2: '/bountyHistorico2',
        bountyName3: bountyP[2].name,bountyDescription3: bountyP[2].description,bountyRestrictions3: bountyP[2].restrictions, bountyHistorico3: '/bountyHistorico3',
        bountyName4: bountyP[3].name,bountyDescription4: bountyP[3].description,bountyRestrictions4: bountyP[3].restrictions, bountyHistorico4: '/bountyHistorico4'});
    }catch(err){
      console.log('primeiro try');
    }

    try{
      return res.render('historico.ejs', {name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bountyHistorico1: '/bountyHistorico1',
        bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions, bountyHistorico2: '/bountyHistorico2',
        bountyName3: bountyP[2].name,bountyDescription3: bountyP[2].description,bountyRestrictions3: bountyP[2].restrictions, bountyHistorico3: '/bountyHistorico3',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyHistorico4: ''});
    }catch(err){
      console.log('segundo try');
    }

    try{
      return res.render('historico.ejs', {name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bountyHistorico1: '/bountyHistorico1',
        bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions, bountyHistorico2: '/bountyHistorico2',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bountyHistorico3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyHistorico4: ''});
    }catch(err){
      console.log('terceiro try');
    }

    try{
      return res.render('historico.ejs', {name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bountyHistorico1: '/bountyHistorico1',
        bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', bountyHistorico2: '',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bountyHistorico3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyHistorico4: ''});
    }catch(err){
      console.log('quarto try');
    }

    try{
      return res.render('historico.ejs', {name: user.name, genero: user.genero, bio: user.bio,
        bountyName: '',bountyDescription: '',bountyRestrictions: '', bountyHistorico1: '',
        bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', bountyHistorico2: '',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bountyHistorico3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyHistorico4: ''});
    }catch(err){
      console.log('quinto try');
    }
     
  }catch(err){
    console.log('finally')
  }

});

app.get('/bountyHistorico1', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'finalizada' });
  const bountyP = await Bounty.findOne({ _id: bountyC[0]._id.toHexString()});
  try{

    try{
      
      return res.render('bountyHistorico.ejs', {name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, comentarios: bountyP.comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

});

app.get('/bountyHistorico2', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'finalizada' });
  const bountyP = await Bounty.findOne({ _id: bountyC[1]._id.toHexString()});
  try{

    try{
      
      return res.render('bountyHistorico.ejs', {name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, comentarios: bountyP.comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

});

app.get('/bountyHistorico3', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'finalizada' });
  const bountyP = await Bounty.findOne({ _id: bountyC[2]._id.toHexString()});
  try{

    try{
      
      return res.render('bountyHistorico.ejs', {name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, comentarios: bountyP.comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

});

app.get('/bountyHistorico4', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'finalizada' });
  const bountyP = await Bounty.findOne({ _id: bountyC[3]._id.toHexString()});
  try{

    try{
      
      return res.render('bountyHistorico.ejs', {name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, comentarios: bountyP.comments});
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
  var status;
  const user = await User.findOne({ email: email });
  var bounty = await Bounty.find({status: 'andamento'});
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
          bountyName: bounty[0].name,bountyDescription: bounty[0].description,bountyRestrictions: bounty[0].restrictions, bounty1: '/bounty1',
          bountyName2: bounty[1].name,bountyDescription2: bounty[1].description,bountyRestrictions2: bounty[1].restrictions, bounty2: '/bounty2',
          bountyName3: bounty[2].name,bountyDescription3: bounty[2].description,bountyRestrictions3: bounty[2].restrictions, bounty3: '/bounty3',
          bountyName4: bounty[3].name,bountyDescription4: bounty[3].description,bountyRestrictions4: bounty[3].restrictions, bounty4: '/bounty4', ID1: bounty[0]._id.toHexString(), ID2: bounty[1]._id.toHexString(), ID3: bounty[2]._id.toHexString(), ID4: bounty[3]._id.toHexString()});
      }catch(err){
        console.log('primeiro try');
      }

      try{
        return res.render('home.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bounty[0].name,bountyDescription: bounty[0].description,bountyRestrictions: bounty[0].restrictions, bounty1: '/bounty1',
          bountyName2: bounty[1].name,bountyDescription2: bounty[1].description,bountyRestrictions2: bounty[1].restrictions, bounty2: '/bounty2',
          bountyName3: bounty[2].name,bountyDescription3: bounty[2].description,bountyRestrictions3: bounty[2].restrictions, bounty3: '/bounty3',
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bounty4: '', ID1: bounty[0]._id.toHexString(), ID2: bounty[1]._id.toHexString(), ID3: bounty[2]._id.toHexString(), ID4: 'vazia'});
      }catch(err){
        console.log('segundo try');
      }

      try{
        return res.render('home.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bounty[0].name,bountyDescription: bounty[0].description,bountyRestrictions: bounty[0].restrictions, bounty1: '/bounty1',
          bountyName2: bounty[1].name,bountyDescription2: bounty[1].description,bountyRestrictions2: bounty[1].restrictions, bounty2: '/bounty2',
          bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bounty3: '',
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bounty4: '', ID1: bounty[0]._id.toHexString(), ID2: bounty[1]._id.toHexString(), ID3: 'vazia', ID4: 'vazia'});
      }catch(err){
        console.log('terceiro try');
      } 

      try{
        return res.render('home.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bounty[0].name,bountyDescription: bounty[0].description,bountyRestrictions: bounty[0].restrictions, bounty1: '/bounty1',
          bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', bounty2: '',
          bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bounty3: '',
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bounty4: '', ID1: bounty[0]._id.toHexString(), ID2: 'vazia', ID3: 'vazia', ID4: 'vazia'});
      }catch(err){
        console.log('quarto try');
      }
      
      try{
        return res.render('home.ejs', {name: user.name, genero: user.genero, bio: user.bio,
          bountyName: '',bountyDescription: '',bountyRestrictions: '', bounty1: '',
          bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', bounty2: '',
          bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bounty3: '',
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bounty4: '', ID1: 'vazia', ID2: 'vazia', ID3: 'vazia', ID4: 'vazia'});
      }catch(err){
        console.log('quinto try');
      }

    }catch(err){
      console.log('erro try maior ');
     }
     
});

app.get('/bounty1', async (req,res) => {
  const email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyP = await Bounty.find({status: 'andamento'});
  try{

    try{
      return res.render('bounty.ejs', {name: user.name, bountyName: bountyP[0].name, bountyPrazoFinal: bountyP[0].dataFinal, bountyRestricoes: bountyP[0].restrictions, bountyDescricao: bountyP[0].description, ID: bountyP[0]._id.toHexString(), comentarios: bountyP[0].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

});

app.get('/bounty2', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  
  const bountyP = await Bounty.find({status: 'andamento'});
  try{

    try{
      return res.render('bounty.ejs', {name: user.name, bountyName: bountyP[1].name, bountyPrazoFinal: bountyP[1].dataFinal, bountyRestricoes: bountyP[1].restrictions, bountyDescricao: bountyP[1].description, ID: bountyP[1]._id.toHexString(), comentarios: bountyP[1].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

  
});

app.get('/bounty3', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  
  const bountyP = await Bounty.find({status: 'andamento'});
  try{

    try{
      return res.render('bounty.ejs', {name: user.name, bountyName: bountyP[2].name, bountyPrazoFinal: bountyP[2].dataFinal, bountyRestricoes: bountyP[2].restrictions, bountyDescricao: bountyP[2].description, ID: bountyP[2]._id.toHexString(), comentarios: bountyP[2].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log('finally')}

  
});

app.get('/bounty4', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  
  const bountyP = await Bounty.find({status: 'andamento'});
  try{

    try{
      return res.render('bounty.ejs', {name: user.name, bountyName: bountyP[3].name, bountyPrazoFinal: bountyP[3].dataFinal, bountyRestricoes: bountyP[3].restrictions, bountyDescricao: bountyP[3].description, ID: bountyP[3]._id.toHexString(), comentarios: bountyP[3].comments});
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

app.post('/finalizaBounty', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  await Bounty.updateOne({_id: req.body.ID }, {
    status: 'finalizada'
  });

  res.redirect('/perfil');
});

app.post('/excluiBounty', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  await Bounty.updateOne({_id: req.body.ID }, {
    status: 'excluida'
  });

  res.redirect('/perfil');
});

app.post('/comentarBounty', async (req,res) => {
  const email  = usermail;
  const user = await User.findOne({ email: email });
  
  var preencher = [];
  const bountyC = await Bounty.findOne({_id: req.body.ID });
  
  try {
    bountyC.comments.forEach((el)=>{
      preencher.push(el);
    });
    preencher.push( user.name + ': ' + req.body.comments);
  } catch (error) {
    console.log(error);
  }

  await Bounty.updateOne({_id: req.body.ID }, {
    comments: preencher
  });
  
  const bountyP = await Bounty.findOne({_id: req.body.ID });
  
  res.render('bounty.ejs', {name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, ID: bountyP._id.toHexString(), comentarios: bountyP.comments});
});

app.post('/comentarBountyPerfil', async (req,res) => {
  const email  = usermail;
  const user = await User.findOne({ email: email });
  
  var preencher = [];
  const bountyC = await Bounty.findOne({_id: req.body.ID });
  
  try {
    bountyC.comments.forEach((el)=>{
      preencher.push(el);
    });
    preencher.push( user.name + ': ' + req.body.comments);
  } catch (error) {
    console.log(error);
  }

  await Bounty.updateOne({_id: req.body.ID }, {
    comments: preencher
  });
  
  const bountyP = await Bounty.findOne({_id: req.body.ID });
  
  res.render('bountyPerfil.ejs', {name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, ID: bountyP._id.toHexString(), comentarios: bountyP.comments});
});

app.post('/upload', upload.single('image'), (req, res) => {
  res.redirect('/editarPerfil');
});

app.post('/uploadBountyImg', uploadBounty.single('image'), (req, res) => {
  res.redirect('/home');
});

app.listen(3000);