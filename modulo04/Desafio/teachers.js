const fs = require('fs')
const data = require('./data.json')

//create
exports.post = function (req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please insert All Informations!")
        }
    }
    let { avatar_url, birth, name, escolaridade, modalidade, áreadeatuação, gender} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = data.teachers.length + 1



    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        escolaridade,
        modalidade,
        áreadeatuação,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!")
        }
        return res.redirect("/teachers")
    })

    // return res.send(req.body)
}

//post

//update

//dele