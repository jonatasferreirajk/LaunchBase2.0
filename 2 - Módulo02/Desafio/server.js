const express = require('express')
const nunjucks = require('nunjucks');

const server = express()
const cursos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server
})


server.get("/", function (req, res) {
    return res.render("inicio")
})

server.get("/conteudos", function (req, res) {
    return res.render("conteudos", { conteudos: cursos })
})

server.get("/curso", function (req, res) {
    const id = req.query.id
    
    const curso = cursos.find(function(curso){
        if(curso.id == id){
            return true
        }
    })
    if(!curso){
        return res.send("Course not Found!")
    }
    return res.render("curso", {conteudo: curso})
})

server.get("/sobre", function (req, res) {
    return res.render("sobre")
})

server.use(function (req, res) {
    res.status(404).render("not-found");
});

server.listen(5000, function () {
    console.log("server is LIGADOOOO!")
})