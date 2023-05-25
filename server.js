const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const API_KEY = 'RCAXB3fbx070COQpoTrXq5msYGyVYsTigVBW9agVciyz48Zzf9h46iCzBF6z'; // Replace with your actual API key

// CORS middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/generate-image', async (req, res) => {
  const { prompt } = req.body;
  try {
    const requestData = {
      prompt: prompt,
      key: API_KEY,
    };

    const response = await axios.post('https://stablediffusionapi.com/api/v3/text2img', requestData);
    const generatedImageUrl = response.data.image_url;

    const imageResponse = await axios.get(generatedImageUrl, {
      responseType: 'stream',
    });

    const imagePath = path.join(__dirname, 'generated-image.png');
    const writeStream = fs.createWriteStream(imagePath);
    imageResponse.data.pipe(writeStream);

    writeStream.on('finish', () => {
      res.sendFile(imagePath);
    });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).send('Error generating image');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
