const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INT, name TEXT)');
    // Define and create more tables if needed.
  });

  const userData = { id: 1, name: 'Joe Moe' };

db.run('INSERT INTO users (id, name) VALUES (?, ?)', [userData.id, userData.name], (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('A row has been inserted into the table.');
});

db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      throw err;
    }
  
    rows.forEach((row) => {
      console.log(row.id, row.name);
    });
  });
  
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Database connection closed.');
  });