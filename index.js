const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images');
  },
  filename: (req, file, cb) => {
    cb(null, usermail + path.extname(file.originalname))
  }
})

const storageBounty = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images');
  },
  filename: (req, file, cb) => {
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
        bountyName4: bountyP[3].name,bountyDescription4: bountyP[3].description,bountyRestrictions4: bountyP[3].restrictions, bountyPerfil4: '/bountyPerfil4',
        ID1: bountyP[0]._id.toHexString(), ID2: bountyP[1]._id.toHexString(), ID3: bountyP[2]._id.toHexString(), ID4: bountyP[3]._id.toHexString()});
    }catch(err){}
    try{
      return res.render('perfil.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bountyPerfil1: '/bountyPerfil1',
        bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions, bountyPerfil2: '/bountyPerfil2',
        bountyName3: bountyP[2].name,bountyDescription3: bountyP[2].description,bountyRestrictions3: bountyP[2].restrictions, bountyPerfil3: '/bountyPerfil3',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyPerfil4: '',
        ID1: bountyP[0]._id.toHexString(), ID2: bountyP[1]._id.toHexString(), ID3: bountyP[2]._id.toHexString(), ID4: 'vazia'});
    }catch(err){}

    try{
      return res.render('perfil.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bountyPerfil1: '/bountyPerfil1',
        bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions, bountyPerfil2: '/bountyPerfil2',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bountyPerfil3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyPerfil4: '',
        ID1: bountyP[0]._id.toHexString(), ID2: bountyP[1]._id.toHexString(), ID3: 'vazia', ID4: 'vazia'});
    }catch(err){}
    try{
      return res.render('perfil.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bountyPerfil1: '/bountyPerfil1',
        bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', bountyPerfil2: '',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bountyPerfil3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyPerfil4: '',
        ID1: bountyP[0]._id.toHexString(), ID2: 'vazia', ID3: 'vazia', ID4: 'vazia'});
    }catch(err){}
    try{
      return res.render('perfil.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: '',bountyDescription: '',bountyRestrictions: '', bountyPerfil1: '',
        bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', bountyPerfil2: '',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bountyPerfil3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyPerfil4: '',
        ID1: 'vazia', ID2: 'vazia', ID3: 'vazia', ID4: 'vazia'});
    }catch(err){}
  }catch(err){
    console.log(err);
  }   
});

app.get('/editarPerfil', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  res.render('editarPerfil.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio, NOME: user.name, BIO: user.bio, CEP: user.cep, ENDERECO: user.endereco, TELEFONE: user.telefone});
});

app.post('/editarPerfil', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  await User.updateOne({ email: email }, {
      bio: req.body.bio,
      cep: req.body.cep,
      endereco: req.body.endereco,
      name: req.body.name,
      email: req.body.email,
      telefone: req.body.tel
  });
  res.redirect('/perfil')
});

app.get('/bountyPerfil1', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'andamento' });
  const bountyP = await Bounty.findOne({ _id: bountyC[0]._id.toHexString()});
  
  try{

    try{
      return res.render('bountyPerfil.ejs', {mail: email, name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, ID: bountyC[0]._id.toHexString(), comentarios: bountyC[0].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){}

});

app.get('/bountyPerfil2', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'andamento' });
  const bountyP = await Bounty.findOne({ _id: bountyC[1]._id.toHexString()});
  try{

    try{
      
      return res.render('bountyPerfil.ejs', {mail: email, name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, ID: bountyC[1]._id.toHexString(), comentarios: bountyC[1].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){}
  
});

app.get('/bountyPerfil3', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'andamento' });
  const bountyP = await Bounty.findOne({ _id: bountyC[2]._id.toHexString()});
  try{

    try{
      
      return res.render('bountyPerfil.ejs', {mail: email, name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, ID: bountyC[2]._id.toHexString(), comentarios: bountyC[2].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){}
  
});

app.get('/bountyPerfil4', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'andamento' });
  const bountyP = await Bounty.findOne({ _id: bountyC[3]._id.toHexString()});
  try{

    try{
      
      return res.render('bountyPerfil.ejs', {mail: email, name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, ID: bountyC[3]._id.toHexString(), comentarios: bountyC[3].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){}

});

app.post('/editarBounty', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  
  const bountyP = await Bounty.findOne({_id: req.body.ID });
  idB = bountyP._id;

  try{
    try{
      return res.render('editarBounty.ejs', {mail: email, name: user.name, ID: req.body.ID, NOME: bountyP.name, RESTRICAO: bountyP.restrictions, DESCRICAO: bountyP.description});
    }catch(err){
      console.log(err);
    }
  }catch(err){}

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
  
  res.render('bountyPerfil.ejs', {mail: email, name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, ID: bountyP._id.toHexString(), comentarios: bountyP.comments});
});

app.get('/historico', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyP = await Bounty.find({ creator: email, status: 'finalizada' });

  
  try{
    try{
      return res.render('historico.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bountyHistorico1: '/bountyHistorico1',
        bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions, bountyHistorico2: '/bountyHistorico2',
        bountyName3: bountyP[2].name,bountyDescription3: bountyP[2].description,bountyRestrictions3: bountyP[2].restrictions, bountyHistorico3: '/bountyHistorico3',
        bountyName4: bountyP[3].name,bountyDescription4: bountyP[3].description,bountyRestrictions4: bountyP[3].restrictions, bountyHistorico4: '/bountyHistorico4',
        ID1: bountyP[0]._id.toHexString(), ID2: bountyP[1]._id.toHexString(), ID3: bountyP[2]._id.toHexString(), ID4: bountyP[3]._id.toHexString()});
    }catch(err){}
    try{
      return res.render('historico.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bountyHistorico1: '/bountyHistorico1',
        bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions, bountyHistorico2: '/bountyHistorico2',
        bountyName3: bountyP[2].name,bountyDescription3: bountyP[2].description,bountyRestrictions3: bountyP[2].restrictions, bountyHistorico3: '/bountyHistorico3',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyHistorico4: '',
        ID1: bountyP[0]._id.toHexString(), ID2: bountyP[1]._id.toHexString(), ID3: bountyP[2]._id.toHexString(), ID4: 'vazia'});
    }catch(err){}
    try{
      return res.render('historico.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bountyHistorico1: '/bountyHistorico1',
        bountyName2: bountyP[1].name,bountyDescription2: bountyP[1].description,bountyRestrictions2: bountyP[1].restrictions, bountyHistorico2: '/bountyHistorico2',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bountyHistorico3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyHistorico4: '',
        ID1: bountyP[0]._id.toHexString(), ID2: bountyP[1]._id.toHexString(), ID3: 'vazia', ID4: 'vazia'});
    }catch(err){}
    try{
      return res.render('historico.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyP[0].name,bountyDescription: bountyP[0].description,bountyRestrictions: bountyP[0].restrictions, bountyHistorico1: '/bountyHistorico1',
        bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', bountyHistorico2: '',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bountyHistorico3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyHistorico4: '',
        ID1: bountyP[0]._id.toHexString(), ID2: 'vazia', ID3: 'vazia', ID4: 'vazia'});
    }catch(err){}
    try{
      return res.render('historico.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: '',bountyDescription: '',bountyRestrictions: '', bountyHistorico1: '',
        bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', bountyHistorico2: '',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bountyHistorico3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bountyHistorico4: '',
        ID1: 'vazia', ID2: 'vazia', ID3: 'vazia', ID4: 'vazia'});
    }catch(err){}
  
  }catch(err){}
});

app.get('/bountyHistorico1', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'finalizada' });
  const bountyP = await Bounty.findOne({ _id: bountyC[0]._id.toHexString()});
  try{

    try{ 
      return res.render('bountyHistorico.ejs', {mail: email, name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, comentarios: bountyP.comments, ID: bountyP._id.toHexString()});
    }catch(err){
      console.log(err);
    }
  }catch(err){}
});

app.get('/bountyHistorico2', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'finalizada' });
  const bountyP = await Bounty.findOne({ _id: bountyC[1]._id.toHexString()});
  try{

    try{ 
      return res.render('bountyHistorico.ejs', {mail: email, name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, comentarios: bountyP.comments, ID: bountyP._id.toHexString()});
    }catch(err){
      console.log(err);
    }
  }catch(err){}
});

app.get('/bountyHistorico3', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'finalizada' });
  const bountyP = await Bounty.findOne({ _id: bountyC[2]._id.toHexString()});
  try{

    try{
      return res.render('bountyHistorico.ejs', {mail: email, name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, comentarios: bountyP.comments, ID: bountyP._id.toHexString()});
    }catch(err){
      console.log(err);
    }
  }catch(err){}
});

app.get('/bountyHistorico4', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyC = await Bounty.find({ creator: email, status: 'finalizada' });
  const bountyP = await Bounty.findOne({ _id: bountyC[3]._id.toHexString()});
  try{

    try{ 
      return res.render('bountyHistorico.ejs', {mail: email, name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, comentarios: bountyP.comments, ID: bountyP._id.toHexString()});
    }catch(err){
      console.log(err);
    }
  }catch(err){}
});

app.get('/favoritos', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });

  var bounty = await Bounty.find({status: 'andamento'});
  var bountyFiltrada = [];
  try {
    bounty.forEach((b)=>{
      b.favoritos.forEach((f)=>{
        if(f == email){
          bountyFiltrada.push(b);
        }
      });
    });
    
  } catch (error) {
    console.log(error);
  }

  try{
    try{
      return res.render('favoritos.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyFiltrada[0].name,bountyDescription: bountyFiltrada[0].description,bountyRestrictions: bountyFiltrada[0].restrictions, favorito1: '/favorito1',
        bountyName2: bountyFiltrada[1].name,bountyDescription2: bountyFiltrada[1].description,bountyRestrictions2: bountyFiltrada[1].restrictions, favorito2: '/favorito2',
        bountyName3: bountyFiltrada[2].name,bountyDescription3: bountyFiltrada[2].description,bountyRestrictions3: bountyFiltrada[2].restrictions, favorito3: '/favorito3',
        bountyName4: bountyFiltrada[3].name,bountyDescription4: bountyFiltrada[3].description,bountyRestrictions4: bountyFiltrada[3].restrictions, favorito4: '/favorito4', ID1: bountyFiltrada[0]._id.toHexString(), ID2: bountyFiltrada[1]._id.toHexString(), ID3: bountyFiltrada[2]._id.toHexString(), ID4: bountyFiltrada[3]._id.toHexString()});
    }catch(err){}
    try{
      return res.render('favoritos.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyFiltrada[0].name,bountyDescription: bountyFiltrada[0].description,bountyRestrictions: bountyFiltrada[0].restrictions, favorito1: '/favorito1',
        bountyName2: bountyFiltrada[1].name,bountyDescription2: bountyFiltrada[1].description,bountyRestrictions2: bountyFiltrada[1].restrictions, favorito2: '/favorito2',
        bountyName3: bountyFiltrada[2].name,bountyDescription3: bountyFiltrada[2].description,bountyRestrictions3: bountyFiltrada[2].restrictions, favorito3: '/favorito3',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', favorito4: '', ID1: bountyFiltrada[0]._id.toHexString(), ID2: bountyFiltrada[1]._id.toHexString(), ID3: bountyFiltrada[2]._id.toHexString(), ID4: 'vazia'});
    }catch(err){}
    try{
      return res.render('favoritos.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyFiltrada[0].name,bountyDescription: bountyFiltrada[0].description,bountyRestrictions: bountyFiltrada[0].restrictions, favorito1: '/favorito1',
        bountyName2: bountyFiltrada[1].name,bountyDescription2: bountyFiltrada[1].description,bountyRestrictions2: bountyFiltrada[1].restrictions, favorito2: '/favorito2',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', favorito3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', favorito4: '', ID1: bountyFiltrada[0]._id.toHexString(), ID2: bountyFiltrada[1]._id.toHexString(), ID3: 'vazia', ID4: 'vazia'});
    }catch(err){} 
    try{
      return res.render('favoritos.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: bountyFiltrada[0].name,bountyDescription: bountyFiltrada[0].description,bountyRestrictions: bountyFiltrada[0].restrictions, favorito1: '/favorito1',
        bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', favorito2: '',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', favorito3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', favorito4: '', ID1: bountyFiltrada[0]._id.toHexString(), ID2: 'vazia', ID3: 'vazia', ID4: 'vazia'});
    }catch(err){}
    try{
      return res.render('favoritos.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
        bountyName: '',bountyDescription: '',bountyRestrictions: '', favorito1: '',
        bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', favorito2: '',
        bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', favorito3: '',
        bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', favorito4: '', ID1: 'vazia', ID2: 'vazia', ID3: 'vazia', ID4: 'vazia'});
    }catch(err){}
  }catch(err){
    console.log(err);
   }
});

app.get('/favorito1', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });

  var bounty = await Bounty.find({status: 'andamento'});
  var bountyFiltrada = [];
  try {
    bounty.forEach((b)=>{
      b.favoritos.forEach((f)=>{
        if(f == email){
          bountyFiltrada.push(b);
        }
      });
    });
    
  } catch (error) {
    console.log(error);
  }
  
  var favorito = 'aBotaoVERMELHO';
  try {
    bountyFiltrada[0].favoritos.forEach((el)=>{
      if(el == email){
        favorito = 'aBotaoVERDE';
      }
    });
    
  } catch (error) {
    console.log(error);
  }

  try{
    try{
      return res.render('bounty.ejs', {mail: email, name: user.name, EMAIL: user.email, favorito: favorito, bountyName: bountyFiltrada[0].name, bountyPrazoFinal: bountyFiltrada[0].dataFinal, bountyRestricoes: bountyFiltrada[0].restrictions, bountyDescricao: bountyFiltrada[0].description, ID: bountyFiltrada[0]._id.toHexString(), comentarios: bountyFiltrada[0].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log(err)}

});

app.get('/favorito2', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  var index = 1;
  var bounty = await Bounty.find({status: 'andamento'});
  var bountyFiltrada = [];
  try {
    bounty.forEach((b)=>{
      b.favoritos.forEach((f)=>{
        if(f == email){
          bountyFiltrada.push(b);
        }
      });
    });
    
  } catch (error) {
    console.log(error);
  }
  
  var favorito = 'aBotaoVERMELHO';
  try {
    bountyFiltrada[index].favoritos.forEach((el)=>{
      if(el == email){
        favorito = 'aBotaoVERDE';
      }
    });
    
  } catch (error) {
    console.log(error);
  }

  try{

    try{
      return res.render('bounty.ejs', {mail: email, name: user.name, EMAIL: user.email, favorito: favorito, bountyName: bountyFiltrada[index].name, bountyPrazoFinal: bountyFiltrada[index].dataFinal, bountyRestricoes: bountyFiltrada[index].restrictions, bountyDescricao: bountyFiltrada[index].description, ID: bountyFiltrada[index]._id.toHexString(), comentarios: bountyFiltrada[index].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log(err)}

});

app.get('/favorito3', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  var index = 2;
  var bounty = await Bounty.find({status: 'andamento'});
  var bountyFiltrada = [];
  try {
    bounty.forEach((b)=>{
      b.favoritos.forEach((f)=>{
        if(f == email){
          bountyFiltrada.push(b);
        }
      });
    });
    
  } catch (error) {
    console.log(error);
  }
  
  var favorito = 'aBotaoVERMELHO';
  try {
    bountyFiltrada[index].favoritos.forEach((el)=>{
      if(el == email){
        favorito = 'aBotaoVERDE';
      }
    });
    
  } catch (error) {
    console.log(error);
  }

  try{

    try{
      return res.render('bounty.ejs', {mail: email, name: user.name, EMAIL: user.email, favorito: favorito, bountyName: bountyFiltrada[index].name, bountyPrazoFinal: bountyFiltrada[index].dataFinal, bountyRestricoes: bountyFiltrada[index].restrictions, bountyDescricao: bountyFiltrada[index].description, ID: bountyFiltrada[index]._id.toHexString(), comentarios: bountyFiltrada[index].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log(err);}

});

app.get('/favorito4', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  var index = 3;
  var bounty = await Bounty.find({status: 'andamento'});
  var bountyFiltrada = [];
  try {
    bounty.forEach((b)=>{
      b.favoritos.forEach((f)=>{
        if(f == email){
          bountyFiltrada.push(b);
        }
      });
    });
    
  } catch (error) {
    console.log(error);
  }
  
  var favorito = 'aBotaoVERMELHO';
  try {
    bountyFiltrada[index].favoritos.forEach((el)=>{
      if(el == email){
        favorito = 'aBotaoVERDE';
      }
    });
    
  } catch (error) {
    console.log(error);
  }

  try{

    try{
      return res.render('bounty.ejs', {mail: email, name: user.name, EMAIL: user.email, favorito: favorito, bountyName: bountyFiltrada[index].name, bountyPrazoFinal: bountyFiltrada[index].dataFinal, bountyRestricoes: bountyFiltrada[index].restrictions, bountyDescricao: bountyFiltrada[index].description, ID: bountyFiltrada[index]._id.toHexString(), comentarios: bountyFiltrada[index].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log(err);}

});

app.get('/faq', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  res.render('faq.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio});
});

app.get('/home', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  var bounty = await Bounty.find({status: 'andamento'});
  
  try{
      try{
        return res.render('home.ejs', {mail: email,name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bounty[0].name,bountyDescription: bounty[0].description,bountyRestrictions: bounty[0].restrictions, bounty1: '/bounty1',
          bountyName2: bounty[1].name,bountyDescription2: bounty[1].description,bountyRestrictions2: bounty[1].restrictions, bounty2: '/bounty2',
          bountyName3: bounty[2].name,bountyDescription3: bounty[2].description,bountyRestrictions3: bounty[2].restrictions, bounty3: '/bounty3',
          bountyName4: bounty[3].name,bountyDescription4: bounty[3].description,bountyRestrictions4: bounty[3].restrictions, bounty4: '/bounty4', ID1: bounty[0]._id.toHexString(), ID2: bounty[1]._id.toHexString(), ID3: bounty[2]._id.toHexString(), ID4: bounty[3]._id.toHexString()});
      }catch(err){}
      try{
        return res.render('home.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bounty[0].name,bountyDescription: bounty[0].description,bountyRestrictions: bounty[0].restrictions, bounty1: '/bounty1',
          bountyName2: bounty[1].name,bountyDescription2: bounty[1].description,bountyRestrictions2: bounty[1].restrictions, bounty2: '/bounty2',
          bountyName3: bounty[2].name,bountyDescription3: bounty[2].description,bountyRestrictions3: bounty[2].restrictions, bounty3: '/bounty3',
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bounty4: '', ID1: bounty[0]._id.toHexString(), ID2: bounty[1]._id.toHexString(), ID3: bounty[2]._id.toHexString(), ID4: 'vazia'});
      }catch(err){}
      try{
        return res.render('home.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bounty[0].name,bountyDescription: bounty[0].description,bountyRestrictions: bounty[0].restrictions, bounty1: '/bounty1',
          bountyName2: bounty[1].name,bountyDescription2: bounty[1].description,bountyRestrictions2: bounty[1].restrictions, bounty2: '/bounty2',
          bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bounty3: '',
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bounty4: '', ID1: bounty[0]._id.toHexString(), ID2: bounty[1]._id.toHexString(), ID3: 'vazia', ID4: 'vazia'});
      }catch(err){} 
      try{
        return res.render('home.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
          bountyName: bounty[0].name,bountyDescription: bounty[0].description,bountyRestrictions: bounty[0].restrictions, bounty1: '/bounty1',
          bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', bounty2: '',
          bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bounty3: '',
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bounty4: '', ID1: bounty[0]._id.toHexString(), ID2: 'vazia', ID3: 'vazia', ID4: 'vazia'});
      }catch(err){}
      try{
        return res.render('home.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio,
          bountyName: '',bountyDescription: '',bountyRestrictions: '', bounty1: '',
          bountyName2: '',bountyDescription2: '',bountyRestrictions2: '', bounty2: '',
          bountyName3: '',bountyDescription3: '',bountyRestrictions3: '', bounty3: '',
          bountyName4: '',bountyDescription4: '',bountyRestrictions4: '', bounty4: '', ID1: 'vazia', ID2: 'vazia', ID3: 'vazia', ID4: 'vazia'});
      }catch(err){}
    }catch(err){
      console.log(err);
     }
});

app.get('/bounty1', async (req,res) => {
  const email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyP = await Bounty.find({status: 'andamento'});

  var favorito = 'aBotaoVERMELHO';
  try {
    bountyP[0].favoritos.forEach((el)=>{
      if(el == email){
        favorito = 'aBotaoVERDE';
      }
    });
    
  } catch (error) {
    console.log(error);
  }

  try{

    try{
      return res.render('bounty.ejs', {mail: email, name: user.name, EMAIL: user.email, favorito: favorito, bountyName: bountyP[0].name, bountyPrazoFinal: bountyP[0].dataFinal, bountyRestricoes: bountyP[0].restrictions, bountyDescricao: bountyP[0].description, ID: bountyP[0]._id.toHexString(), comentarios: bountyP[0].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log(err);}

});

app.get('/bounty2', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyP = await Bounty.find({status: 'andamento'});
  
  var favorito = 'aBotaoVERMELHO';
  try {
    bountyP[1].favoritos.forEach((el)=>{
      if(el == email){
        favorito = 'aBotaoVERDE';
      }
    });
    
  } catch (error) {
    console.log(error);
  }

  try{

    try{
      return res.render('bounty.ejs', {mail: email, name: user.name, EMAIL: user.email, favorito: favorito, bountyName: bountyP[1].name, bountyPrazoFinal: bountyP[1].dataFinal, bountyRestricoes: bountyP[1].restrictions, bountyDescricao: bountyP[1].description, ID: bountyP[1]._id.toHexString(), comentarios: bountyP[1].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log(err);}
  
});

app.get('/bounty3', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyP = await Bounty.find({status: 'andamento'});
  
  var favorito = 'aBotaoVERMELHO';
  try {
    bountyP[2].favoritos.forEach((el)=>{
      if(el == email){
        favorito = 'aBotaoVERDE';
      }
    });
    
  } catch (error) {
    console.log(error);
  }
  
  try{

    try{
      return res.render('bounty.ejs', {mail: email, name: user.name, EMAIL: user.email, favorito: favorito, bountyName: bountyP[2].name, bountyPrazoFinal: bountyP[2].dataFinal, bountyRestricoes: bountyP[2].restrictions, bountyDescricao: bountyP[2].description, ID: bountyP[2]._id.toHexString(), comentarios: bountyP[2].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log(err);}

});

app.get('/bounty4', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyP = await Bounty.find({status: 'andamento'});
  
  var favorito = 'aBotaoVERMELHO';
  try {
    bountyP[3].favoritos.forEach((el)=>{
      if(el == email){
        favorito = 'aBotaoVERDE';
      }
    });
    
  } catch (error) {
    console.log(error);
  }
  
  try{

    try{
      return res.render('bounty.ejs', {mail: email, name: user.name, EMAIL: user.email, favorito: favorito, bountyName: bountyP[3].name, bountyPrazoFinal: bountyP[3].dataFinal, bountyRestricoes: bountyP[3].restrictions, bountyDescricao: bountyP[3].description, ID: bountyP[3]._id.toHexString(), comentarios: bountyP[3].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log(err);}
  
});

app.get('/criarBounty', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  res.render('criarBounty.ejs', {mail: email, name: user.name, genero: user.genero, bio: user.bio, email: user.email});
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
  
  var favorito = 'aBotaoVERMELHO';
  try {
    bountyP.favoritos.forEach((el)=>{
      if(el == email){
        favorito = 'aBotaoVERDE';
      }
    });
    
  } catch (error) {
    console.log(error);
  }

  res.render('bounty.ejs', {mail: email, name: user.name, EMAIL: user.email, favorito: favorito, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, ID: bountyP._id.toHexString(), comentarios: bountyP.comments});
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
  
  res.render('bountyPerfil.ejs', {mail: email, name: user.name, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, ID: bountyP._id.toHexString(), comentarios: bountyP.comments});
});

app.post('/favoritarBounty', async (req,res) => {
  const email  = req.body.EMAIL;
  const user = await User.findOne({ email: email });
  
  var preencher = [];
  var vaiDESFavoritar = false;
  const bountyC = await Bounty.findOne({_id: req.body.ID });
  
  try {
    bountyC.favoritos.forEach((el)=>{
      if(el == req.body.EMAIL){
        vaiDESFavoritar = true;
      }
      else{
        preencher.push(el);
      }
      
    });
    
    if(vaiDESFavoritar){}
    else{
      preencher.push(req.body.EMAIL);
    }
    
  } catch (error) {
    console.log(error);
  }

  await Bounty.updateOne({_id: req.body.ID }, {
    favoritos: preencher
  });
  
  const bountyP = await Bounty.findOne({_id: req.body.ID });
  
  var favorito = 'aBotaoVERMELHO';
  try {
    bountyP.favoritos.forEach((el)=>{
      if(el == email){
        favorito = 'aBotaoVERDE';
      }
    });
    
  } catch (error) {
    console.log(error);
  }
  
  try{

    try{
      return res.render('bounty.ejs', {mail: email, name: user.name, EMAIL: user.email, favorito: favorito, bountyName: bountyP.name, bountyPrazoFinal: bountyP.dataFinal, bountyRestricoes: bountyP.restrictions, bountyDescricao: bountyP.description, ID: bountyP._id.toHexString(), comentarios: bountyP.comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log(err)}

});

app.post('/upload', upload.single('image'), (req, res) => {
  res.redirect('/editarPerfil');
});

app.post('/uploadBountyImg', uploadBounty.single('image'), (req, res) => {
  res.redirect('/home');
});

app.get('/searchResult', async (req,res) => {
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  res.render('searchResult.ejs',{mail: email,name: user.name, genero: user.genero, bio: user.bio})
})

app.post('/pesquisar', async (req,res)=>{
  const  email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyS = await Bounty.find({name: req.body.pesquisa});
    try{
      try{
        return res.render('searchResult.ejs',{mail: email,name: user.name, Bname: bountyS[0].name, Bdescription: bountyS[0].description, ID1: bountyS[0]._id.toHexString(), pesquisa1: '/pesquisa1',
        Bname1: bountyS[1].name, Bdescription1: bountyS[1].description, ID2: bountyS[1]._id.toHexString(), pesquisa2: '/pesquisa2',
        Bname2: bountyS[2].name, Bdescription2: bountyS[2].description, ID3: bountyS[2]._id.toHexString(), pesquisa3: '/pesquisa3', nomeP: req.body.pesquisa});
      }catch(err){}

      try{
        return res.render('searchResult.ejs',{mail: email,name: user.name, Bname: bountyS[0].name, Bdescription: bountyS[0].description, ID1: bountyS[0]._id.toHexString(), pesquisa1: '/pesquisa1',
          Bname1: bountyS[1].name, Bdescription1: bountyS[1].description, ID2: bountyS[1]._id.toHexString(), pesquisa2: '/pesquisa2',
          Bname2: '', Bdescription2: '', ID3: 'vazia', pesquisa3: '/pesquisar', nomeP: req.body.pesquisa});
      }catch(err){}

      try{
        return res.render('searchResult.ejs',{mail: email,name: user.name, Bname: bountyS[0].name, Bdescription: bountyS[0].description, ID1: bountyS[0]._id.toHexString(), pesquisa1: '/pesquisa1',
          Bname1: '', Bdescription1: '', ID2: 'vazia', pesquisa2: '/pesquisar',
          Bname2: '', Bdescription2: '', ID3: 'vazia', pesquisa3: '/pesquisar', nomeP: req.body.pesquisa});
      }catch(err){}

      try{
        return res.render('searchResult.ejs',{mail: email,name: user.name, Bname: 'Nenhuma bounty corresponde ao termo pesquisado.', Bdescription: '', ID1: 'vazia', pesquisa1: '/pesquisar',
          Bname1: '', Bdescription1: '', ID2: 'vazia', pesquisa2: '/pesquisar',
          Bname2: '', Bdescription2: '', ID3: 'vazia', pesquisa3: '/pesquisar', nomeP: req.body.pesquisa});
      }catch(err){}

    }catch(err){
      console.log(err);
    }
})

app.post('/pesquisa1', async (req,res) => {
  const email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyP = await Bounty.find({name: req.body.nomeP});
  var index = 0;
  
  var favorito = 'aBotaoVERMELHO';
  try {
    bountyP[0].favoritos.forEach((el)=>{
      if(el == email){
        favorito = 'aBotaoVERDE';
      }
    });
    
  } catch (error) {
    console.log(error);
  }

  try{

    try{
      return res.render('bounty.ejs', {mail: email, name: user.name, EMAIL: user.email, favorito: favorito, bountyName: bountyP[index].name, bountyPrazoFinal: bountyP[index].dataFinal, bountyRestricoes: bountyP[index].restrictions, bountyDescricao: bountyP[index].description, ID: bountyP[index]._id.toHexString(), comentarios: bountyP[index].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){}

});

app.post('/pesquisa2', async (req,res) => {
  const email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyP = await Bounty.find({name: req.body.nomeP});
  var index = 1;
  
  var favorito = 'aBotaoVERMELHO';
  try {
    bountyP[0].favoritos.forEach((el)=>{
      if(el == email){
        favorito = 'aBotaoVERDE';
      }
    });
    
  } catch (error) {
    console.log(error);
  }

  try{

    try{
      return res.render('bounty.ejs', {mail: email, name: user.name, EMAIL: user.email, favorito: favorito, bountyName: bountyP[index].name, bountyPrazoFinal: bountyP[index].dataFinal, bountyRestricoes: bountyP[index].restrictions, bountyDescricao: bountyP[index].description, ID: bountyP[index]._id.toHexString(), comentarios: bountyP[index].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){}

});

app.post('/pesquisa3', async (req,res) => {
  const email  = usermail;
  const user = await User.findOne({ email: email });
  const bountyP = await Bounty.find({name: req.body.nomeP});
  var index = 2;
  
  var favorito = 'aBotaoVERMELHO';
  try {
    bountyP[0].favoritos.forEach((el)=>{
      if(el == email){
        favorito = 'aBotaoVERDE';
      }
    });
    
  } catch (error) {
    console.log(error);
  }

  try{

    try{
      return res.render('bounty.ejs', {mail: email, name: user.name, EMAIL: user.email, favorito: favorito, bountyName: bountyP[index].name, bountyPrazoFinal: bountyP[index].dataFinal, bountyRestricoes: bountyP[index].restrictions, bountyDescricao: bountyP[index].description, ID: bountyP[index]._id.toHexString(), comentarios: bountyP[index].comments});
    }catch(err){
      console.log(err);
    }
  }catch(err){console.log(err);}

});

app.listen(3000);