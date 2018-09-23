var mongoose = require("mongoose");

var User = mongoose.model("User", {
  fname: { type: String },
  lname: { type: String },
  email: { type: String },
  sex: { type: String },
  address: [{ city: String, country: String }]
});

module.exports = { User };
