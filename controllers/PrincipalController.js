const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");

router.get("/", (req, res) => {
    res.render('login',{mensagem:""});
});

router.post("/autenticar", (req,res) => {
    var formEmail = req.body.email;
    var formSenha = req.body.senha;

    Usuario.findOne({where:{email: formEmail}}).then(usuario => {

        if (usuario != undefined){
            var senhaCorreta = bcrypt.compareSync(formSenha,usuario.senha);

            if(senhaCorreta){
                req.session.user = {
                    nome: usuario.nome,
                    email: usuario.email
                }

                res.redirect("/usuario/listar/page/1");
            }else{
                res.render("./login",{mensagem:"usuário ou senha incorreto!"});
            }            
        }else {
            res.render("./login",{mensagem:"usuário ou senha incorreto!"});
        }
    })
});

router.get("/logout",  adminAuth,(req,res) => {
    req.session.user = undefined;
    res.redirect("/");
})

module.exports = router;