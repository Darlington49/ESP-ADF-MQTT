const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
// add router in express app
app.use("/", router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// router.get("/upload", (req, res) => {
//     console.log(req.body);
//     res.end("ok");
// });

router.post("/upload", (req, res) => {
  console.log(req);
//   res.end("ok");
});

app.listen(8000, () => {
  console.log("Started on PORT 3000");
});
