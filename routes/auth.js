import express from "express";
import pool from "../config/koneksi.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();
const SECRET = "RAHASIA123";

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const result = await pool.query("INSERT INTO users (username, password) VALUES ($1,$2) RETURNING *", [username, hashed]);
  res.json(result.rows[0]);
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE username=$1", [username]);
  const user = result.rows[0];
  if (!user) return res.status(404).json({ error: "User not found" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Password salah" });
  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// LOGOUT (Client cukup hapus token)

export default router;
