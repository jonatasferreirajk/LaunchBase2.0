const { age, date } = require('/home/jonatas/Área de Trabalho/LauchBase2.0/modulo05/src/lib/utils')
const Member = require('/home/jonatas/Área de Trabalho/LauchBase2.0/modulo05/src/app/models/member')

module.exports = {
    index(req, res) {
        Member.all(function (members) {
            return res.render("members/index", {members})
        })

    },

    create(req, res) {
        Member.instructorsSelectOptions(function(options){
            return res.render('members/create', {instructorOptions : options})
        })
        
    },

    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, send all informations")
            }
        }
        Member.create(req.body, function(member){
            return res.redirect(`/members/${member.id}`)
        })
    },

    show(req, res) {
        Member.find(req.params.id, function(member){
            if(!member) return res.send("member not Found!")
            member.birth = date(member.birth).birthDay
            return res.render("members/show", {member})
        })
    },

    edit(req, res) {
        Member.find(req.params.id, function(member){
            if(!member) return res.send("member not Found!")
            member.birth = date(member.birth).iso

            Member.instructorsSelectOptions(function(options){
                return res.render('members/edit', {member, instructorOptions : options})
            })
        })
    },

    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, send all informations")
            }
        }
        Member.update(req.body, function(){
            return res.redirect(`/members/${req.body.id}`)
        })

    },
    delete(req, res) {
        Member.delete(req.body.id, function(){
            return res.redirect(`/members`)
        })
    }
}