import express from "express";
import pool from "../config/koneksi.js";
const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT p.*, c.name AS category_name FROM products p JOIN categories c ON p.category_id=c.id");
  res.json(result.rows);
});

// GET product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
  res.json(result.rows[0]);
});

// POST new product
router.post("/", async (req, res) => {
  const { name, description, price, category_id } = req.body;
  const result = await pool.query(
    "INSERT INTO products (name, description, price, category_id) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, description, price, category_id]
  );
  res.json(result.rows[0]);
});

// PUT update product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category_id } = req.body;
  const result = await pool.query(
    "UPDATE products SET name=$1, description=$2, price=$3, category_id=$4 WHERE id=$5 RETURNING *",
    [name, description, price, category_id, id]
  );
  res.json(result.rows[0]);
});

// DELETE product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM products WHERE id=$1", [id]);
  res.json({ message: "Product deleted" });
});

export default router;
