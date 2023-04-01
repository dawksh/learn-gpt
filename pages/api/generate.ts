
import type { NextApiRequest, NextApiResponse } from 'next'
import replicate from '../../utils/replicate'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { prompt } = req.body;


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
}
