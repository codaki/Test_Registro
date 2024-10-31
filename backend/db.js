import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "asistenciadcco",
  password: "password",
  port: 5432,
});
