const fs = require('fs')
const data = require('../data.json')
const {age, date} = require('../utils')

exports.index = function(req,res){
    
    return res.render("teachers/index", {teachers: data.teachers})
}

//show
exports.show = function(req, res){
    const {id} = req.params
    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if(!foundTeacher) return res.send("Teacher Not Found! Try Again!")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        escolaridade: foundTeacher.escolaridade,
        modalidade: foundTeacher.modalidade,
        areadeatuação: foundTeacher.areadeatuação.split(","),
        created_at: Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    return res.render('teachers/show', {teacher})
}

exports.create = function(req,res){
    return res.render("teachers/create")
}

//create
exports.post = function (req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please insert All Informations!")
        }
    }
    let { avatar_url, birth, name, escolaridade, modalidade, areadeatuação, gender} = req.body

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
        areadeatuação,
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

// edit
exports.edit = function(req, res){
    const {id} = req.params
    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if(!foundTeacher) return res.send("Teacher Not Found! Try Again!")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth),
        escolaridade: foundTeacher.modalidade
    }
    
    return res.render('teachers/edit', {teacher})
}

//put

exports.put = function(req, res){
    const {id} = req.body
    let index = 0;
    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if( id == teacher.id){
            index = foundIndex
            return true
        }
    })

    if(!foundTeacher) return res.send("Teacher Not Found! Try Again!")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth : Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher
    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if(err){
            return res.send("Write File Error!")
        }
        return res.redirect(`/teachers/${id}`)
    })
}

//delete
exports.delete = function(req, res){
    const {id} = req.body
    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        res.send("Write Error FILE!")
    })

    return res.redirect('/teachers')
}