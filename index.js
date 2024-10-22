import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 8000;

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json("hi");
});

app.get("/rates", (req, res) => {
  const bearer = `Bearer ${process.env.TOKEN}`;

  const options = {
    method: "GET",
    url: "https://gateway.eg-on.com/rates/",
    params: req.query,
    headers: {
      Authorization: bearer,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      res.json(error.response.data);
      console.log(error);
    });
});

app.get("/cities/:zip", (req, res) => {
  const bearer = `Bearer ${process.env.TOKEN}`;
  const zip = req.params.zip;

  const options = {
    method: "GET",
    url: `https://gateway.eg-on.com/cities/${zip}`,
    headers: {
      Authorization: bearer,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      res.json(error.response.data);
      console.log(error);
    });
});

app.get("/streets/:zip/:city", (req, res) => {
  const bearer = `Bearer ${process.env.TOKEN}`;
  const zip = req.params.zip;
  const city = req.params.city;

  const options = {
    method: "GET",
    url: `https://gateway.eg-on.com/streets/${zip}/${city}`,
    params: req.query,
    headers: {
      Authorization: bearer,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      res.json(error.response.data);
      console.log(error);
    });
});

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
