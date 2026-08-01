const express = require('express');
const methodOverride = require('method-override');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use('/', )
app.use('/posts', )