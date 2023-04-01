import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    organization: "org-R5Rv8SkU9dqLUQOKuFFnN9ts",
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

export const chatResponse = async (prompt: string) => {
    const response = await openai.createChatCompletion({
        messages: [{ "role": "user", "content": prompt }],
        model: "gpt-3.5-turbo",
        temperature: 0.7
    })

    return response.data.choices[0].message?.content

}