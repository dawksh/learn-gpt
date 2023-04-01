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

  const fetchQuiz = async () => {
    const textData: any = await chatResponse(`generate 5 basic question answers on ${topic} in JSON format with an array of question and answer objects.`)
    console.log(JSON.parse(textData).questions)
    setQuestions(JSON.parse(textData).questions)
  }

  const generateData = async () => {
    const textData: any = await chatResponse(`explain ${inputValue} like I'm 10 in 300 words`)
    setResponse({
      image: ["https://i.imgur.com/4ZQ9Z0M.png"],
      text: textData as string
    })
  }

  const handleSubmit = async () => {
    setTopic(inputValue)
    setLoading(true)
    fetchQuiz()
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
        <QuizModal isOpen={isOpen} onClose={onClose} topic={topic} questions={questions} />
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
              <Button m={4} rounded="none" isDisabled={questions?.length == 0} variant="outline" border="4px" onClick={onOpen}>
                Take a quiz!
              </Button>
            </>
          )
        }
      </Flex>

    </Box>
  )
}
