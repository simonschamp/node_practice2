//server.ts

import express, { type Express } from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import router from "./router.js"; //must include .js for ESM
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = process.env.PORT || 8000;

// Enable CORS for all origins (development)
app.use(cors());

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Serve static files, works in ESM mode
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
