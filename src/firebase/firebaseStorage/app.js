import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import { uploadFile } from "./uploadFile.js";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const upload = multer({ dest: "./public/data/uploads/" });

app.post("/postFile", upload.single("uploaded_file"), function (req, res) {
  const filepath = req.file.path;
  var output = fs.readFileSync(filepath);
  console.log(req.file);
  uploadFile(output, req.file.originalname);

  res.redirect("/");
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
