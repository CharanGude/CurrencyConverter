const express = require('express');
const app = express();
const bp = require("body-parser");
const axios = require('axios');
const apikey = "e9980410d28f5eb0285fcd7c";
const ejs = require('ejs');

app.set("view engine", "ejs");

app.use(bp.urlencoded({ extented: false }));

app.get('/', (req, res) => {
  res.render("index.ejs", { result: null });
});

app.post('/index.ejs', (req, res) => {
  let amount = req.body.fromAmount;
  let from = req.body.from;
  let to = req.body.to;
  axios.get('https://v6.exchangerate-api.com/v6/' + apikey + "/pair/" + from + "/" + to + "/" + amount)
    .then(response =>
      res.render("index.ejs", { result: response.data.conversion_result }))
    .catch(err => console.log(err))

});



app.listen(3000, () => {
  console.log('server started');
});