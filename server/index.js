const express = require('express');
const bodyParser = require('body-parser');
const summarizer = require('./controller/summarizer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 10, 
});

app.use('/summarize', limiter);

app.post('/summarize', async (req, res) => {
  try {
    const { text } = req.body;
    const summary = await summarizer.generateSummary(text);
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Please Insert Api kEY ' });
  }
});

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
