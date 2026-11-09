import mysql from "mysql2/promise"; //importamos la libreria

//creamos una constante POOL
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "db_vehiculos",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "Z",
  dateStrings: true,
  decimalNumbers: true,
});

export default pool;
