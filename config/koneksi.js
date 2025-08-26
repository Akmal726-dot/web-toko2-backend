import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_gpmPN1Z6QkRV@ep-fragrant-bush-a1ndq1z3-pooler.ap-southeast-1.aws.neon.tech/toko2?sslmode=require",
  ssl: { rejectUnauthorized: false }, // wajib kalau pakai Neon
});

export default pool;

