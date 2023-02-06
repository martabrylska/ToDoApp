const express = require('express');
const {todoRouter} = require('./routes/todo');
const {filterRouter} = require('./routes/filters');

const app = express();

app.use(express.static('public'));
app.use(express.json())

app.use('/', todoRouter);
app.use('/', filterRouter);

app.listen(3000);