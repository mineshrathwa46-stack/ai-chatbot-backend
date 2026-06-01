import OpenAI from "openai";

const client = new OpenAI({

  apiKey:
    process.env.GROQ_API_KEY,

  baseURL:
    "https://api.groq.com/openai/v1",

});

export const chatWithAI =
async (req, res) => {

  try {

    const { message } =
      req.body;

    if (!message) {

      return res.status(400).json({

        message:
          "Message is required",

      });

    }

    const completion =
      await client.chat.completions.create({

        model:
          "llama-3.3-70b-versatile",

        messages: [

          {
            role: "user",
            content: message,
          },

        ],

      });

    res.status(200).json({

      reply:
        completion.choices[0]
          .message.content,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "AI server error",

    });

  }

};