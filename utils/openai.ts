import axios from 'axios'

export const openAIEndpoint = "https://api.openai.com/v1/chat/completions";

export const chatGPTResponse = async (prompt: string) => {
    const { data } = await axios.post(openAIEndpoint, {
        model: "gpt-3.5-turbo",
        message: [{ "role": "user", "content": prompt }]
    })

    return data;
}