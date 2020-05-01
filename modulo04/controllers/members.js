const fs = require('fs')
const data = require('../data.json')
const {age, date} = require('../utils')

exports.index = function(req, res){
    return res.render("members/index", {members: data.members})
}

//show
exports.show = function(req, res){
    const { id } = req.params
    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if(!foundMember){
        return res.send("Member not Found!")
    }

    const member = {
        ...foundMember,
        age: age(foundMember.birth)
    }

    return res.render("members/show", {member})
}

exports.create = function(req,res){
    return res.render('members/create');
}


//post
exports.post = function(req,res){
    
    const keys  = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Please, send all informations")
        }     
    }
   
    birth = Date.parse(req.body.birth)

    let id = 1
    const lastMember = data.members[data.members.length - 1]
    if(lastMember){
        id = lastMember.id + 1
    }

    data.members.push({
        ...req.body,
        id,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send("Error write file!")
        }
        return res.redirect('/members')
    })
}
//edit (Página)
exports.edit = function (req, res){
    const { id } = req.params
    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if(!foundMember){
        return res.send("Member not Found!")
    }

    const member = {
        ...foundMember,
        birth:date(foundMember.birth)
    }

    return res.render('members/edit', {member})
}

//put
exports.put = function(req,res){
    const {id} = req.body
    let index = 0;
    const foundMember = data.members.find(function(member, foundIndex){
        if(id == member.id){
            index = foundIndex
            return true
        }
    })

    if(!foundMember){
        return res.send("Member not Found!")
    }

    const member = {
        ...foundMember,
        ...req.body,
        birth : Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send("Write error file!")
        }
        return res.redirect(`/members/${id}/`)
    })
}

//delete
exports.delete = function(req, res){
    const {id} = req.body
    
    const filteredMembers = data.members.filter( function (member){
        return member.id != id
    })
    
    data.members = filteredMembers
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err){
            res.send("Write File Error!")
        }
        return res.redirect('/members')
    })
}