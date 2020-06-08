const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
const User = require('./models/Usuario');
const bcrypt = require('bcrypt');
const path = require('path');

const session = require('express-session');
const flash = require('connect-flash');

// Config
    // Sessão
        app.use(session({
            secret: "eugostodecomeresterco",
            resave: true,
            saveUninitialized: true
        }));
        app.use(flash());
    // Middleware
        app.use((req,res,next) => {
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
            next();
        });
    // Template Engine
        app.engine('handlebars', handlebars({
            defaultLayout: 'main',
        }));
        app.set('view engine', 'handlebars');

    // Body Parser
          app.use(bodyParser.urlencoded({ extended: false }));
          app.use(bodyParser.json());   

    // Public (Arquivos estáticos)
        app.use(express.static(path.join(__dirname, "public")))
// Rotas

        //app.get('/home', application.IsAuthenticated);
        //app.get('/logout', application.destroySession);

        app.get('/', function(req, res) {
            Post.findAll({order: [['id', 'DESC']]}).then(posts=>{ //DESC: do mais novo ao mais antigo //ASC: o inverso
                const informations = {
                    postDocuments: posts.map(document => {
                      return {
                        id: document.id,
                        titulo: document.titulo,
                        conteudo: document.conteudo,
                        createdAt: document.createdAt
                      }
                    })
                  }
                
                res.render('home', {
                    posts: informations.postDocuments
                });
            });
        });

        app.get('/cad', function(req, res) {
            res.render('formulario');
        });

        app.post('/add', function(req, res) {
            Post.create({
                titulo: req.body.titulo,
                conteudo: req.body.conteudo
            })

            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                res.send('Erro: ' + err);
            });
        });

        app.get('/deletar/:id', function(req, res) {
            Post.destroy({
                where: {
                    'id': req.params.id
                }
            })
            .then(()=>{
                res.send('Postagem excluída com sucesso!<br><br>' + 
                '<a href="/"><button>HOME</button></a>');
                res.redirect('/');
            })
            .catch(err=>{
                res.send(err);
                res.redirect('/404');
            });
        });

        app.get('/404', function(req, res) {
            res.send('ERROR 404');
        });

        app.get('/register', (req, res) => {
            res.render('register');
        });

        app.post('/register', async (req, res) => {
            var user = req.body.usuario;
            var email = req.body.email;
            var senha = req.body.senha;
            var senha1 = req.body.csenha;

            var Senha = await bcrypt.hash(senha, 10)

            if(senha === senha1) {
                User.findOne({
                    where: {
                        email: email
                    }
                }).then(result => {
                    if(!result) {
                        User.create({
                            usuario: user,
                            senha: Senha,
                            email: email
                        }).then(()=>{
                            res.redirect('/login');
                        })
                    } else {
                        res.send('email ja esta cadastrado!');
                    }
                }).catch(err=>{
                    res.send(err);
                })
            } else {
                res.send('As senhas não coicidem!');
                return;
            }
        });

        app.get('/login', (req, res) => {
            res.render('login');
        });

        app.post('/login', (req, res) => {
            var email = req.body.email;
            var senha = req.body.senha;

            User.findOne({
                where: {
                    email: email
                }
            }).then(result => {
                if(result && bcrypt.compareSync(senha, result.senha)) {
                    res.redirect('/');
                } else {
                    res.send('Usuário não existe!');
                }
            }).catch(err => {
                res.send('Error: ' + err);
            })
        });

app.listen(3000, function() {
    console.log("Servidor rodando!");
});