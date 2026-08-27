const express = require("express");
const mysql = require("mysql2/promise");
const redis = require("redis");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Redis connection
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err);
});

// MySQL connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Products API
app.get("/products", async (req, res) => {
  try {
    // Check Redis cache
    const cached = await redisClient.get("products");

    if (cached) {
      console.log("CACHE HIT");
      return res.json(JSON.parse(cached));
    }

    console.log("CACHE MISS");

    // Get products from MySQL
    const [rows] = await db.query(
      "SELECT * FROM products"
    );

    // Store result in Redis for 60 seconds
    await redisClient.setEx(
      "products",
      60,
      JSON.stringify(rows)
    );

    res.json(rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

// Start server
async function startServer() {
  try {
    await redisClient.connect();

    console.log("Redis connected");

    app.listen(3000, "0.0.0.0", () => {
      console.log("Backend running on port 3000");
    });

  } catch (error) {
    console.error("Server startup error:", error);
  }
}

startServer();