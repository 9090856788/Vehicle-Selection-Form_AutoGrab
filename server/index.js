import dotenv from "dotenv";
dotenv.config();
import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
const PORT = 3000;

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(cors());

// Multer configuration to handle file uploads in memory
const upload = multer({ storage: multer.memoryStorage() });

// POST request to handle form submission
app.post("/submit", upload.single("logbook"), (req, res) => {
  const { make, model, badge } = req.body;
  const fileContent =
    req.file?.buffer.toString("utf-8") || "No logbook uploaded.";

  res.json({
    make,
    model,
    badge,
    fileContent,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
