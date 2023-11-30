
const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");



    router.get('/usuario/cadastro', (req, res) => {
        console.log("usuario cadastro");
        res.render("./usuario/cadastro.ejs",{mensagem: ""});
    });

    // ******************* editar:
    router.get('/usuario/editar/:codigo', (req, res) => {
        console.log("usuario edição");

        var codigo = req.params.codigo;

        Usuario.findByPk(codigo).then( usuario => {
            if( usuario != undefined) {
                res.render("./usuario/edicao.ejs",{mensagem: "", usuario: usuario});
            }else {
                res.render("/usuario/listar/page/:num");
            }
        }).catch(err => {
            console.log(err);
            res.render("/usuario/listar/page/:num");
        })
    });

    // ******************* excluir:
    router.post('/usuario/excluir', (req, res) => {
        console.log("usuario delete");

            var id = req.body.id;

            if(id != undefined){
                if(!isNaN(id)){
                    Usuario.destroy({
                        where: {
                        codigo: id
                        }
                    }).then(() => {
                        res.redirect("/usuario/listar/page/1");
                    })
                }else{
                    res.redirect("/usuario/listar/page/1");
                }
            }else {
                res.redirect("/usuario/listar/page/1");
            }
    });        

    // ******************* buscar:

  
    // ******************* paginação
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

                res.render("usuario/listaUsuarios", {resultado:resultado});
            })

 
        });
                

    // ******************* adicionar
    router.post("/usuario/adicionar", (req, res) => {
        var nome = req.body.nome;
        var email = req.body.email;
        var senha = req.body.senha;
        var senha2 = req.body.senhaRepetir;
        var usuarioCol = req.body.usuarioCol;
    
        Usuario.findOne({where:{email: email}}).then( usuario => {
            if(usuario == undefined){
    
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(senha, salt);
                
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


    // ******************* atualizar
    router.post("/usuario/atualizar/:codigo", (req, res) => {
        var codigo = req.params.codigo;
        var nome = req.body.nome;
        var email = req.body.email;
        var senha = req.body.senha;
        var senha2 = req.body.senhaRepetir;
        var usuarioCol = req.body.usuarioCol;

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(senha, salt);
    
        Usuario.update({
            codigo: codigo,
            nome : nome,
            email : email,
            senha : hash, 
            usuarioCol : usuarioCol,
        },{
            where: {
                codigo: codigo
            }
        }).then(() => {
            res.redirect("/usuario/listar/page/1");
        }).catch(err => {
            console.log("erro: "+err);
            res.render('./usuario/editar/<% usuario.codigo %>', {mensagem:"ocorreu um erro: "+ err});
        });


    });




module.exports = router;