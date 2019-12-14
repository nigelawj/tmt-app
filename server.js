const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Initialise Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/results', require('./routes/results'));
app.use('/api/list', require('./routes/list'));

// Serve static assets in Production Mode
if (process.env.NODE_ENV === 'production') {
  // Set Static folder
  app.use(express.static('client/build'));

  // Set default page
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
