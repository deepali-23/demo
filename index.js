const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
var fileupload = require("express-fileupload");
var fs = require("fs");
app.use(express.json({ extended: false }));
//storage engine
var d = Date.now();
const storage = multer.diskStorage({
  destination: "./upload",

  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${d}.jpg`);
  },
});
//set multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

app.post("/upload", upload.single("profile"), (req, res) => {
  res.json({
    success: 1,
    profile_url: "http://localhost:3000/profile/" + `${req.file.filename}`,
    message: d,
  });
});

app.delete("/upload/:id", (req, res) => {
  fs.unlink(`./upload/profile_${req.params.id}` + ".jpg", function (err) {
    if (err) {
      throw err;
    } else {
      res.json({ message: `Deleted item id:${req.params.id}` });
    }
  });
  // res.send("deleteing a single id");
});

app.post("/upload/rename", (req, res) => {
  fs.rename(
    `./upload/profile_${req.body.id}` + ".jpg",
    `./upload/${req.body.name}_${req.body.id}.jpg`,

    function (err) {
      if (err) {
        throw err;
      } else {
        res.json({
          message: `file is rename as:${req.body.name} `,
        });
      }
    }
  );
  console.log(req.body.id);
  console.log(req.body.name);
});
app.listen(3000, () => {
  console.log("Server started on port:3000");
});
