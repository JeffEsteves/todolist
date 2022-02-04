//jshint esversion:6

const express = require("express"); 7
const date = require(__dirname + "/public/js/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));

app.use(express.json());

const items = ["Your TODO List starts Here !!!"];
let workItems = [];


app.get("/", function (req, res) {

  let day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work")
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
})

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/")
})

app.get("/about", function (req, res) {
  res.render("about")
})



app.listen(3000, function () {
  console.log("Server running on port 3000");
});

