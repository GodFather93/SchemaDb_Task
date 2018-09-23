var express = require("express");
var bodyParser = require("body-parser");
var { ObjectID } = require("mongodb");
var { mongoose } = require("./db/mongoose.js");
var { User } = require("./models/user");

var app = express();
var port = 3000;

app.use(bodyParser.json());

app.post("/user", (req, res) => {
  var user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    sex: req.body.sex,
    address: { city: req.body.address.city, country: req.body.address.country }
  });

  user.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/user", (req, res) => {
  User.find().then(
    user => {
      res.send({ user });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/user/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  User.findById(id)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }
      res.send({ user });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.delete("/user/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  User.findByIdAndRemove(id)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }

      res.send(user);
    })
    .catch(e => {
      res.status(400).send();
    });
});
app.listen(port, () => {
  console.log(`App Running at ${port}`);
});
