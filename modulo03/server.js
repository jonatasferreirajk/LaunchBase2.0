const express = require('express')
const nunjuncks = require('nunjucks')

const server = express()

const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjuncks.configure("views", {
    express: server,
    autoescape : false,
    noCache: true
})


server.get("/", function(req, res) {
    const about = {
        avatar_url: "https://i.imgur.com/3H6ry3h.jpg",
        name: "Jonatas Ferreira",
        role: "Engenheiro de Software",
        description: "Barachel em Engenharia de Software pela Unicesumar e Nerd Raiz! ;)",
        links: [
            {name: "Github", url: "https://github.com/kingston1996"},
            {name: "Twitter", url: "https://twitter.com/TheKingstonJK"},
            {name: "Linkedin", url: "https://www.linkedin.com/in/jonatasferreirajk/"}  
        ]
    }
   
    return res.render("about", {about})
})

server.get("/portfolio", function(req, res) {
    return res.render("portfolio", {itens: videos})
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        if(video.id == id){
            return true
        }
    })

    if(!video){
        return res.send("Video not Found!!")
    }
    return res.render("video", {item: video})
})

server.listen(5000, function() {
    console.log("server is running")
})