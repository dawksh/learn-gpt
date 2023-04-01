import type { NextApiRequest, NextApiResponse } from "next";
import replicate from "../../utils/replicate";
import { chatResponse } from "../../utils/openai";
import axios from 'axios'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { prompt } = req.body;

    // const { data } = await axios.post("https://api.openai.com/v1/chat/completions", {
    //   model: "gpt-3.5-turbo",
    //   message: [{ "role": "user", "content": `explain ${prompt} like I'm 10` }]
    // }, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${process.env.OPENAI_KEY as string}`,
    //     "OpenAI-Organization": process.env.OPENAI_ORG as string
    //   }
    // })

    const data = await chatResponse(`explain ${prompt} like I'm 10`)

    console.log(data)

    const output = await replicate.run(
      "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
      {
        input: {
          prompt,
          num_outputs: 1,
          guidance_scale: 7.5,
          scheduler: "K_EULER",
          num_inference_steps: 50,
          image_dimensions: "768x768"
        }
      }
    );



    res.status(200).json(output)
  } else {
    res.status(400).json({ error: "Invalid Method" })
  }
}
