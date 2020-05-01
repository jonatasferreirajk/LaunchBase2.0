const fs = require('fs')
const data = require('../data.json')
const {age, date} = require('../utils')

exports.index = function(req, res){
    return res.render("instructors/index", {instructors: data.instructors})
}

//show
exports.show = function(req, res){
    const { id } = req.params
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if(!foundInstructor){
        return res.send("Instructor not Found!")
    }

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        create_at: new Intl.DateTimeFormat("pt-br").format(foundInstructor.create_at)
    }

    return res.render("instructors/show", {instructor})
}

exports.create = function(req,res){
    return res.render('instructors/create');
}

//create
exports.post = function(req,res){
    
    const keys  = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Please, send all informations")
        }     
    }
    let {avatar_url, birth, name, services, gender} = req.body

    birth = Date.parse(birth)
    const create_at = Date.now()
    const id = data.instructors.length + 1

   

    data.instructors.push({
        id, 
        avatar_url, 
        name, 
        birth, 
        gender,
        services, 
        create_at 
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send("Error write file!")
        }
        return res.redirect('/instructors')
    })
    
  // return res.send(req.body)
}
//edit (Página)
exports.edit = function (req, res){
    const { id } = req.params
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if(!foundInstructor){
        return res.send("Instructor not Found!")
    }

    const instructor = {
        ...foundInstructor,
        birth:date(foundInstructor.birth)
    }

    return res.render('instructors/edit', {instructor})
}

//put
exports.put = function(req,res){
    const {id} = req.body
    let index = 0;
    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if(id == instructor.id){
            index = foundIndex
            return true
        }
    })

    if(!foundInstructor){
        return res.send("Instructor not Found!")
    }

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth : Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send("Write error file!")
        }
        return res.redirect(`/instructors/${id}/`)
    })
}

//delete
exports.delete = function(req, res){
    const {id} = req.body
    
    const filteredInstructors = data.instructors.filter( function (instructor){
        return instructor.id != id
    })
    
    data.instructors = filteredInstructors
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err){
            res.send("Write File Error!")
        }
        return res.redirect('/instructors')
    })
}