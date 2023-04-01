import type { NextApiRequest, NextApiResponse } from "next";
import replicate from "../../utils/replicate";
import { chatResponse } from "../../utils/openai";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { prompt } = req.body;

    const textData = await chatResponse(`explain ${prompt} like I'm 10 in 300 words`)

    const output = await replicate.run(
      "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
      {
        input: {
          prompt: `generate an image to explain ${prompt} like I'm 10`,
          num_outputs: 1,
          guidance_scale: 7.5,
          scheduler: "K_EULER",
          num_inference_steps: 50,
          image_dimensions: "768x768"
        }
      }
    );



    res.status(200).json({ image: output, text: textData })
  } else {
    res.status(400).json({ error: "Invalid Method" })
  }
}
