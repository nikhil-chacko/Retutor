const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Body Parser
app.use(express.json({ extended: false }));

// Connect to Database
connectDB();

// Routes
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('<h1>Hello </h1>');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Started On Port ${port}`);
});
