const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(express.static(__dirname + "/"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

app.locals.parseMarkDown = function (rawHtml) {
  const regex = /\[include \'(.*)\'\]/gm;
  while ((m = regex.exec(rawHtml)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    // The result can be accessed through the `m`-variable.
    const rawStr = m[0];
    const fileName = m[1];
    rawHtml = rawHtml.replace(
      rawStr,
      fs.readFileSync(path.join(__dirname, "views", "slides", fileName))
    );
  }
  return rawHtml;
};

const homePage = function (req, res) {
  //joining path of directory
  const directoryPath = path.join(__dirname, "views", "slides");
  //passsing directoryPath and callback function
  const presentations = fs.readdirSync(directoryPath).map((x) => {
    return {
      filename: x,
      name: path.basename(x),
    };
  });
  console.log(directoryPath);
  res.render("index.html", { presentations });
};

app.get("/", homePage);

app.get("/presentation/:presName", function (req, res) {
  const filename = req.params.presName;
  res.render("presentation.html", { filename });
});

app.get("*", homePage);
const port = process.env.PORT || 3000;
console.log("Listening on port: " + port);
app.listen(port);
