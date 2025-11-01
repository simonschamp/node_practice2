import { Router } from "express";
import fs from "fs";
const router = Router();
let poems = [];
fs.readFile("data/poems.json", "utf8", (err, data) => {
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
    console.log(poem);
    poems.push(poem);
    fs.writeFile("data/poems.json", JSON.stringify(poems), (err) => {
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
//# sourceMappingURL=index.js.map