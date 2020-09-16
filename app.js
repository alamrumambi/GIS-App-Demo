const express = require('express');
const app = express(), port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(require('./routes'));

app.listen(port, () => console.log(`listen on port ${port}`));