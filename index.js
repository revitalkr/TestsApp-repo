const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

let currentTest = null;
const tests = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/tests.json`));

app.get('/', (req, res) => {
  res.status(200).sendFile(`${__dirname}/templates/index.html`);
});

app.get('/test', (req, res) => {
  console.log('/test');
  if (currentTest == null) {
    console.log('currentTest will be set to test');
    currentTest = tests[0];
    res.status(200).sendFile(`${__dirname}/templates/test.html`);
  } else {
    console.log('currentTest is still running');
    res.status(200).send('running previos test');
  }
});

app.get('/getTest', (req, res) => {
  console.log('getTest');
  if (currentTest != null) {
    console.log('currentTest is not null!');
    res.status(200).send(currentTest);
    currentTest = null;
  } else {
    console.log('no current test');
    res.status(404).send();
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`running on port ${port} ...`);
});
