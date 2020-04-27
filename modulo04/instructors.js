const fs = require('fs')
const data = require('./data.json')
const {age, date} = require('./utils')

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
//edit
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


//update

//delete