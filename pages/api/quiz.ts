import type { NextApiRequest, NextApiResponse } from "next";
import { chatResponse } from "../../utils/openai";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "POST") {
        const { prompt } = req.body;

        const textData: any = await chatResponse(`generate 5 basic question answers on ${prompt} in JSON format with an array of question and answer objects.`)

        res.status(200).json({ questions: JSON.parse(textData).questions })
    } else {
        res.status(400).json({ error: "Invalid Method" })
    }
}
