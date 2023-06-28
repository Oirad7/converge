
const express = require("express");
const router = express.Router();
const Usuario = require("../../models/Usuario");
const bcrypt = require("bcryptjs");

/*
router.get("/admin/users", (req, res) => {
    User.findAll().then( users => {
        res.render("admin/users/index",{ users: users})
    })
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    
    User.findOne({where:{email: email}}).then( user => {
        if(user == undefined){

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch((err) => {
                res.redirect("/");
            });


        }else{
            res.redirect("/admin/users/create");
        }
    });
});

router.get("/login", (req,res) => {
    res.render("admin/users/login");
});
*/


router.post("/authenticate", (req, res) => {

    var email = req.body.email;
    var senha = req.body.senha;

    Usuario.findOne({
        where:{email: email}
    }).then(Usuario => {
        if(Usuario != undefined){ // Se existe um usuário com esse e-mail
            // Validar senha

            var correct = bcrypt.compareSync(senha,Usuario.senha);

            if(correct){
                req.session.user = {
                    nome: Usuario.nome,
                    email: Usuario.email
                }
                res.redirect("/home");
            }else{
                res.redirect("/login"); 
            }

        }else{
            res.redirect("/login");
        }
    });

});

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
})


module.exports = router;