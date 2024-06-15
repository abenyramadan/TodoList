var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({ name: "Welcome to ItBuddies" });
const item2 = new Item({ name: "Like, Share and Subscribe" });
const item3 = new Item({ name: "Enjoy learning" });

const d = [item1, item2, item3];


app.get("/", function (req, res) {
    Item.find({})
      .then((items) => {
        if (items.length === 0) {
          // No need to insert initial items here
          console.log("No items found in the database.");
        }
        res.render("list", { newListItem: items });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving items");
      });
  });
  

app.post("/", function(req, res){
    i = req.body.n;
    const item = new Item({
        name: i,
    });
    item.save();
    res.redirect("/");
});


app.post("/delete", function (req, res) {
  const itemId = req.body.checkbox;
  Item.findByIdAndDelete(itemId)
    .then(() => {
      console.log("Successfully deleted");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting item");
    });
});

app.listen(2000, function () {
  console.log("listening on port 2000.");
});
