const {Pool} = require("pg")

module.exports = new Pool({
    user: 'jonatas',
    password: "1981986",
    host: "localhost",
    port: 5432,
    database: "my_teacher"
})