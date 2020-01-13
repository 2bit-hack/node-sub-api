require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(`${process.env.DATABASE_URL}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Connected to MongoDB database'));

app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

const port = 3000;
app.listen(port, () => console.log(`Server started at port ${port}`));
