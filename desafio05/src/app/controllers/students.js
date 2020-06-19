const { age, date } = require('../../lib/utils')
const Student = require('/home/jonatas/Área de Trabalho/LauchBase2.0/desafio05/src/app/models/student')
module.exports = {
    index(req, res) {
        let {filter, page, limit} = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students){
                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }
                return res.render("students/index", {students, pagination, filter})
            }
        }

        Student.paginate(params)
    },
    create(req, res) {
        Student.teachersSelectOptions(function(options){
            return res.render('students/create', {teacherOptions: options})
        })
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
            Student.teachersSelectOptions(function(options){
                return res.render('students/edit', {student, teacherOptions: options})
            })
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
