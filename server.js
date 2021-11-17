if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

// trocar pelo mongo 
const users = []

app.set('view-engine', 'ejs')
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// Rotas

app.get('/', (req,res) => {
    res.render ('perfil.ejs', { name: req.user.name })
})

app.get('/login', (req,res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

app.post('/registration', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        telefone: req.body.telefone,
        dataN: req.body.dataN,
        cep: req.body.cep,
        nacionalidade: req.body.nacionalidade,
        endereço: req.body.end,
        genero: req.body.genero,
        password: hashedPassword
      })
      res.redirect('/login')
    } catch {
      res.redirect('/registration')
    }
    console.log(users)
  })

app.get('/registration', (req,res) => {
    res.render('registration.ejs')
})

app.get('/forgotPassword', (req,res) => {
  res.render('forgotPassword.ejs')
})

app.post('/forgotPassword', async (req, res) => {
  
})

app.get('/editarPerfil', (req,res) => {
  res.render('editarPerfil.ejs', { name: req.user.name })
})

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }


const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.listen(3000)