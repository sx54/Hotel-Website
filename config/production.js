module.exports = {
    port: 3000,
    session: {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    db: {
        // host: 'localhost',
        // port: 3306,
        // username: 'root',
        // password: 'parikhster',
        // database: 'wx'
        host: process.env.DB_HOST,
        port: 3306,
        
        user: process.env.DB_USER,  // Environment variable. Start app like: 'DB_USER=app DB_PASS=test nodemond index.js' OR use .env
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    admin: {
        name: 'admin',
        password: '123'
    }
}
