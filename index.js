const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
const jsonParser = bodyParser.json();

const app = express()

app.use(cors())

const port = 3000
const openAiKey = "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"
const configuration = new Configuration({
  apiKey: openAiKey
});
const openAi = new OpenAIApi(configuration);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/ask", jsonParser, async (req, res) => {
  const prompt = req.body.prompt;

  try {
    if (!prompt) {
      throw new Error("Uh oh, no prompt was provided");
    }

    const response = await openAi.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 4000,
      temperature: 0.5
    });
    console.log(response.data.choices)
    const completion = response.data.choices[0].text;

    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
