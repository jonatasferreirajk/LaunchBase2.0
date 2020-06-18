const db = require('/home/jonatas/Área de Trabalho/LauchBase2.0/desafio05/src/config/db')
const { age, date } = require('../../lib/utils')
module.exports = {
    all(callback) {
        db.query(`SELECT teachers.*, count(students) AS total_students
        FROM teachers
        LEFT JOIN students ON (teachers.id = students.teacher_id)
        GROUP BY teachers.id
        ORDER BY total_students DESC`, function (err, results) {
            if (err) throw `Database Error! ${err}`
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO teachers(
           avatar_url,
           name,
           birth,
           education_level,
           classtype,
           subjectstaught,
           created_at 
        ) VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING id
    `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.education_level,
            data.classtype,
            data.subjectstaught,
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`
            callback(results.rows[0])
        })

    },
    find(id, callback) {
        db.query(`SELECT * FROM teachers WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`
            callback(results.rows[0])
        })
    },
    findBy(filter, callback){
        db.query(`SELECT teachers.*, count(students) AS total_students
        FROM teachers
        LEFT JOIN students ON (teachers.id = students.teacher_id)
        WHERE teachers.name ILIKE '%${filter}%'
        OR teachers.subjectstaught ILIKE '%${filter}%'
        GROUP BY teachers.id
        ORDER BY total_students DESC`, function (err, results) {
            if (err) throw `Database Error! ${err}`
            callback(results.rows)
        }) 
    },
    update(data, callback) {
        const query = `
            UPDATE teachers SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            education_level=($4),
            classtype=($5),
            subjectstaught=($6)
            WHERE id = $7
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.education_level,
            data.classtype,
            data.subjectstaught,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`
            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results){
            if (err) throw `Database Error! ${err}` 
            return callback() 
        })
    },
    paginate(params){
        const {filter, limit, offset, callback} = params

        let query = `SELECT teachers.*, count(students) as total_students
        FROM teachers
        LEFT JOIN students ON (teachers.id = students.teacher_id)
        `

        if (filter) {
            query =`${query}
            WHERE teachers.name ILIKE '%${filter}%'
            OR teachers.subjectstaught ILIKE '%${filter}%'
            `
        }

        query = `${query}
        GROUP BY teachers.id LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if (err) throw `Database Error! ${err}` 
            callback(results.rows)
        })
    }


}