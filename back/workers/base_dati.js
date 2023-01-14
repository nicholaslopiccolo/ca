// Base dati: in caso di modifiche cambio qui e ho risolto
const base_dati = {
    data: {
        peso: new Array(),
        kcal: new Array()
    },
    user_s: {
        secure: {
            token: null,
            admin: false
        }
    },
    SALT_USERS: 's34gn9yj9',
    FILE_USERS: './json_db/users.json',
    FILE_DATA: './json_db/data.json',
    DB_CONF: {
        user: 'postgres',
        host: 'localhost',
        database: 'rtbp',
        password: 'password',
        port: 5432,
    }
}

module.exports = base_dati;