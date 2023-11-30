
const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");



router.get('/usuario/cadastro', (req, res) => {
        console.log("usuario cadastro");
        res.render("./usuario/cadastro.ejs",{mensagem: ""});
    });

    //editar:

    //excluir:

    //buscar:


    router.get("/usuario/listar/page/:num", (req, res) => {
            var pagina = req.params.num;
            var offset = 0;
            if(isNaN(pagina) || pagina == 1) {
                  offset = 0;
            }else{
                  offset = (parseInt(pagina) - 1) * 2;
            }

            Usuario.findAndCountAll({
                limit:2,
                offset: offset,
                order: [['nome','ASC']]

            }). then(usuarios => {
                
                var prox;
                if (offset + 2 >= usuarios.count){
                    prox = false;
                } else{
                    prox = true;
                }

                var resultado = {
                    prox: prox,
                    pagina: parseInt(pagina),
                    usuarios: usuarios
                }

                console.log(resultado);
                res.render("usuario/listaUsuarios", {resultado:resultado});
            })

 
        });
                

/*
        Usuario.findAll().then( usuarios => {
            res.render("usuario/listaUsuarios",{ usuarios: usuarios});
        });    
    });
*/
    

    router.post("/usuario/adicionar", (req, res) => {
        var nome = req.body.nome;
        var email = req.body.email;
        var senha = req.body.senha;
        var senha2 = req.body.senhaRepetir;
        var usuarioCol = req.body.usuarioCol;
    
        console.log(req.body);
        
        Usuario.findOne({where:{email: email}}).then( usuario => {
            if(usuario == undefined){
    
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(senha, salt);
    
                console.log(hash);
                
                Usuario.create({
                    nome: nome,
                    email: email,
                    senha: hash,
                    usuarioCol: usuarioCol
                }).then(() => {
                    //res.redirect("/usuario/cadastro");
                    res.render("./usuario/cadastro", {mensagem:"Usuário foi criado!"});
                }).catch((err) => {
                    //res.redirect("/usuario/cadastro");
                    res.render("./usuario/cadastro", {mensagem:"ocorreu um erro: "+ err});
                });
    
    
            }else{
                res.render('./usuario/cadastro', {mensagem:"Este e-mail já existe! tente novamente"});
            }
        });
    });


/*
router.get("/admin/users", (req, res) => {
    User.findAll().then( users => {
        res.render("admin/users/index",{ users: users})
    })
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
});

*/



/*
router.get("/login", (req,res) => {
    res.render("admin/users/login");
});



router.post("/authenticate", (req, res) => {

    var email = req.body.email;
    var senha = req.body.senha;

    console.log("email:"+email+"  "+"senha:"+senha);


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
*/


module.exports = router;