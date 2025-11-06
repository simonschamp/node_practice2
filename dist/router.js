import { error } from "console";
import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// Resolve data file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Absolute path "../data/poems.json"
const POEMS_PATH = path.join(__dirname, "../data/poems.json");
//Make sure directory exists too, If someone deletes the data/ folder, this handles it:
const dataDir = path.dirname(POEMS_PATH);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}
const router = Router();
let poems = [];
//Auto-create the file if missing
/*try {
  if (!fs.existsSync(POEMS_PATH)) {
    // Create empty JSON file if missing
    fs.writeFileSync(POEMS_PATH, JSON.stringify([], null, 2));
  }

  const data = fs.readFileSync(POEMS_PATH, "utf8");
  poems = JSON.parse(data);
} catch (err) {
  console.error("Failed loading poems:", err);
  poems = [];
}*/
fs.readFile(POEMS_PATH, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    try {
        poems = JSON.parse(data);
    }
    catch (error) {
        console.error(`Error parsing JSON: ${error}`);
    }
});
//Api end-point to gett all poems
router.get("/", (_req, res) => {
    res.json(poems);
});
//Api end-point to get 1 poem
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10); // the ! asserts it is not undefined
    try {
        res.json(poems[id]);
    }
    catch (error) {
        console.error(`Error parsing JSON: ${error}`);
    }
});
router.post("/", (req, res) => {
    let poem = req.body;
    //const { poem } = req.body;
    console.log(poem);
    poems.push(poem);
    fs.writeFile(POEMS_PATH, JSON.stringify(poems), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        else {
            res.json(poems);
            return;
        }
    });
});
export default router;
//# sourceMappingURL=router.js.map