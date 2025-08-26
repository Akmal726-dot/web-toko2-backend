import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "neondb_owner",
  host: "ep-fragrant-bush-a1ndq1z3-pooler.ap-southeast-1.aws.neon.tech",
  database: "neondb",
  password: "npg_gpmPN1Z6QkRV",
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

// Tes koneksi
pool.connect()
  .then(() => console.log("✅ Database berhasil terhubung"))
  .catch(err => console.error("❌ Gagal koneksi:", err));

export default pool;
