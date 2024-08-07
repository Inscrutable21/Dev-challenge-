const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const router = express.Router();

const CHATPDF_API_KEY = process.env.CHATPDF_API_KEY;
const CHATPDF_API_URL = 'https://api.chatpdf.com/v1';

if (!CHATPDF_API_KEY) {
  console.error('CHATPDF_API_KEY is not set. Please check your .env file.');
  process.exit(1);
}

console.log('API Key in api.js:', CHATPDF_API_KEY ? 'Set' : 'Not set');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/add-file', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const formData = new FormData();
  formData.append('file', req.file.buffer, { filename: req.file.originalname });

  try {
    console.log('Sending request to ChatPDF API...');
    const response = await axios.post(`${CHATPDF_API_URL}/sources/add-file`, formData, {
      headers: {
        ...formData.getHeaders(),
        'x-api-key': CHATPDF_API_KEY,
      },
    });
    console.log('Response from ChatPDF API:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error uploading file:', error.response?.data || error.message);
    console.error('Full error object:', error);
    res.status(error.response?.status || 500).json({
      error: 'Error uploading file',
      details: error.response?.data || error.message,
    });
  }
});

router.post('/chat', async (req, res) => {
  try {
    const { sourceId, messages } = req.body;
    
    const response = await axios.post(`${CHATPDF_API_URL}/chats/message`, {
      sourceId,
      messages
    }, {
      headers: {
        'x-api-key': CHATPDF_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error in chat:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Error in chat', 
      details: error.response?.data || error.message 
    });
  }
});

module.exports = router;