import dotenv from "dotenv";
dotenv.config();
import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

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
