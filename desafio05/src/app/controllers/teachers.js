const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        return res.render("teachers/index")

    },
    create(req, res) {
        return res.render("teachers/create")

    },
    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please insert All Informations!")
            }
        }
        let { avatar_url, birth, name, escolaridade, modalidade, areadeatuação, gender } = req.body

        return
    },
    show(req, res) {
        return

    },
    edit(req, res) {

        return
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please insert All Informations!")
            }
        }
        return

    },
    delete(req, res) {

        return
    }
}
