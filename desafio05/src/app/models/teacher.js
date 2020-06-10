const db = require('/home/jonatas/Área de Trabalho/LauchBase2.0/desafio05/src/config/db')
const { age, date } = require('../../lib/utils')
module.exports = {
    all(callback) {
        db.query(`SELECT * FROM teachers ORDER BY name ASC`, function (err, results) {
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


}