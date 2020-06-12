const db = require('/home/jonatas/Área de Trabalho/LauchBase2.0/desafio05/src/config/db')
const { age, date } = require('../../lib/utils')
module.exports = {
    all(callback) {
        db.query(`SELECT * FROM students ORDER BY name ASC`, function (err, results) {
            if (err) throw `Database Error! ${err}`
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO students(
           avatar_url,
           name,
           email,
           birth,
           anoescolar,
           cargahoraria
        ) VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING id
    `
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.anoescolar,
            data.cargahoraria
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`
            callback(results.rows[0])
        })

    },
    find(id, callback) {
        db.query(`SELECT * FROM students WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`
            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE students SET
            avatar_url=($1),
            name=($2),
            email=($3),
            birth=($4),
            anoescolar=($5),
            cargahoraria=($6)
            WHERE id = $7
        `
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.anoescolar,
            data.cargahoraria,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`
            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM students WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`
            return callback()
        })
    }


}