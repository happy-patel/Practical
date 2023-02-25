require('dotenv').config();
require('./db/connection');
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express()
app.use(express.json())
app.use(cors())

const port = 3000;

app.use(userRoutes);
app.use(cartRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
