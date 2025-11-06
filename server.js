//server.ts
import express, {} from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import router from "./src/index";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
// Fixed: works in ESM mode
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);
app.listen(port, () => {
    console.log(`Server running on http://localhost ${port}`);
});
//# sourceMappingURL=server.js.map