const sqlite = require('sqlite3').verbose();

module.exports = (amount = 50_000) => {
    const file = amount === 50_000 ? './server/db.sqlite' : './server/db2.sqlite';
    const db = new sqlite.Database(file, (err) => {
        if (err) {
            console.error('Error opening database ' + err.message);
        } else {
            db.run(`CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                phone TEXT,
                company TEXT,
                location TEXT,
                department TEXT,
                childs TEXT,
                coworkers TEXT,
                test TEXT
            )`, (err) => {
                if (err) {
                    console.log('Table already exists.');
                } else {
                    const insert = 'INSERT INTO users (name, email, phone, company, location, department, childs, coworkers, test) VALUES (?,?,?,?,?,?,?,?,?)';
                    const users = [];
    
                    for (let i = 0; i < amount; i++) {
                        const name = `User ${i}`;
                        const email = `user${i}@example.com`;
                        const phone = `123-456-789${i.toString().padStart(2, '0')}`;
                        const company = `Company ${i}`;
                        const location = `Location ${i}`;
                        const department = `Department ${i}`;
                        const childs = `Childs ${i}`;
                        const coworkers = `Coworkers ${i}`;
                        const test = `Test ${i}`;
    
                        users.push([name, email, phone, company, location, department, childs, coworkers, test]);
                    }
    
                    db.serialize(() => {
                        const stmt = db.prepare(insert);
                        users.forEach(user => {
                            stmt.run(user);
                        });
                        stmt.finalize();
                    });
                }
            });
        }
    });

    return db;
}