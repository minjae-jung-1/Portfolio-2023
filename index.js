const express = require('express');

const app = express();

const port = process.env.PORT || 5175;

app.use(express.static("./frontend/dist"))

app.listen(port, ()=>{console.log(port)})