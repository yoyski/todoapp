import mysql from 'mysql2';

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234554321",
    database:"myscheme"
})

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database!");
});


export default db;