require('dotenv').config();

const express = require("express");
const app = express();
const session = require('express-session');

const UsuarioController = require('./controllers/UsuarioController');
const PrincipalController = require('./controllers/PrincipalController');

const connection = require('./database/database');
const Usuario = require("./models/Usuario");

connection
    .authenticate()
    .then(() => {
    console.log("Conexão feita com o Banco de Dados!");
    })
    .catch((msgErro) =>{
        console.log("Não foi possível conectar ao Banco de Dados: " + msgErro);
    });

app.set('view engine', 'ejs');

app.use(session({
    secret: "lsdçqcgfegh",
    resave: true, //novo parametro obrigatorio
    saveUninitialized: true, //novo parametro obrigatorio
    cookie: { maxAge: 30000} //miliseg
}));

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());


//rotas
app.use('/', UsuarioController);
app.use('/', PrincipalController);


/*
app.get("/", (req,res) => {
    res.render("index");
});

app.get("/home", (req,res) => {
    res.render("home");
});

app.use("/login", (req, res) => {
    res.render("usuario/login");
})
app.get("/authenticate",(req,res) => {
    console.log(req.body.email);
    console.log(req.body.password);
    //autenticar
    //res.render("userAdm");
});
*/


app.listen(8080, () => {
    console.log("app rodando porta 8080!");
})

