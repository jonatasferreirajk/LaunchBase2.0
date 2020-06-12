const { age, date } = require('../../lib/utils')
const Student = require('/home/jonatas/Área de Trabalho/LauchBase2.0/desafio05/src/app/models/student')
module.exports = {
    index(req, res) {
        Student.all(function(students){
            return res.render("students/index", {students})
        })
    },
    create(req, res) {
        return res.render("students/create")

    },
    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please insert All Informations!")
            }
        }
       Student.create(req.body, function(student){
           return res.redirect(`/students/${student.id}`)
       })
    },
    show(req, res) {
        Student.find(req.params.id, function(student){
            if(!student) return res.send("Student not Found!")
            student.birth = date(student.birth).birthDay
        
            student.created_at = date(student.created_at).format

            return res.render("students/show", {student})
        })

    },
    edit(req, res) {
        Student.find(req.params.id, function(student){
            if(!student) return res.send("Student not Found!")
            student.birth = date(student.birth).iso
            student.created_at = date(student.created_at).format
            return res.render("students/edit", {student})
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please insert All Informations!")
            }
        }
        Student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`)
        })

    },
    delete(req, res) {
        Student.delete(req.body.id, function(){
            return res.redirect(`/students`)
        })
    }
}
