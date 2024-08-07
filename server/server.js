require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('CHATPDF_API_KEY:', process.env.CHATPDF_API_KEY ? 'Set' : 'Not set');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// API routes
app.use('/api', apiRoutes);

// Catch-all handler for any request that doesn't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});