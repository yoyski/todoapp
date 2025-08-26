import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection(process.env.DATABASE_URL || "mysql://root:CngtmTwKOAfWSlKKKlWIjtrFAdXnkwtc@shuttle.proxy.rlwy.net:19885/railway");

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database!");
});


export default db;