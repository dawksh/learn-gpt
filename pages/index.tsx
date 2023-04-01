import { useEffect, useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, Image, useDisclosure } from "@chakra-ui/react";
import axios from 'axios'
import QuizModal from "../components/Quiz.modal";
import { chatResponse } from "../utils/openai";
import replicate from "../utils/replicate";

interface Response {
  image: [string],
  text: string
}

interface Questions {
  question: string,
  answer: string
}

export default function Home() {

  const [inputValue, setInputValue] = useState('');
  const [topic, setTopic] = useState<string | null>(null)
  const [response, setResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Array<Questions> | null>(null)


  const generateData = async () => {
    const textData = await chatResponse(`explain ${inputValue} like I'm 10 in 300 words`)

    // const output = await replicate.run(
    //   "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
    //   {
    //     input: {
    //       prompt: `generate an image to explain ${prompt} like I'm 10`,
    //       num_outputs: 1,
    //       guidance_scale: 7.5,
    //       scheduler: "K_EULER",
    //       num_inference_steps: 50,
    //       image_dimensions: "768x768"
    //     }
    //   }
    // );
    setResponse({
      image: ["https://i.imgur.com/4ZQ9Z0M.png"],
      text: textData as string
    })
  }

  const handleSubmit = async () => {
    setTopic(inputValue)
    setLoading(true)
    await generateData()
    setLoading(false)
  }
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value)
  }

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box p={8}>
      <Flex justifyContent="center" alignItems="center" direction='column'>
        <Heading as="h1" size="xl" mb={4}>
          Learn GPT
        </Heading>
        <QuizModal isOpen={isOpen} onClose={onClose} topic={topic} />
        <FormLabel htmlFor="name">What do you want to study today?</FormLabel>
        <Input
          id="name"
          placeholder="Enter a topic"
          value={inputValue}
          onChange={handleInputChange}
          mb={4}
          rounded="none"
          border="2px"
        />
        <Button rounded="none" variant="outline" border="4px" type="submit" onClick={handleSubmit} isLoading={loading}>
          Submit
        </Button>
        {
          response && (
            <>
              {response.text && <Text p={4} >{response.text}</Text>}
              <br />
              {response.image && response.image.map((image, index) => <Image height="300px" width="300px" key={index} src={image} />)}
              <Button m={4} rounded="none" variant="outline" border="4px" onClick={onOpen}>
                Take a quiz!
              </Button>
            </>
          )
        }
      </Flex>

    </Box>
  )
}
