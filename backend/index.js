const express = require("express");
const app = express();
const cors = require("cors");
const data = require("./routes/QuoteHistoryData");
const Pricing_mod = require("./classes/PricingModule");

const Expressions = {
  firstName: /^[A-Z][a-z]+$/,
  lastName: /^[A-Z]([a-z\-`'A-Z]+)?[a-z]$/,
  Address: /^[0-9]+( [a-zA-Z]+\.?)+( [0-9]+)?$/,
  State: /^[A-Z]{2}$/,
  City: /^[A-Z][a-z\.]+(( [A-Z][a-z\.]+)+)?$/,
  ZipCode: /^[0-9]{5}$/,
  email: /^[a-zA-Z0-9\.\-]+@[a-zA-Z0-9]+\.([a-zA-Z0-9]+)$/,
  password: /^([a-zA-Z0-9]|[@$!%*#?&])+$/,

  Gallons: /^[0-9]+$/,
  DeliveryDate: /^\d{4}\-\d{2}\-\d{2}$/,
};

let MySQL = require("mysql");
let connection = MySQL.createConnection({
  host: "164.92.100.98",
  port: 3306,
  user: "fuel",
  password: "2?]>tH;cj@,)>-UM",
  database: "fueldb",
});

connection.connect(function (error) {
  if (error) throw error;
  console.log(error);
});
app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));
app.use(cors());
app.use("/", require("./routes/index"));

app.get("/QuoteHistory", (req, res) => {
  const sql = `SELECT * FROM FuelQuote`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.get("/Users", (req, res) => {
  const sql = `SELECT * FROM Users`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

//----POST REQUEST  for Registration Form ----//
app.post("/api/Registration", (req, res) => {
  console.log("I got a Request");
  const info = req.body;
  console.log(info);
  const sql = `INSERT INTO Users (firstName, lastName, Address, State, City, ZipCode) VALUES ('${info.firstName}', '${info.lastName}', '${info.Address}', '${info.State}', '${info.City}', '${info.ZipCode}')`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  valid = true;

  valid = Expressions.firstName.test(info.firstName);
  if (!valid) {
    console.log("first name not valid!");
    return null;
  }

  valid = Expressions.lastName.test(info.lastName);
  if (!valid) {
    console.log("last name not valid!");
    return null;
  }

  valid = Expressions.Address.test(info.Address);
  if (!valid) {
    console.log("Address not valid!");
    return null;
  }

  valid = Expressions.State.test(info.State);
  if (!valid) {
    console.log("State not valid!");
    return null;
  }

  valid = Expressions.City.test(info.City);
  if (!valid) {
    console.log("City not valid!");
    return null;
  }

  valid = Expressions.ZipCode.test(info.ZipCode);
  if (!valid) {
    console.log("Zip code not valid!");
    return null;
  }

  valid = Expressions.email.test(info.email);
  if (!valid) {
    console.log("email not valid!");
    return null;
  }

  valid = Expressions.password.test(info.password);
  if (!valid) {
    console.log("password not valid!");
    return null;
  }

  console.log("Input valid!");

  res.json({
    status: "success",
  });
  return info;
});

app.post("/api/FuelQuote", (req, res) => {
  console.log("I got a Request");
  const info = req.body;
  console.log(info);

  valid = true;

  valid = Expressions.Gallons.test(info.Gallons);
  if (!valid) {
    console.log("Gallons not valid!");
    return null;
  }

  valid = Expressions.Address.test(info.Address);
  if (!valid) {
    console.log("Address not valid!");
    return null;
  }

  valid = Expressions.DeliveryDate.test(info.DeliveryDate);
  if (!valid) {
    console.log("Date not valid!");
    return null;
  }
  // Insert info into the FuelQuote Table
  const sql2 = `INSERT INTO FuelQuote (Gallons, Address, DeliveryDate) VALUES ('${info.Gallons}', '${info.Address}', '${info.DeliveryDate}')`;
  console.log("Quote valid!");

  res.json({
    status: "success",
  });
  connection.query(sql2, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  return info;
});

app.listen(5000, () => {
  console.log(`Server listening on Port 5000`);
});