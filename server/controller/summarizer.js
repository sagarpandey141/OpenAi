const axios = require('axios');
require('dotenv').config();

const openaiApiKey = process.env.OPENAI_API_KEY; // Use environment variable
const openaiApiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

async function generateSummary(text) {
  try {
    const response = await axios.post(
      openaiApiUrl,
      {
        prompt: text,
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error in generateSummary:', error.message);
    throw error; // Re-throw the error to propagate it
  }
}

module.exports = {
  generateSummary,
};
